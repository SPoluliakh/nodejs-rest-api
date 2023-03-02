const { User } = require("../../models/user");
const gravatar = require("gravatar");

const { createToken } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const avatarURL = gravatar.url(email);
  const newUser = new User({ name, email, avatarURL });
  await newUser.setPassword(password);

  const payload = {
    id: newUser._id,
  };
  const token = createToken(payload);
  newUser.token = token;

  await newUser.save();

  res.status(201).json({
    response: "success",
    status: 201,
    data: {
      user: {
        name,
        email,
        avatarURL,
      },
      token,
    },
  });
};

module.exports = register;
