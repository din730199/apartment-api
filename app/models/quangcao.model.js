const sql = require('./db');

const QuangCao = function (quangcao) {
  this.idQC = quangcao.idQC;
  this.TenQC = quangcao.TenQC;
  this.NoiDung = quangcao.NoiDung;
  this.NoiDungPhu = quangcao.NoiDungPhu;
  this.NgayDang = quangcao.NgayDang;
  this.DiaChi = quangcao.DiaChi;
  this.TenCuaHang = quangcao.TenCuaHang;
  this.MaLoaiQC = quangcao.MaLoaiQC;
  this.IdTK = quangcao.IdTK;
};

// getAll
QuangCao.getAll = (page, limit, result) => {
  const skip = (page - 1) * limit;
  sql.query(
    `SELECT quangcao.*,loaiqc.TenLoai FROM quangcao
      LEFT JOIN loaiqc ON quangcao.MaLoaiQC = loaiqc.MaLoaiQC
      LIMIT ?,?`,
    [skip, parseInt(limit)],
    (err, res) => {
      if (err) return result(err, null);
      result(null, res);
    }
  );
};

// getByKeyword
QuangCao.getByKeyword = (keyword, page, limit, result) => {
  const skip = (page - 1) * limit;
  sql.query(
    `SELECT
    quangcao.*,
    loaiqc.TenLoai
FROM
    quangcao
LEFT JOIN loaiqc ON quangcao.MaLoaiQC = loaiqc.MaLoaiQC
WHERE
    TenQC LIKE "%${keyword}%"
LIMIT ?, ?`,
    [skip, parseInt(limit)],
    (err, res) => {
      if (err) return result(err, null);
      result(null, res);
    }
  );
};

// create
QuangCao.create = (newQuangCao, result) => {
  sql.query(`INSERT INTO quangcao SET ?`, newQuangCao, (err, res) => {
    if (err) {
      console.log('err: ', err);
      result(err, null);
      return;
    }
    result(null, {id: res.insertId, ...newQuangCao});
  });
};

// updateById
QuangCao.updateById = (id, newQuangCao, result) => {
  sql.query(
    `UPDATE quangcao SET ? WHERE idQC = ?`,
    [newQuangCao, id],
    (err, res) => {
      if (err) return result(err, null);
      if (res.affectedRows === 0) return result(null, {kind: 'not_found'});
      result(null, res);
    }
  );
};

// deleteById
QuangCao.deleteById = (id, result) => {
  sql.query(
    `DELETE FROM quangcao WHERE quangcao.idQC = ?`,
    [id],
    (err, res) => {
      if (err) return result(err, null);
      if (res.affectedRows === 0) return result(null, {kind: 'not_found'});
      result(null, res);
    }
  );
};

module.exports = QuangCao;
