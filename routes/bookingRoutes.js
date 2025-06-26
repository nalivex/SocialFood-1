// POST criar reserva
router.post('/api/bookings', authMiddleware, async (req, res) => {
  try {
    const { carId, start_date, end_date, total_price } = req.body;
    const userId = req.userId;

    if (!carId || !start_date || !end_date || !total_price) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const sql = 'INSERT INTO bookings (userId, carId, start_date, end_date, total_price) VALUES (?, ?, ?, ?, ?)';
    await pool.query(sql, [userId, carId, start_date, end_date, total_price]);

    res.status(201).json({ message: 'Reserva realizada com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    res.status(500).json({ message: 'Erro interno ao criar reserva.' });
  }
});
