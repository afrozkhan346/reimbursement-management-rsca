const Company = require("../models/Company");
const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, country } = req.body;

    const company = await Company.create({
      name: `${name} Company`,
      country,
      currency: "INR"
    });

    const user = await User.create({
      name,
      email,
      password,
      role: "admin",
      company_id: company.id
    });

    res.json(user);

  } catch (err) {
    res.status(500).json(err);
  }
};