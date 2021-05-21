const TaiKhoan = require('../models/taikhoan.model');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

// create
exports.create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const {TenTaiKhoan, MatKhau, IdVaiTro, Email, SoDienThoai, MaKhu} = req.body;
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({
        message: 'Không được để trống!',
      });
    }

    const newTaiKhoan = new TaiKhoan({
      TenTaiKhoan,
      MatKhau: bcrypt.hashSync(MatKhau, 8),
      IdVaiTro,
      Email,
      SoDienThoai,
      NgayDangKy: new Date(),
      MaKhu,
    });
    TaiKhoan.create(newTaiKhoan, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || 'Đã xảy ra một số lỗi khi tạo tài khoản.',
        });
      else {
        res.send(data);
      }
    });
  } catch (error) {
    res.status(500).send({message: 'server error'});
  }
};

// login
exports.login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  try {
    TaiKhoan.login(req.body, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || 'Tài khoản không đúng.',
        });
      else if (data === 0)
        res.status(500).send({
          message: 'Tài khoản không đúng.',
        });
      else if (data.kind === 'not_found')
        res.status(500).send({
          message: 'Mật khẩu không đúng.',
        });
      else res.send(data);
    });
  } catch (error) {
    res.status(500).send({message: 'server error'});
  }
};

// getAll
exports.getAll = (req, res) => {
  try {
    TaiKhoan.getAll(req.query.page, req.query.limit, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Đã xảy ra một số lỗi khi truy vấn.',
        });
      } else {
        res.send(data);
      }
    });
  } catch (error) {
    res.status(500).send({message: 'server error'});
  }
};

// getByKeyword
exports.getByKeyword = (req, res) => {
  try {
    TaiKhoan.getByKeyword(
      req.query.keyword,
      req.query.page,
      req.query.limit,
      (err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message || 'Đã xảy ra một số lỗi khi truy vấn.',
          });
        } else {
          res.send(data);
        }
      }
    );
  } catch (error) {
    res.status(500).send({message: 'server error'});
  }
};

// getByMakhu
exports.getByMakhu = (req, res) => {
  try {
    TaiKhoan.getByMaKhu(
      req.query.makhu,
      req.query.page,
      req.query.limit,
      (err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message || 'Đã xảy ra một số lỗi khi truy vấn.',
          });
        } else {
          res.send(data);
        }
      }
    );
  } catch (error) {
    res.status(500).send({message: 'server error'});
  }
};

// deleteById
exports.deleteById = (req, res) => {
  try {
    TaiKhoan.deleteById(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send({
          message: err.message || 'Đã xảy ra một số lỗi khi truy vấn.',
        });
      }
      if (data.kind === 'not_found') {
        return res.status(404).send({
          message: `Không tìm thấy với id ${req.params.id}.`,
        });
      }
      res.send({message: `Xóa thành công!`});
    });
  } catch (error) {
    res.status(500).send({message: 'server error'});
  }
};

// updateById
exports.updateById = (req, res) => {
  const {MatKhau, reMaKhau, SoDienThoai, Email, MaKhu, IdVaiTro} = req.body;
  try {
    if (
      (MatKhau === undefined && reMaKhau === undefined) ||
      (MatKhau === '' && reMaKhau === '')
    ) {
      TaiKhoan.updateById(
        req.params.id,
        {SoDienThoai, Email, MaKhu, IdVaiTro},
        (err, data) => {
          if (err) {
            return res.status(500).send({
              message: err.message || 'Đã xảy ra một số lỗi khi truy vấn.',
            });
          }
          if (data.kind === 'not_found') {
            return res.status(404).send({
              message: `Không tìm thấy với id ${req.params.id}.`,
            });
          }
          res.send({message: `Cập nhật thành công!`});
        }
      );
    } else if (!(MatKhau === reMaKhau)) {
      res.status(404).send({
        message: `Nhập lại mật khẩu không trùng.`,
      });
    } else {
      TaiKhoan.updateById(
        req.params.id,
        {MatKhau, SoDienThoai, Email, MaKhu, IdVaiTro},
        (err, data) => {
          if (err) {
            return res.status(500).send({
              message: err.message || 'Đã xảy ra một số lỗi khi truy vấn.',
            });
          }
          if (data.kind === 'not_found') {
            return res.status(404).send({
              message: `Không tìm thấy với id ${req.params.id}.`,
            });
          }
          res.send({message: `Cập nhật thành công!`});
        }
      );
    }
  } catch (error) {
    res.status(500).send({message: 'server error'});
  }
};
