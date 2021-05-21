const LoaiQC = require('../models/loaiqc.model');

// getAll
exports.getAll = (req, res) => {
  try {
    LoaiQC.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || 'Đã xảy ra một số lỗi khi truy xuất loại quảng cáo.',
        });
      else res.send(data);
    });
  } catch (error) {
    res.status(500).send({message: 'server error'});
  }
};

// create
exports.create = (req, res) => {
  try {
    const newLoaiQC = new LoaiQC({
      MaLoaiQC: req.body.MaLoaiQC,
      TenLoai: req.body.TenLoai,
    });
    LoaiQC.create(newLoaiQC, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || 'Đã xảy ra một số lỗi khi tạo loại quảng cáo.',
        });
      else if (data.kind === 'exist')
        res.status(500).send({
          message: 'Tên loại quảng cáo đã tồn tại.',
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
    LoaiQC.updateById(req.params.id, req.body, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Không tìm thấy loại quảng cáo với mã ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: 'Lỗi khi cập nhật loại quảng cáo với mã ' + req.params.id,
          });
        }
      } else if (data.kind === 'exist')
        res.status(500).send({
          message: 'Tên loại quảng cáo đã tồn tại.',
        });
      else res.send(data);
    });
  } catch (error) {
    res.status(500).send({message: 'server error'});
  }
};

// deleteById
exports.deleteById = (req, res) => {
  try {
    LoaiQC.deleteById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Không tìm thấy loại quảng cáo với mã ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: 'Lỗi khi xóa loại quảng cáo với mã ' + req.params.id,
          });
        }
      } else res.send({message: `Xóa thành công!`});
    });
  } catch (error) {
    res.status(500).send({message: 'server error'});
  }
};
