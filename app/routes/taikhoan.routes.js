module.exports = (app) => {
  const taikhoan = require('../controllers/taikhoan.controller');
  const auth = require('../middleware/auth');
  const {check} = require('express-validator');

  app.post(
    '/taikhoan',
    [
      check('TenTaiKhoan', 'Không được để trống').not().isEmpty(),
      check('MaKhu', 'Không được để trống').not().isEmpty(),
      check('MatKhau', 'Không được để trống').not().isEmpty(),
      check('MatKhau', 'Mật khẩu phải có nhiều hơn 6 kí tự').isLength({min: 6}),
    ],
    taikhoan.create
  );

  app.post(
    '/taikhoan/login',
    [
      check('TenTaiKhoan', 'Không được để trống').not().isEmpty(),
      check('MatKhau', 'Không được để trống').not().isEmpty(),
      check('MatKhau', 'Mật khẩu phải có nhiều hơn 6 kí tự').isLength({min: 6}),
    ],
    taikhoan.login
  );
  app.get('/taikhoan/getById', auth(), (req, res) => {
    try {
      res.send(req.user);
    } catch (error) {
      res.status(500).send({message: 'server error'});
    }
  });
  app.get('/taikhoan', auth(['Admin']), taikhoan.getAll);

  app.get('/taikhoan/getByKeyword', auth(['Admin']), taikhoan.getByKeyword);

  app.get('/taikhoan/:MaKhu', auth(['Admin']), taikhoan.getByMakhu);

  app.delete('/taikhoan/:id', auth(['Admin']), taikhoan.deleteById);

  app.put('/taikhoan/:id', auth(['Admin']), taikhoan.updateById);
};
