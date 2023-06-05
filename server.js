const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const authRoutes = require("./routes/auth");
dotenv.config({ path: "./config/config.env" });
const {
  notFoundErrorHandler,
  globalErrorHandler,
} = require("./middlewares/error");

// initializing express app
const app = express();

const PORT = process.env.PORT;
const mongoDB = process.env.MONGO_URI;

// parse incomming request into json
app.use(express.json());

// connecting to database
const connectDatabase = async () => {
  mongoose.set("strictQuery", true);
  await mongoose
    .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((con) => {
      console.log(`Database connected : ${con.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

// checking if the server is working fine
app.get("/", (req, res) => {
  res.status(200).json({
    type: "success",
    message: "server is up and running",
    data: null,
  });
});

// register auth routes
app.use("/api/v1", authRoutes);

// 404 error handle
app.use("*", notFoundErrorHandler);

//global error handler
app.use(globalErrorHandler);

async function main() {
  try {
    await connectDatabase();
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

main();
