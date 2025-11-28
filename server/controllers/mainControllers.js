const { db } = require('../database/connection');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

module.exports = {
  async getData(req, res) {
    try {
      // Exemplo de conteúdo simples; pode buscar produtos futuramente
      res.json({ success: true, data: { message: 'Conteúdo público', timestamp: Date.now() } });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Erro ao obter dados.' });
    }
  },

  async register(req, res) {
    try {
      const { username, email, password } = req.body || {};
      if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Campos obrigatórios ausentes.' });
      }
      const exists = await userModel.findByEmailOrUsername(email, username);
      if (exists) {
        return res.status(409).json({ success: false, message: 'Usuário ou email já cadastrado.' });
      }
      const hash = await bcrypt.hash(password, 10);
      const userId = await userModel.create({ username, email, password_hash: hash });
      res.json({ success: true, user: { id: userId, username, email } });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Erro ao registrar usuário.' });
    }
  },

  async login(req, res) {
    try {
      const { email, username, password } = req.body || {};
      if (!password || (!email && !username)) {
        return res.status(400).json({ success: false, message: 'Login inválido.' });
      }
      const user = await userModel.findOne({ email, username });
      if (!user) {
        return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
      }
      const ok = await bcrypt.compare(password, user.password_hash);
      if (!ok) {
        return res.status(401).json({ success: false, message: 'Senha incorreta.' });
      }
      res.json({ success: true, user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Erro no login.' });
    }
  },

  async checkout(req, res) {
    try {
      const { items, total } = req.body || {};
      if (!Array.isArray(items) || typeof total !== 'number') {
        return res.status(400).json({ success: false, message: 'Dados de checkout inválidos.' });
      }
      // Aqui poderíamos persistir o pedido, mas como é exemplo:
      res.json({ success: true, message: 'Pedido recebido.', order: { items, total } });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Erro ao processar pedido.' });
    }
  }
};