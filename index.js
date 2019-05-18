const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");

const app = express();

const sessionConfig = {
  name: "session",
  secret: "i am secret",
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 2,
    secure: false
  },
  resave: false,
  saveUninitialized: true
};

app.use(express.json());
app.use(session(sessionConfig));
app.use(helmet());
app.use(cors());

const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);

const port = 4000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}.`);
});
