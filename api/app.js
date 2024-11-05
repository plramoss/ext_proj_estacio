import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import alimentoRoutes from './routes/private/alimento.js';
import cadastroRoutes from './routes/auth/cadastro.js';
import loginRoutes from './routes/auth/login.js';

dotenv.config();

const app = express();
const port = 3000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Projeto de extensão - Estácio',
      description: 'Library API Information',
    },
    servers: [ { url: 'http://localhost:3000' } ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
  },
  apis: [ './routes/private/*.js', './routes/auth/*.js' ] // Ensure correct paths
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());

app.use(alimentoRoutes);
app.use(cadastroRoutes);
app.use(loginRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${ port }/api/docs`);
});

export default app;