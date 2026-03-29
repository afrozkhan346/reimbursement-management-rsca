const bcrypt = require("bcrypt");
const Company = require("../models/Company");
const User = require("../models/user");
const signupSchema = require("../validators/signupSchema");

exports.signup = async (req, res) => {
  try {
    const parsed = signupSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.errors
      });
    }

    const { name, email, password, country } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const company = await Company.create({
      name: `${name} Company`,
      country,
      currency: "INR"
    });

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      company_id: company.id
    });

    res.status(201).json({
      message: "Signup successful",
      user
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};