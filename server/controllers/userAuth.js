const userModel = require("../models/userModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class userAuth {
  // =============== user registaion ====================
  user_register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(401).json({ message: "please provite user name" });
    }
    if (!email) {
      return res.status(401).json({ message: "please provite user email" });
    }
    const emailValid = validator.isEmail(email);
    if (!emailValid) {
      return res.status(401).json({ message: "Invalid email format" });
    }
    if (!password) {
      return res.status(401).json({ message: "please provite user password" });
    }
    try {
      const user = await userModel.findOne({ email: email.trim() });
      if (user) {
        return res.status(404).json({ message: "user already exits" });
      } else {
        const newUser = await userModel.create({
          name: name.trim(),
          email: email.trim(),
          password: await bcrypt.hash(password.trim(), 10),
        });
        console.log("datas", newUser);
        return res
          .status(201)
          .json({ message: "new user create successfully", newUser });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // ================= Login ==================

  login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email) {
      return res.status(400).json({ message: "Plase provite email" });
    }
    const emailValid = validator.isEmail(email);
    if (!emailValid) {
      return res.status(400).json({ message: "Plase provite valid email" });
    }
    if (!password) {
      return res.status(400).json({ message: "Plase provite password" });
    }
    try {
      const user = await userModel.findOne({ email }).select("+password");
      console.log(user.name);
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const obj = { email: user.email, id: user._id, name: user.name };
          const token = await jwt.sign(obj, process.env.jwt_secret_key, {});
          return res
            .cookie("token", token)
            .json({ message: "Login Successfull", user });
        } else {
          return res.status(404).json({ message: "Sorry password not ok" });
        }
      } else {
        return res.status(404).json({ message: "user not found" });
      }
    } catch (error) {
      return res.status(404).json({ message: "User not found" });
    }
  };

  // ============ Profile shows =================
  decode_user = async (req, res) => {
    const { token } = req.cookies;
    // console.log("token", token);
    if (token) {
      const decodeUser = await jwt.verify(
        token,
        process.env.jwt_secret_key,
        {}
      );
      console.log("decodeUser", decodeUser);
      return res.json(decodeUser);
    } else {
      return res.json(null);
    }
  };

  logout = async (req, res) => {
    res.cookie("token", "").json(true);
  };
}

module.exports = new userAuth();
