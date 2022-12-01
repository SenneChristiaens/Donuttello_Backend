const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = `$N7Xc#u@*2DC7sy$34%dVz#5^!3E&u`; //niet goed

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
  // split the token from the header
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(404).json({ status: "failed", message: "Unauthorized" });
  }

  // Verify the token with built in jwt.verify() method
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(404).json({
        status: "failed",
        message: "You are not authorized to perform this action.",
      });
    }
    const body = req.body;
    // find the admin with the id from the token
    Admin.findById(decoded.uid, (err, admin) => {
      if (err) {
        res.status(404).json({
          status: "failed",
          message: "Something went wrong. Please try again later.",
        });
      }
      // is there an admin with this email?
      if (!admin) {
        res.status(404).json({
          status: "failed",
          message: "No admin found with this email",
        });
      }

      // compare the password from the request with the password from the database
      bcrypt.compare(body.oldPassword, admin.password, (err, result) => {
        if (err) {
          res.status(404).json({
            status: "failed",
            message: "Something went wrong. Please try again later.",
          });
        }
        // if the password is correct, hash the new password
        if (result) {
          bcrypt.hash(body.newPassword, 10, (err, hash) => {
            if (err) {
              res.status(404).json({
                status: "failed",
                message: "Something went wrong. Please try again later.",
              });
            }
            // if the old password is incorrect, return an error
            if (hash == admin.password) {
              res.status(404).json({
                status: "failed",
                message: "New password cannot be same as old password",
              });
            }
            // update the admin with the new password
            Admin.findByIdAndUpdate(
              decoded.uid,
              { password: hash },
              (err, admin) => {
                if (err) {
                  res.status(404).json({
                    status: "failed",
                    message: "Something went wrong. Please try again later.",
                  });
                }
                // return a success message
                res.status(200).json({
                  status: "success",
                  message: "Password changed successfully",
                  data: admin,
                });
              }
            );
          });
        }
      });
    });
  });
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
