const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const userRoutes = require("./routes/user.routes");

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`running the app on port ${PORT}`);
});
