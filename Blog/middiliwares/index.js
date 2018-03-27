// const UserModel = require('../models/User');

const middlewareObj = {};

middlewareObj.Isloginned = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Lutfen Once Giris Yapiniz');
  res.redirect('/');
};

module.exports = middlewareObj;
