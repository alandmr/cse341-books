import { getDb } from "../db/connect.js";

const getAllBooks = async () => {
  const db = getDb();
  const books = await db.collection('books').find({}).toArray();
  return books;
};

const getBookById = async (bookId) => {
  const db = getDb();
  const collection = db.collection('books');
  const book = await collection.findOne({ id: bookId });
  return book;
};


const createBook = async (book) => {

  const db = getDb();
  const result = await db.collection('books').insertOne(book);
  return result;

};

const updateBook = async (id, book) => {

  const db = getDb();
  const result = await db.collection('books').updateOne(
    { id: id },
    { $set: book }
  );
  return result;
};

const deleteBook = async (id) => {

  const db = getDb();
  const result = await db.collection('books').deleteOne({ id: id });
  return result;

};

const getAuthorById = async (id) => {

  const db = getDb();
  const author = await db.collection('authors').findOne({ id });
  return author;

};


export { getAllBooks, getBookById, createBook, updateBook, deleteBook, getAuthorById };