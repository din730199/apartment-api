module.exports = (app) => {
  const mucdo = require('../controllers/mucdo.controller');

  app.get('/mucdo', mucdo.getAll);

  app.post('/mucdo', mucdo.create);

  app.put('/mucdo/:id', mucdo.updateById);

  app.delete('/mucdo/:id', mucdo.deleteById);
};
