import express from 'express';
import bcrypt from 'bcrypt';
import { pool } from "../../database.js";
import pkg from 'jsonwebtoken';

const { sign } = pkg;

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     description: Obter um token de acesso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Resposta bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
router.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }
  
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [ email ]);
    const user = result.rows[0];
    
    if (!user || !(await bcrypt.compare(password, user.senha))) {
      return res.status(401).json({ message: 'Email e/ou senha inválidos' });
    }
    
    const token = sign({ user }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ message: 'Erro ao autenticar usuário' });
  }
});

export default router;