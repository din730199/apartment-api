const sql = require('./db.js');

const VaiTro = function (vaiTro) {
  this.TenVaiTro = vaiTro.TenVaiTro;
};

// create
VaiTro.create = (newVaiTro, result) => {
  sql.query(`INSERT INTO vaitro SET ?`, newVaiTro, (err, res) => {
    if (err) {
      console.log('err: ', err);
      result(err, null);
      return;
    }
    result(null, {id: res.insertId, ...newVaiTro});
  });
};

// getAll
VaiTro.getAll = (result) => {
  sql.query('SELECT * FROM vaitro', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

// updateById
VaiTro.updateById = (id, vaitro, result) => {
  sql.query(
    'UPDATE vaitro SET TenVaiTro = ? WHERE IdVaiTro = ?',
    [vaitro.TenVaiTro, id],
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
      result(null, {id: id, ...vaitro});
    }
  );
};

// deleteById
VaiTro.deleteById = (id, result) => {
  sql.query('DELETE FROM vaitro WHERE IdVaiTro = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log(res);
    if (res.affectedRows === 0) {
      // not found Customer with the id
      result({kind: 'not_found'}, null);
      return;
    }
    result(null, res);
  });
};

module.exports = VaiTro;
