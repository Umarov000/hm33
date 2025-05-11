const { sendErrorRes } = require("../helpers/send_error_res");
const bcrypt = require('bcrypt');
const { userValidation } = require("../validation/user.validation");
const User = require("../schemas/User");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  try {
    const body = req.body;
    const { error, value } = userValidation(body);
    if (error) {
      return sendErrorRes(error, res);
    }
    const hashedPassword = bcrypt.hashSync(value.password, 7);

    const newAuthor = await User.create({
      ...value,
      password: hashedPassword,
    }); 
    res.status(201).send({ message: "New User added", newAuthor });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    sendErrorRes(error, res);
  }
};
const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).send(user);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    await User.findByIdAndUpdate(id, body);
    res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: `Parol yoki email xato!` });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if(!validPassword){
       return res.status(401).send({ message: `Parol yoki email xato!` });
    }

    const payload = {
        id: user._id,
        email: user.email,
        isActive: user.isActive

    }
    const token = jwt.sign(payload, config.get("userTokenKey"), {
      expiresIn: config.get("tokenExpTime"),
    });
    res
      .status(201)
      .send({
        message: `Tizimga xush kelibsiz ${user.name}`,
        id: user.id,
        token,
      });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
  loginUser,
};
