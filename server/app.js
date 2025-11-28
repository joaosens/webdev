require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mainRoutes = require('./routes/mainRoutes');
const { runMigrations } = require('./database/connection');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(bodyParser.json());

// Rotas
app.use('/api', mainRoutes);

// Healthcheck
app.get('/health', (req, res) => {
  res.json({ success: true, status: 'ok' });
});

// Inicializa DB/migrations e sobe servidor
const port = process.env.PORT || 3000;
runMigrations().then(() => {
  app.listen(port, () => console.log(`Server rodando na porta ${port}`));
}).catch(err => {
  console.error('Erro ao rodar migrations:', err);
  process.exit(1);
});