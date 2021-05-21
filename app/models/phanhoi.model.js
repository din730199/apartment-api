const sql = require('./db');

const PhanHoi = function (phanhoi) {
  this.idTB = phanhoi.idTB;
  this.TenPH = phanhoi.TenPH;
  this.NoiDung = phanhoi.NoiDung;
  this.NgayNhan = phanhoi.NgayNhan;
  this.NguoiGui = phanhoi.NguoiGui;
  this.TinhTrang = phanhoi.TinhTrang;
  this.IdTK = phanhoi.IdTK;
  this.Access_Code = phanhoi.Access_Code;
  this.IdMucDo = phanhoi.IdMucDo;
};

// getAll
PhanHoi.getAll = (page, limit, result) => {
  const skip = (page - 1) * limit;
  sql.query(
    `SELECT phanhoi.*,mucdo.TenMucDo FROM phanhoi
      LEFT JOIN mucdo ON phanhoi.IdMucDo = mucdo.IdMucDo
      LIMIT ?,?`,
    [skip, parseInt(limit)],
    (err, res) => {
      if (err) return result(err, null);
      result(null, res);
    }
  );
};

// create
PhanHoi.create = (newPhanHoi, result) => {
  sql.query(
    `INSERT INTO phanhoi SET ?`,
    [{NgayNhan: new Date(), ...newPhanHoi}],
    (err, res) => {
      if (err) {
        console.log('err: ', err);
        result(err, null);
        return;
      }
      result(null, newPhanHoi);
    }
  );
};

// updateById
PhanHoi.updateById = (id, newPhanHoi, result) => {
  sql.query(
    `UPDATE phanhoi SET ? WHERE idTB = ?`,
    [newPhanHoi, id],
    (err, res) => {
      if (err) return result(err, null);
      if (res.affectedRows === 0) return result(null, {kind: 'not_found'});
      result(null, res);
    }
  );
};

// deleteById
PhanHoi.deleteById = (id, result) => {
  sql.query(`DELETE FROM phanhoi WHERE idTB = ?`, [id], (err, res) => {
    if (err) return result(err, null);
    if (res.affectedRows === 0) return result(null, {kind: 'not_found'});
    result(null, res);
  });
};

module.exports = PhanHoi;
