const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "please provide the password as an argument: node mongo.js <password>",
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://phonebookdb:${password}@cluster1-lm71m.mongodb.net/phoneDB?retryWrites=true&w=majority`;
