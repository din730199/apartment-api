const QuangCao = require('../models/quangcao.model');

// getAll
exports.getAll = (req, res) => {
  try {
    QuangCao.getAll(req.query.page, req.query.limit, (err, data) => {
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
    QuangCao.getByKeyword(
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

// create
exports.create = (req, res) => {
  const {
    TenQC,
    NoiDung,
    NoiDungPhu,
    DiaChi,
    TenCuaHang,
    MaLoaiQC,
    IdTK,
  } = req.body;

  const newQuangCao = new QuangCao({
    TenQC,
    NoiDung,
    NoiDungPhu,
    NgayDang: new Date(),
    DiaChi,
    TenCuaHang,
    MaLoaiQC,
    IdTK,
  });

  try {
    QuangCao.create(newQuangCao, (err, data) => {
      try {
        if (err)
          res.status(500).send({
            message: err.message || 'Đã xảy ra một số lỗi khi tạo quảng cáo.',
          });
        else {
          res.send(data);
        }
      } catch (error) {
        res.status(500).send({message: 'server error'});
      }
    });
  } catch (error) {
    res.status(500).send({message: 'server error'});
  }
};

// updateById
exports.updateById = (req, res) => {
  try {
    QuangCao.updateById(req.params.id, req.body, (err, data) => {
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
    });
  } catch (error) {
    res.status(500).send({message: 'server error'});
  }
};

// deleteById
exports.deleteById = (req, res) => {
  try {
    QuangCao.deleteById(req.params.id, (err, data) => {
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
