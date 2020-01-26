const MongoClient = require("mongodb").MongoClient;
const env = require("dotenv");
const router = require("express").Router();
const track = require("./controller/track");

env.config();

const dbName = "attendance";
const client = new MongoClient(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

client.connect(function(err, db) {
  if (!err) {
    console.log("Connected to Database!");
    const db = client.db(dbName);

    router
      .route("/getSubsByDay/:day")
      .get((req, res) => track.GetSubsByDay(req, res, db));
    router
      .route("/getSubs")
      .get((req, res) => track.GetSubs(req, res, db));
    router
      .route("/getSub/:subId")
      .get((req, res) => track.GetSub(req, res, db));
    router
      .route("/recordAttendance/:subId")
      .post((req, res) => track.RecordAttendance(req, res, db));


  } else {
    console.error(err);
  }
});

module.exports = router;
