const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'first Name field required']
  },
  lastName: {
    type: String,
    required: [true, 'Last Name field required']
  },
  email: {
    type: String,
    required: [true, 'Email field required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Email address is not valid']
  },
  photo: {
    type: String,
    default: 'http://localhost:8080/images/default.png'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Password field is required'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm Password field is required'],
    validate: {
      validator: function(el) {
        // only work on save
        return el === this.password;
      },
      message: 'Confirm Password field should Match',
      select: false
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

userSchema.pre('save', async function(next) {
  // if password is not modified than return
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }

  // will change subtract by 1000 later
  this.passwordChangedAt = Date.now() - 1000;

  next();
});

userSchema.methods.checkPassword = async function(
  candidatePassword,
  userPassword
) {
  // console.log(candidatePassword, userPassword);
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changePasswordAfter = function(jwtTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return jwtTimestamp < changedTimeStamp;
  }

  // password not changed
  return false;
};

userSchema.pre(/^find/, function(next) {
  this.find({ active: true });
  next();
});

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  console.log(resetToken);
  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
