const { sendErrorRes } = require("../helpers/send_error_res");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { adminValidation } = require("../validation/admin.validation");
const Admin = require("../schemas/Admin");

const create = async (req, res) => {
  try {
    const body = req.body;
    const { error, value } = adminValidation(body);
    if (error) {
      return sendErrorRes(error, res);
    }
    const hashedPassword = bcrypt.hashSync(value.password, 7);

    const newAdmin = await Admin.create({
      ...value,
      password: hashedPassword,
    });
    res.status(201).send({ message: "New Admin added", newAdmin });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findAll = async (req, res) => {
  try {
  

    const admins = await Admin.find({});
    res.status(200).send(admins);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    res.status(200).send(admin);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    await Admin.findByIdAndUpdate(id, body);
    res.status(200).send({ message: "Admin updated successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await Author.findByIdAndDelete(id);
    res.status(200).send({ message: "Admin deleted successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).send({ message: `Parol yoki email xato!` });
    }
    const validPassword = bcrypt.compareSync(password, admin.password);
    if (!validPassword) {
      return res.status(401).send({ message: `Parol yoki email xato!` });
    }


    const payload = {
      id: admin._id,
      email: admin.email,
      isActive: admin.isActive,
      isCreator: admin.isCreator,
    };


    const token = jwt.sign(payload, config.get("adminTokenKey"), {
      expiresIn: config.get("tokenExpTime"),
    });

    res.status(201).send({
      message: `Tizimga xush kelibsiz ${admin.first_name}`,
      id: admin.id,
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
  loginAdmin,
};
