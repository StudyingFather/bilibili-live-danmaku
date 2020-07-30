const Datastore = require('nedb')
const db = new Datastore({ filename: './data/nedb', autoload: true });

db.loadDatabase(function (err) {    // Callback is optional
  console.error(err)
});

export default wrapper(db)

function wrapper(db) {
  return {
    insert: (data) => {
      return new Promise((resolve, reject) => {
        db.insert(data, (err, newDocs) => {
          if (err) reject(err)
          resolve(newDocs)
        })
      })
    },
    find: (query) => {
      return new Promise((resolve, reject) => {
        db.find(query, (err, docs) => {
          if (err) reject(err)
          resolve(docs)
        })
      })
    },
    findOne: (query) => {
      return new Promise((resolve, reject) => {
        db.findOne(query, (err, doc) => {
          if (err) reject(err)
          resolve(doc)
        })
      })
    },
    update: (query, data, options = {}) => {
      return new Promise((resolve, reject) => {
        db.update(query, data, options, (err, doc) => {
          if (err) reject(err)
          resolve(doc)
        })
      })
    },
    remove: (query, options = {}) => {
      return new Promise((resolve, reject) => {
        db.remove(query, options, (err, numRemoved) => {
          if (err) reject(err)
          resolve(numRemoved)
        })
      })
    }
  }
}
