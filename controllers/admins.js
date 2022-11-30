const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = `$N7Xc#u@*2DC7sy$34%dVz#5^!3E&u`;

const login = async (req, res) => {
  const body = req.body;
  const admin = await Admin.findOne({ email: body.email });
  if (admin) {
    const validatePassword = await bcrypt.compare(
      body.password,
      admin.password
    );

    if (validatePassword) {
      let token = jwt.sign(
        {
          uid: admin._id,
          email: admin.email,
        },
        secret
      );

      res.json({
        status: "success",
        token: token,
        nickname: admin.nickname,
      });
    } else {
      res.json({
        status: "error",
        message: "Password is incorrect",
      });
    }
  } else {
    res.json({
      status: "error",
      message: "No admin found with this email",
    });
  }
};

const changePassword = async (req, res) => {
  const body = req.body;
  const admin = await Admin.findOne({ token: body.token });
  if (admin) {
    const validatePassword = await bcrypt.compare(
      body.password,
      admin.password
    );

    if (validatePassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body.newPassword, salt);
      await Admin.updateOne(
        { token: body.token },
        { $set: { password: hashedPassword } }
      );
      res.json({
        status: "success",
        message: "Password changed successfully",
      });
    } else {
      res.json({
        status: "error",
        message: "Password is incorrect",
      });
    }
  }
};
//POST
// const create =  async (req, res) => {
//   let admin = new Admin();
//   admin.nickname = req.body.nickname;
//   admin.email = req.body.email;
//   admin.password = req.body.password;

//   const checkNickname = await Admin.findOne({ nickname: req.body.nickname });

//   if(admin.password == "") {
//     return res.json({
//       status: "error",
//       message: "Password can't be empty"
//     });
//   }

//   //generate salt to hash password
//   const salt = await bcrypt.genSalt(10);

//   //set user password to hashed password
//   admin.password = await bcrypt.hash(admin.password, salt);

//   //check if nickname is already in use
//   if(checkNickname) {
//     return res.json({
//       status: "error",
//       message: "This nickname is already in use, choose another one"
//     });
//   }

//   admin.save().then(result => {
//     let token = jwt.sign({
//       uid: admin._id,
//       nickname: admin.nickname,
//     }, secret);

//     res.json({
//       status: "success",
//       data:{
//         "token": token,
//       }
//     });
//   });
// };

module.exports = {
  login,
  changePassword,
};

//module.exports.create = create;
