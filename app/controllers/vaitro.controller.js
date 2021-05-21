const VaiTro = require('../models/vaitro.model');

// create
exports.create = (req, res) => {
  try {
    const newVaiTro = new VaiTro({
      TenVaiTro: req.body.TenVaiTro,
    });
    VaiTro.create(newVaiTro, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || 'Đã xảy ra một số lỗi khi tạo vai trò.',
        });
      else res.send(data);
    });
  } catch (error) {
    res.status(500).send({message: 'server error'});
  }
};

// findAll
exports.findAll = (req, res) => {
  try {
    VaiTro.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || 'Đã xảy ra một số lỗi khi truy xuất vai trò.',
        });
      else res.send(data);
    });
  } catch (error) {
    res.status(500).send({message: 'server error'});
  }
};

// updateById
exports.updateById = (req, res) => {
  try {
    VaiTro.updateById(req.params.id, new VaiTro(req.body), (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Không tìm thấy vai trò với id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: 'Lỗi khi cập nhật vai trò với id ' + req.params.id,
          });
        }
      } else res.send(data);
    });
  } catch (error) {
    res.status(500).send({message: 'server error'});
  }
};

// deleteById
exports.deleteById = (req, res) => {
  try {
    VaiTro.deleteById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Không tìm thấy vai trò với id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: 'Lỗi khi xóa vai trò với id ' + req.params.id,
          });
        }
      } else res.send({message: `Xóa thành công!`});
    });
  } catch (error) {
    res.status(500).send({message: 'server error'});
  }
};
