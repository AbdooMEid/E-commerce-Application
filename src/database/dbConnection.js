const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) => console.log(`connect mongoDB! : ${conn.connection.host}`))
    .catch((err) => {
      console.error(err);
    });
};

module.exports = dbConnection;
