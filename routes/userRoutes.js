const express = require('express');
const router = express.Router();
const { pool } = require('../db/db');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Middleware para validar token e pegar userId
function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
}

// GET perfil do usuário
router.get('/api/user', autenticarToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const [rows] = await pool.query('SELECT userId, name, email FROM users WHERE userId = ?', [userId]);
    if (rows.length === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno' });
  }
});

// PUT editar perfil
router.put('/api/user', autenticarToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, email } = req.body;

    if (!name || !email) return res.status(400).json({ message: 'Nome e email são obrigatórios' });

    await pool.query('UPDATE users SET name = ?, email = ? WHERE userId = ?', [name, email, userId]);
    res.json({ message: 'Perfil atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno' });
  }
});

// DELETE perfil
router.delete('/api/user', autenticarToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    await pool.query('DELETE FROM users WHERE userId = ?', [userId]);
    res.json({ message: 'Conta deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno' });
  }
});

module.exports = router;