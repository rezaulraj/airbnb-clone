const express = require("express");
const cors = require("cors");
const db_connection = require("./config/db");
const userRouter = require("./routes/userRoute");
const imageRouter = require("./routes/imageRoute");
const addNewPlace = require("./routes/addNewPlace");
const bookingRouter = require("./routes/bookingRoute");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
// -------- middleware--------
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// ==================Router===============
app.get("/text", (req, res) => {
  res.json("just ok");
});

app.use("/", userRouter);
app.use("/", imageRouter);
app.use("/", addNewPlace);
app.use("/", bookingRouter);

app.listen(4000, () => {
  db_connection();
  console.log(`the server is running on port http://localhost:4000`);
});
