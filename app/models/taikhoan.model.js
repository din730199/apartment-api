const sql = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const TaiKhoan = function (taikhoan) {
  this.TenTaiKhoan = taikhoan.TenTaiKhoan;
  this.MatKhau = taikhoan.MatKhau;
  this.IdVaiTro = taikhoan.IdVaiTro;
  this.Email = taikhoan.Email;
  this.SoDienThoai = taikhoan.SoDienThoai;
  this.NgayDangKy = taikhoan.NgayDangKy;
  this.MaKhu = taikhoan.MaKhu;
};

// create
TaiKhoan.create = (newTaiKhoan, result) => {
  sql.query(`INSERT INTO taikhoan SET ?`, newTaiKhoan, (err, res) => {
    if (err) {
      console.log('err: ', err);
      result(err, null);
      return;
    }
    result(null, {id: res.insertId, ...newTaiKhoan});
  });
};

// login
TaiKhoan.login = (data, result) => {
  sql.query(
    `SELECT taikhoan.*, vaitro.TenVaiTro
    FROM taikhoan
      LEFT JOIN vaitro ON taikhoan.IdVaiTro = vaitro.IdVaiTro
    WHERE taikhoan.TenTaiKhoan = '${data.TenTaiKhoan}'`,
    (err, res) => {
      if (err) {
        console.log('err: ', err);
        result(err, null);
        return;
      } else if (res.length === 0) result(null, res.length);
      else {
        if (!bcrypt.compareSync(data.MatKhau, res[0].MatKhau)) {
          result(null, {kind: 'not_found'});
        } else {
          jwt.sign(
            {
              IdTK: res[0].IdTK,
            },
            process.env.TOKEN_SECRET_KEY,
            {
              expiresIn: '7d',
            },
            (err, token) => {
              if (err) result(err, null);
              result(null, {data: res[0], token});
            }
          );
        }
      }
    }
  );
};

// getAll
TaiKhoan.getAll = (page, limit, result) => {
  const skip = (page - 1) * limit;
  sql.query(
    `SELECT
    taikhoan.*,
    vaitro.TenVaiTro,
    chungcu.TenChungCu
    FROM
    taikhoan
    LEFT JOIN vaitro ON taikhoan.IdVaiTro = vaitro.IdVaiTro
    LEFT JOIN chungcu ON taikhoan.MaKhu = chungcu.MaKhu
    LIMIT ?, ?`,
    [skip, parseInt(limit)],
    (err, res) => {
      if (err) return result(err, null);
      result(null, res);
    }
  );
};

// getByKeyword
TaiKhoan.getByKeyword = (keyword, page, limit, result) => {
  const skip = (page - 1) * limit;
  sql.query(
    `SELECT
    taikhoan.*,
    vaitro.TenVaiTro,
    chungcu.TenChungCu
    FROM
    taikhoan
    LEFT JOIN vaitro ON taikhoan.IdVaiTro = vaitro.IdVaiTro
    LEFT JOIN chungcu ON taikhoan.MaKhu = chungcu.MaKhu
    WHERE
    taikhoan.TenTaiKhoan LIKE "%${keyword}%"
    LIMIT ?, ?`,
    [skip, parseInt(limit)],
    (err, res) => {
      if (err) return result(err, null);
      result(null, res);
    }
  );
};

// getByMaKhu
TaiKhoan.getByMaKhu = (MaKhu, page, limit, result) => {
  const pages = (page - 1) * limit;
  sql.query(
    `SELECT taikhoan.*, vaitro.TenVaiTro,chungcu.TenChungCu
  FROM taikhoan
    LEFT JOIN vaitro ON taikhoan.IdVaiTro = vaitro.IdVaiTro
    LEFT JOIN chungcu ON taikhoan.MaKhu = chungcu.MaKhu
  WHERE taikhoan.MaKhu = ?
  LIMIT ?, ?`,
    [MaKhu, pages, parseInt(limit)],
    (err, res) => {
      if (err) return result(err, null);
      result(null, res);
    }
  );
};

// deleteById
TaiKhoan.deleteById = (id, result) => {
  sql.query(
    `DELETE FROM taikhoan WHERE taikhoan.IdTK = ?`,
    [id],
    (err, res) => {
      if (err) return result(err, null);
      if (res.affectedRows === 0) return result(null, {kind: 'not_found'});
      result(null, res);
    }
  );
};

// updateById
TaiKhoan.updateById = (id, updateData, result) => {
  if (updateData.MatKhau === undefined) {
    sql.query(
      `UPDATE taikhoan SET ? WHERE taikhoan.IdTK = ?`,
      [updateData, id],
      (err, res) => {
        if (err) return result(err, null);
        if (res.affectedRows === 0) return result(null, {kind: 'not_found'});
        result(null, res);
      }
    );
  } else {
    const {MatKhau, SoDienThoai, Email, MaKhu, IdVaiTro} = updateData;
    sql.query(
      `UPDATE taikhoan SET ? WHERE taikhoan.IdTK = ?`,
      [
        {
          MatKhau: bcrypt.hashSync(MatKhau, 8),
          SoDienThoai,
          Email,
          MaKhu,
          IdVaiTro,
        },
        id,
      ],
      (err, res) => {
        if (err) return result(err, null);
        if (res.affectedRows === 0) return result(null, {kind: 'not_found'});
        result(null, res);
      }
    );
  }
};

module.exports = TaiKhoan;
