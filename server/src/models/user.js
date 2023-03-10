import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    index: { unique: true },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: true,
  },
  salt: String,
  resetPasswordLink: {
    type: String,
    default: "",
  },
  token: String,
  tokenExp: Number,
  status: {
    type: Boolean,
    default: true
  },
  resources: [
    {
      type: Schema.Types.ObjectId,
      ref: "Resource"
    }
  ]
});

UserSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

UserSchema.statics.findByToken = function (token, cb) {
  let user = this;

  jwt.verify(token, secretKey, function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

UserSchema.virtual("plainPassword")
  .set(function (plainPassword) {
    // Use normal, not arrow function to access this
    this._password = plainPassword;
    this.salt = this.makeSalt();
    this.password = this.encryptPassword(plainPassword);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return bcrypt.hashSync(password, 10);
    } catch (err) {
      return "";
    }
  },

  authenticate: function (plainPassword) {
    return this.encryptPassword(plainPassword) === this.password;
  },
  verifyPassword: function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) return callback(err);
      callback(null, isMatch);
    });
  },

  getTokenData: function () {
    return {
      id: this.id,
      email: this.email,
    };
  },
  generateToken: function (cb) {
    let user = this;
    let token = jwt.sign(user._id.toHexString(), secretKey);
    user.tokenExp = moment().add(1, "hour").valueOf();
    user.token = token;

    user.save(function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  },

  equals: function (user) {
    return this._id == user._id;
  },

  canRead: function (object) {
    return (
      this.equals(object) ||
      (object.owner && object.owner == this.id) ||
      (object._id && object._id == this.id) ||
      this.role == "admin"
    );
  },
  canEdit: function (object) {
    return this.canRead(object); // can be extended later
  },
};

UserSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", UserSchema);
// module.exports = User
export default User;
