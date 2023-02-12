const express = require("express");
const path = require("path");
const app = express();

require("dotenv").config();

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("https://elgharbaoui-soufiane.vercel.app/");
});

const sendEmail = require("./controllers/contact");
app.post("/contact", sendEmail);

app.use((err, req, res, next) => {
  res.status(500).json(err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});

module.exports = app;
