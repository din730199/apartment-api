const sql = require('./db');

const MucDo = function (mucdo) {
  this.IdMucDo = mucdo.IdMucDo;
  this.TenMucDo = mucdo.TenMucDo;
};

// getAll
MucDo.getAll = (result) => {
  sql.query(`SELECT IdMucDo, TenMucDo FROM mucdo`, (err, res) => {
    if (err) return result(err, null);
    result(null, res);
  });
};

// create
MucDo.create = (newMucDo, result) => {
  sql.query(`INSERT INTO mucdo SET ?`, newMucDo, (err, res) => {
    if (err) {
      console.log('err: ', err);
      result(err, null);
      return;
    }
    result(null, {id: res.insertId, ...newMucDo});
  });
};

// updateById
MucDo.updateById = (id, newMucDo, result) => {
  sql.query(
    `UPDATE mucdo SET ? WHERE IdMucDo = ?`,
    [newMucDo, id],
    (err, res) => {
      if (err) return result(err, null);
      if (res.affectedRows === 0) return result(null, {kind: 'not_found'});
      result(null, res);
    }
  );
};

// deleteById
MucDo.deleteById = (id, result) => {
  sql.query(`DELETE FROM mucdo WHERE mucdo.IdMucDo = ?`, [id], (err, res) => {
    if (err) return result(err, null);
    if (res.affectedRows === 0) return result(null, {kind: 'not_found'});
    result(null, res);
  });
};

module.exports = MucDo;
