const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const authRoutes = require("./routes/auth");
dotenv.config({ path: "./config/config.env" });

const {
  notFoundErrorHandler,
  globalErrorHandler,
} = require("./middlewares/error");

const app = express();

const PORT = process.env.PORT;
const mongoDB = process.env.MONGO_URI;
// parse incomming request into json
app.use(express.json());

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

// server health check
app.get("/", (req, res) => {
  res.status(200).json({
    type: "success",
    message: "server is up and running",
    data: null,
  });
});

// register auth routes
app.use("/api/auth", authRoutes);

// api route not found error handling
app.use("*", notFoundErrorHandler);

//global error handler
app.use(globalErrorHandler);

async function main() {
  try {
    await connectDatabase();
    // start express server
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

main();
