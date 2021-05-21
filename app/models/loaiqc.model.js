const sql = require('./db');

const LoaiQC = function (loaiQC) {
  this.MaLoaiQC = loaiQC.MaLoaiQC;
  this.TenLoai = loaiQC.TenLoai;
};

// getAll
LoaiQC.getAll = (result) => {
  sql.query(`SELECT * FROM loaiqc`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

// create
LoaiQC.create = (newLoaiQC, result) => {
  sql.query(
    `SELECT * FROM loaiqc WHERE TenLoai = ?`,
    [newLoaiQC.TenLoai],
    (err, res) => {
      if (err) {
        console.log('err: ', err);
        result(err, null);
        return;
      }
      if (!(res.length === 0)) return result(null, {kind: 'exist'});
      sql.query(`INSERT INTO loaiqc SET ?`, newLoaiQC, (err, res) => {
        if (err) {
          console.log('err: ', err);
          result(err, null);
          return;
        }
        result(null, {id: res.insertId, ...newLoaiQC});
      });
    }
  );
};

// updateById
LoaiQC.updateById = (id, newLoaiQC, result) => {
  sql.query(
    `SELECT * FROM loaiqc WHERE TenLoai = ?`,
    [newLoaiQC.TenLoai],
    (err, res) => {
      if (err) {
        console.log('err: ', err);
        result(err, null);
        return;
      }
      console.log(res);
      if (!(res.length === 0)) return result(null, {kind: 'exist'});
      console.log('ok');
      sql.query(
        `UPDATE loaiqc SET TenLoai = ? WHERE MaLoaiQC = ?`,
        [newLoaiQC.TenLoai, id],
        (err, res) => {
          if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
          }

          if (res.affectedRows == 0) {
            // not found Customer with the id
            result({kind: 'not_found'}, null);
            return;
          }
          result(null, {MaLoaiQC: id, ...newLoaiQC});
        }
      );
    }
  );
};

// deleteById
LoaiQC.deleteById = (id, result) => {
  sql.query('DELETE FROM loaiqc WHERE MaLoaiQC = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows === 0) {
      // not found Customer with the id
      result({kind: 'not_found'}, null);
      return;
    }
    result(null, res);
  });
};

module.exports = LoaiQC;
