const express = require("express");
const app = express();
const port = 3000;

app.get("/books", (req, res) => {
  res.json({
    items: [
      {
        title: "Lord of the Rings",
      },
    ],
  });
});

module.exports = app.listen(port);
