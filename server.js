const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const upload = require('./app/middleware/multer');

const app = express();

app.use(cors());
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use('/uploads', express.static(__dirname + '/uploads'));

// simple route
app.get('/', (req, res) => {
  res.json({message: 'Welcome'});
});

// require('./app/routes/vaitro.routes')(app);
// require('./app/routes/taikhoan.routes')(app);
// require('./app/routes/loaiqc.routes')(app);
// require('./app/routes/quangcao.routes')(app);
// require('./app/routes/mucdo.routes')(app);
// require('./app/routes/phanhoi.routes')(app);

app.post('/upload', upload.single('upload'), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error);
    }
    console.log(file.filename);
    res.send({image: '/uploads/' + file.filename});
  } catch (error) {
    res.status(500).send({message: 'server error'});
  }
});
// set port, listen for requests
app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
