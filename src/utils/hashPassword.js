const bcrypt = require("bcrypt");

exports.hash = async (data) => {
  const salt = await bcrypt.genSalt(Number(process.env.SALTROUND));
  const hash = await bcrypt.hash(data, salt);
  return hash;
};
