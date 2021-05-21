module.exports = (app) => {
  const vaitro = require('../controllers/vaitro.controller');

  app.post('/vaitro', vaitro.create);

  app.get('/vaitro', vaitro.findAll);

  app.put('/vaitro/:id', vaitro.updateById);

  app.delete('/vaitro/:id', vaitro.deleteById);
};
