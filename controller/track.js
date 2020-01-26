const ObjectId = require("mongodb").ObjectID;

exports.GetSubsByDay = (req, res, db) => {
  let { day } = req.params;
  db.collection("days")
    .findOne({ day })
    .then(doc => {
      res.status(200).json({
        status: "success",
        doc
      });
    })
    .catch(err => console.error(err));
};

exports.Hi = (req, res) => {
  res.status(200).json({ msg: "Hi!" });
};

exports.RecordAttendance = (req, res, db) => {
  let { subId } = req.params;
  let { attType } = req.body;
  let addAtt = attType == "present" ? 1 : 0;
  let isPresent = attType == "present" ? true : false;
  db.collection("subjects")
    .updateOne(
      { _id: ObjectId(subId) },
      {
        $inc: {
          "details.total": 1,
          "details.attended": addAtt
        },
        $push: {
          "details.last7": {
            $each: [isPresent],
            $slice: -7
          }
        }
      }
    )
    .then(doc => {
      res.status(200).json({
        status: "success",
        doc
      });
    })
    .catch(err => console.error(err));
};

exports.GetSubs = (req, res, db) => {
  db.collection('subjects')
  .find()
  .toArray()
  .then(docs => {
    let data = docs.map(el => {
      let doc = el;
      doc.details.percent = Number((el.details.attended / el.details.total * 100).toFixed(2));
      if (!doc.details.percent) {
        doc.details.percent = 0;
      }
      return doc;
    })
    res.status(200).json({
      status: 'success',
      docs: data
    })
  })
  .catch(err => console.error(err));
};

exports.GetSub = (req, res, db) => {
  const { subId } = req.params;
  db.collection('subjects')
  .findOne({ _id: ObjectId(subId) })
  .then(doc => {
    let data = doc;
    let percent = Number((doc.details.attended / doc.details.total * 100).toFixed(2));
    if (!percent) {
      percent = 0;
    }
    data.details.percent = percent;
    res.status(200).json({
      status: 'success',
      doc: data
    })
  })
  .catch(err => console.error(err));
};

exports.Hi = (req, res) => {
  res.status(200).json({ msg: "Hi!" });
};
