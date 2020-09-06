// init project
var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// send / route
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/view/index.html');
});

app.get("/api/timestamp", (req, res) => {
  date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
})

app.get("/api/timestamp/:date_str", (req, res) => {
  if (/-/.test(req.params.date_str)) {
    date = new Date(req.params.date_str);
  }
  else {
    var unix = Number.parseInt(req.params.date_str);
    date = new Date(unix);
  }

  if (date.getTime()) {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});