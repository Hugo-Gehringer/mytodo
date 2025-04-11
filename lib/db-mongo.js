const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

function DB() {
  const DB_NAME = 'todos';
  const COLLECTION_NAME = 'todos';
  const self = this;
  let db;

  const mongoUrl = 'mongodb://mytodo-gehringerhugo-1816:HCKGe3aFWqXxq2DVbJKneOjFZOzeasA_Y5gC1oEun4UWOoV1uxclkQdevEehvgOI@0dc1fb73-62b1-4b43-b344-ea7a8573f04b.mytodo-gehringerhugo-1816.mongo.b.osc-fr1.scalingo-dbs.com:32719/mytodo-gehringerhugo-1816?ssl=true&replicaSet=mytodo-gehringerhugo-1816-rs0';

  self.type = function() {
    return 'Databases for MongoDB';
  };

  self.init = () => {
    return new Promise((resolve, reject) => {
      const options = {
        ssl: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

      MongoClient.connect(mongoUrl, options, (err, mongoDb) => {
        if (err) {
          reject(err);
          console.error(err);
        } else {
          db = mongoDb.db(DB_NAME).collection(COLLECTION_NAME);
          resolve();
        }
      });
    });
  };

  self.count = () => {
    return new Promise((resolve, reject) => {
      db.count((err, count) => {
        if (err) {
          reject(err);
        } else {
          resolve(count);
        }
      });
    });
  };

  self.search = () => {
    return new Promise((resolve, reject) => {
      db.find().toArray((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.map(todo => {
            todo.id = todo._id;
            delete todo._id;
            return todo;
          }));
        }
      });
    });
  };

  self.create = (item) => {
    return new Promise((resolve, reject) => {
      db.insertOne(item, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const newItem = {
            id: result.ops[0]._id,
            title: item.title,
            completed: item.completed,
            order: item.order
          };
          resolve(newItem);
        }
      });
    });
  };

  self.read = (id) => {
    return new Promise((resolve, reject) => {
      db.findOne({ _id: new mongodb.ObjectID(id) }, (err, item) => {
        if (err) {
          reject(err);
        } else {
          item.id = item._id;
          delete item._id;
          resolve(item);
        }
      });
    });
  };

  self.update = (id, newValue) => {
    return new Promise((resolve, reject) => {
      delete newValue.id;
      db.findAndModify({ _id: new mongodb.ObjectID(id) }, [], newValue, { upsert: true }, (err, updatedItem) => {
        if (err) {
          reject(err);
        } else {
          newValue.id = id;
          delete newValue._id;
          resolve(newValue);
        }
      });
    });
  };

  self.delete = (id) => {
    return new Promise((resolve, reject) => {
      db.deleteOne({ _id: new mongodb.ObjectID(id) }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: id });
        }
      });
    });
  };
}

module.exports = function() {
  return new DB();
};