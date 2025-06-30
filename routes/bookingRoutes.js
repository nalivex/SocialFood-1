const express = require('express');
const router = express.Router();
const { pool } = require('../db/db');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/api/bookings', authMiddleware, async (req, res) => {
  try {
    const { carId, start_date, end_date, total_price } = req.body;
    const userId = req.user.userId;

    if (!carId || !start_date || !end_date || !total_price) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const sqlInsert = `
      INSERT INTO bookings (user_id, car_id, start_date, end_date, total_price)
      VALUES (?, ?, ?, ?, ?)
    `;

    // Executa a reserva
    await pool.query(sqlInsert, [userId, carId, start_date, end_date, total_price]);

    console.log("ID do carro a ser atualizado:", carId);
    // Atualiza o status do carro para 'unavailable'
    const sqlUpdate = `
      UPDATE cars
      SET is_active = 0
      WHERE carId = ?
    `;
    await pool.query(sqlUpdate, [carId]);

    res.status(201).json({ message: 'Reserva realizada e carro marcado como indisponível.' });
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    res.status(500).json({ message: 'Erro interno ao criar reserva.' });
  }
});


module.exports = router;
