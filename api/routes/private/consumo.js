import express from 'express';
import { pool } from "../../database.js";
import middleware from '../middleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/consumo:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     description: Utilize para guardar consumo de calorias por refeicao
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valor:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Resposta bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 valor:
 *                   type: integer
 *       '401':
 *         description: Não autorizado
 *       '403':
 *         description: Proibido
 */
router.post('/api/consumo', middleware, async (req, res) => {

  try {
  const { valor } = req.body;

  const query = 'INSERT INTO consumo (valor) VALUES ($1) RETURNING *';
  const params = [valor];

  const response = await pool.query(query, params);
  res.json(response.rows);
} catch (e) {
  console.log(e);
  res.status(500).json({ message: 'Erro ao guardar consumo' });
}
});

/**
 * @swagger
 * /api/consumo:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     description: Utilize para obter todos os itens de consumo
 *     responses:
 *       '200':
 *         description: Resposta bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   valor:
 *                     type: integer
 *       '401':
 *         description: Não autorizado
 *       '403':
 *         description: Proibido
 */
router.get('/api/consumo', middleware, async (req, res) => {
  try {
    const query = 'SELECT * FROM consumo';
    const response = await pool.query(query);
    res.json(response.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Erro ao obter itens de consumo' });
  }
});

export default router;