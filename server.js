var express = require("express");
var app = express();
var session = require("express-session");
app.use(session({ secret: "shhhItsasecret" }));
var port = process.env.PORT || 8000;
var server = app.listen(port, () => console.log(`listening on port ${port}`));
var path = require("path");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

var io = require("socket.io")(server);

var colorpick = {};
io.on("connection", socket => {
  console.log(`Socket is connected and listening on port: ${port}`);
  socket.emit("newly_Connected", colorpick);
  socket.on("colorPicked", function(color) {
    colorpick = color;
    io.emit("selection", color);
  });
});

app.get("/", function(req, res) {
  res.render("index");
});
