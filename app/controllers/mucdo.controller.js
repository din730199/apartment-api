const MucDo = require('../models/mucdo.model');

// getAll
exports.getAll = (req, res) => {
  try {
    MucDo.getAll((err, data) => {
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

// create
exports.create = (req, res) => {
  try {
    MucDo.create(req.body, (err, data) => {
      try {
        if (err)
          res.status(500).send({
            message: err.message || 'Đã xảy ra một số lỗi khi tạo.',
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
    MucDo.updateById(req.params.id, req.body, (err, data) => {
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
    MucDo.deleteById(req.params.id, (err, data) => {
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
