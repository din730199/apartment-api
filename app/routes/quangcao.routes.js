module.exports = (app) => {
  const quangcao = require('../controllers/quangcao.controller');

  app.get('/quangcao', quangcao.getAll);

  app.get('/quangcao/getByKeyword', quangcao.getByKeyword);

  app.post('/quangcao', quangcao.create);

  app.put('/quangcao/:id', quangcao.updateById);

  app.delete('/quangcao/:id', quangcao.deleteById);
};
