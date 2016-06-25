var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var UsersSchema = new Schema(
    {
        username: String,
        displayname: String,
        password: String,
        roles: Array,
        isactive: Boolean,
        CreatedDate: Date,
		    ModifiedDate: Date,
        CreatedBy: String,
		    ModifiedBy: String
    }
);

UsersSchema.plugin(mongoosePaginate);

// Execute before each user.save call
UsersSchema.pre('save', function(callback){

  //console.log('encrypt password');
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
      if (err) {
          return callback(err)
      };

      bcrypt.hash(user.password, salt, null, function(err, hash) {
          if (err) return callback(err);
          user.password = hash;
          callback();
      });
  });

});

// verify password
UsersSchema.methods.verifyPassword = function(password, cb) {

    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }

        cb(null, isMatch);
    });
};

// get user token
UsersSchema.methods.getAuthorizationToken = function(username, password) {

    return new Buffer(username + ":" + password, "utf8").toString("base64")

};

var Users = mongoose.model('users', UsersSchema);

module.exports = Users
