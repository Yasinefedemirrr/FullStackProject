const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET - Tüm kullanıcıları listele
router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('GET /api/users hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Veriler getirilirken hata oluştu',
      error: error.message
    });
  }
});

// GET - Tekil kullanıcı getir (bonus)
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Kullanıcı bulunamadı'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('GET /api/users/:id hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Kullanıcı getirilirken hata oluştu',
      error: error.message
    });
  }
});

// POST - Yeni kullanıcı ekle
router.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Validasyon
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name ve email alanları zorunludur'
      });
    }
    
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    
    res.status(201).json({
      success: true,
      message: 'Kullanıcı başarıyla eklendi',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('POST /api/users hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Kullanıcı eklenirken hata oluştu',
      error: error.message
    });
  }
});

// PUT - Kullanıcı güncelle (bonus)
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name ve email alanları zorunludur'
      });
    }
    
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Kullanıcı bulunamadı'
      });
    }
    
    res.json({
      success: true,
      message: 'Kullanıcı başarıyla güncellendi',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('PUT /api/users/:id hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Kullanıcı güncellenirken hata oluştu',
      error: error.message
    });
  }
});

// DELETE - Kullanıcı sil (bonus)
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Kullanıcı bulunamadı'
      });
    }
    
    res.json({
      success: true,
      message: 'Kullanıcı başarıyla silindi',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('DELETE /api/users/:id hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Kullanıcı silinirken hata oluştu',
      error: error.message
    });
  }
});

module.exports = router;

