const jwt = require('jsonwebtoken');
const User = require("../model/userModel");

exports.signupUser = async (req, res) => {
  try {
    const user = User(req.body);
    const userSave = await user.save();
    res
      .status(201)
      .send({ status: 201, message: "User created...", user: userSave });
  } catch (error) {
    
    res.status(400).send({
      Status: 400,
      message: "Something went to wrong",
      error: error.errors,
    });
  }
};

exports.loginUser =  async (req, res) => {
    
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email,password });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res
        .status(200)
        .send({ status: 200, message: "Login SuccessFully", user: {token:token} });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};