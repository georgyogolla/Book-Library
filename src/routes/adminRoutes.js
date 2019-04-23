const express = require('express');
const debug = require('debug')('app:adminRoutes');
const { MongoClient } = require('mongodb');

const adminRouter = express.Router();

const books = [
  {
    title: 'My Life With a Criminal',
    genre: 'Biography',
    author: 'Milly',
    read: false
  },
  {
    title: 'Gifted Hands',
    genre: 'Biography',
    author: 'Ben Carson',
    read: false
  },
  {
    title: 'My Life in Crime',
    genre: 'Biography',
    author: 'John Kiriamiti',
    read: false
  }];
function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('connected correctly to server');

          const db = client.db(dbName);
          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}
module.exports = router;
