const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lagous', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
module.exports = mongoose


