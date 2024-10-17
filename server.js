import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));

app.get("/", (_req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
