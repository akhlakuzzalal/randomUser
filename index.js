const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const userRoutes = require("./routes/user.routes");

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`running the app on port ${PORT}`);
});
