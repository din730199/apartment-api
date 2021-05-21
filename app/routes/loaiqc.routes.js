module.exports = (app) => {
  const loaiqc = require('../controllers/loaiqc.controller');

  app.get('/loaiqc', loaiqc.getAll);

  app.post('/loaiqc', loaiqc.create);

  app.put('/loaiqc/:id', loaiqc.updateById);

  app.delete('/loaiqc/:id', loaiqc.deleteById);
};
