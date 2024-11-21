import express from 'express';
import bcrypt from 'bcrypt';
import { pool } from "../../database.js";

const router = express.Router();
const saltRounds = 10;

/**
 * @swagger
 * /api/auth/cadastro:
 *   post:
 *     description: Criar um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Resposta bem-sucedida
 */
router.post('/api/auth/cadastro', async (req, res) => {
  const { nome, email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }
  
  try {
    const userCheck = await pool.query('SELECT * FROM usuarios WHERE email = $1', [ email ]);
    if (userCheck.rows.length > 0) {
      return res.status(409).json({ message: 'Usuário já existe' });
    }
    
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await pool.query('INSERT INTO USUARIOS (nome, email, senha) VALUES ($1, $2, $3)', [nome, email, hashedPassword ]);
    res.json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário' });
  }
});

export default router;