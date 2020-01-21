const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const fs = require('fs');

let data = [];

const addData = (arr) => {
    for(var i=0;i<arr.length;i++) {
        data.push({
            "subject": arr[i],
            "details": {
                "total": 0,
                "attended": 0,
                "last7": [],
            }
        })
    }
    console.log('Loop exited!');
};

const dbName = "attendance";
const client = new MongoClient('mongodb+srv://mujtaba:mujtaba@cluster0-fefvl.mongodb.net/attendance?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

client.connect( async (err, db) => {
  if (!err) {
    console.log("Connected to Database!");
    const db = client.db(dbName);
    db.collection('subjects').find().toArray()
    .then(docs => {
        subArr = [3, 0, 6];
        subList = subArr.map((el, index) => {
            // posList = [1, 2];
            return {
                sub: docs[subArr[index]].subject,
                subId: ObjectId(docs[subArr[index]]._id),
                period: (index + 1) * 1,
            }
        });
        db.collection('days').updateOne(
            { day: 'Fri' },
            {
                $set: {
                    subs: subList
                }
            }
        )
        .then(() => console.log('Added!'))
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));

  } else {
    console.error(err);
  }
  // client.close();
});