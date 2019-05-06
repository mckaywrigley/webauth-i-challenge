const express = require("express");

const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);

const port = 4000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}.`);
});
