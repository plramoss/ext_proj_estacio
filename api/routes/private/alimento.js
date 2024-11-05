import express from 'express';
import { pool } from "../../database.js";
import middleware from '../middleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/alimentos:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     description: Utilize para buscar dados alimentos se baseado no nome
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome do alimento
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
 *                 nome:
 *                   type: string
 *                 porcao:
 *                   type: integer
 *                 calorias:
 *                   type: integer
 *                 carboidratos:
 *                   type: integer
 *                 proteinas:
 *                   type: integer
 *                 gorduras:
 *                   type: integer
 *                 acucar:
 *                   type: integer
 *                 gorduras_saturadas:
 *                   type: integer
 *                 gorduras_trans:
 *                   type: integer
 *                 fibras:
 *                   type: integer
 *                 sodio:
 *                   type: integer
 *       '401':
 *         description: Não autorizado
 *       '403':
 *         description: Proibido
 */
router.get('/api/alimentos', middleware, async (req, res) => {
  const { nome } = req.query;
  
  try {
    let query = 'SELECT * FROM alimentos';
    const params = [];
    
    if (nome) {
      query += ' WHERE nome = $1';
      params.push(`%${ nome }%`);
    }
    
    const response = await pool.query(query, params);
    res.json(response.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Erro ao buscar alimentos' });
  }
});

export default router;