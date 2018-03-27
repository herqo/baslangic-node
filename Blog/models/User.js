const mongoose = require('mongoose');
const PassportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Kullanici Adi Zorunlu'
  },
  email: {
    type: String,
    required: 'E-Posta Adresi Gerekli'
  },
  password: {
    type: String,
    required: 'Lutfen Sifre Girin'
  }
});

userSchema.plugin(PassportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
