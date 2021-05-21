const jwt = require('jsonwebtoken');
const sql = require('../models/db');

module.exports = (roles) => async (req, res, next) => {
  const token = req.header('auth-token');
  console.log(roles);
  const allowRoles = roles || ['Admin', 'bql', 'bqt'];
  if (!token) {
    return res.json({
      msg: 'Login expired',
    });
  }
  try {
    const decode = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    sql.query(
      `SELECT taikhoan.*, vaitro.TenVaiTro
        FROM taikhoan
          LEFT JOIN vaitro ON taikhoan.IdVaiTro = vaitro.IdVaiTro
        WHERE vaitro.TenVaiTro IN (?) AND taikhoan.IdTK = ?`,
      [allowRoles, decode.IdTK],
      (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          return res.status(401).send({msg: 'You are not authozized'});
        }
        req.token = token;
        req.user = result[0];
        next();
      }
    );
  } catch (error) {
    res.status(401).json({msg: 'Token not valid'});
  }
};
