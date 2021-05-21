module.exports = (app) => {
  const phanhoi = require('../controllers/phanhoi.controller');

  app.get('/phanhoi', phanhoi.getAll);

  app.post('/phanhoi', phanhoi.create);

  app.put('/phanhoi/:id', phanhoi.updateById);

  app.delete('/phanhoi/:id', phanhoi.deleteById);
};
