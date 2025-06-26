const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { pool } = require('../db/db');
const authMiddleware = require('../middlewares/authMiddleware');

// Configurar o multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/cars'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome único
  }
});

const upload = multer({ storage: storage });

// Rota para cadastrar carro com imagem
router.post('/api/cars', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { model, brand , daily_price } = req.body;
    const image = req.file ? `/uploads/cars/${req.file.filename}` : null;

    if (!model || !brand || !daily_price|| !image) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const sql = 'INSERT INTO cars (model, brand, daily_price, image) VALUES (?, ?, ?, ?)';
    await pool.query(sql, [model, brand, daily_price, image]);

    res.status(201).json({ message: 'Carro cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar carro:', error);
    res.status(500).json({ message: 'Erro interno ao cadastrar carro' });
  }
});

router.get('/api/cars/search', authMiddleware, async (req, res) => {
  const search = req.query.q;

  if (!search) {
    return res.status(400).json({ message: "Parâmetro de busca 'q' é obrigatório" });
  }

  try {
    const [rows] = await pool.query(
      "SELECT * FROM cars WHERE brand LIKE ? OR model LIKE ?",
      [`%${search}%`, `%${search}%`]
    );
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar carros:", error);
    res.status(500).json({ message: "Erro interno ao buscar carros" });
  }
});

const fs = require('fs');

router.delete('/api/cars/:id', authMiddleware, async (req, res) => {
  try {
    const carId = req.params.id;

    // Buscar imagem antes de deletar
    const [cars] = await pool.query('SELECT image FROM cars WHERE carId = ?', [carId]);

    if (cars.length === 0) {
      return res.status(404).json({ message: 'Carro não encontrado.' });
    }

    const imagePath = cars[0].image;

    await pool.query('DELETE FROM cars WHERE carId = ?', [carId]);

    if (imagePath) {
      const localPath = path.join(__dirname, '..', imagePath);
      fs.unlink(localPath, (err) => {
        if (err) console.error('Erro ao deletar imagem:', err);
      });
    }

    res.json({ message: 'Carro deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar carro:', error);
    res.status(500).json({ message: 'Erro interno ao deletar carro.' });
  }
});

router.put('/api/cars/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const carId = req.params.id;
    const { model, brand, daily_price } = req.body;

    let imageUpdate = '';
    let params = [model, brand, daily_price];

    if (req.file) {
      const image = `/uploads/cars/${req.file.filename}`;
      imageUpdate = ', image = ?';
      params.push(image);
    }

    params.push(carId);

    const sql = `UPDATE cars SET model = ?, brand = ?, daily_price = ?${imageUpdate} WHERE carId = ?`;
    await pool.query(sql, params);

    res.json({ message: 'Carro atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar carro:', error);
    res.status(500).json({ message: 'Erro interno ao atualizar carro.' });
  }
});

module.exports = router;
