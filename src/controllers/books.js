import { getAllBooks, 
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getAuthorById
} from "../model/books.js";

const getBooksHandler = async (req, res) => {  
    try {
        const books = await getAllBooks();
        return res.status(200).json(books);
    } catch (error) {
        console.error('GET /books failed:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getBookByIdHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const book = await getBookById(requestedId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('GET /books/:id failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const createBookHandler = async (req, res) => {

  try {

    const { id, authorId, title, publicationDate } = req.body;

    if (!id || !authorId || !title || !publicationDate) {
      return res.status(400).json({
        message: 'Missing required fields'
      });
    }

    const existingBook = await getBookById(id);

    if (existingBook) {
      return res.status(400).json({
        message: 'Book id already exists'
      });
    }

    const author = await getAuthorById(authorId);

    if (!author) {
      return res.status(400).json({
        message: 'Author does not exist'
      });
    }

    const book = {
      id,
      authorId,
      title,
      publicationDate
    };

    await createBook(book);

    return res.status(201).json(book);

  } catch (error) {

    console.error('POST /books failed:', error.message);

    return res.status(500).json({
      message: 'Internal Server Error'
    });

  }

};

const updateBookHandler = async (req, res) => {

  try {

    const { id } = req.params;
    const { authorId, title, publicationDate } = req.body;

    if (!authorId || !title || !publicationDate) {
      return res.status(400).json({
        message: 'Missing required fields'
      });
    }

    const existingBook = await getBookById(id);

    if (!existingBook) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    const author = await getAuthorById(authorId);

    if (!author) {
      return res.status(400).json({
        message: 'Author does not exist'
      });
    }

    const book = {
      authorId,
      title,
      publicationDate
    };

    await updateBook(id, book);

    return res.status(200).json({
      id,
      ...book
    });

  } catch (error) {

    console.error('PUT /books/:id failed:', error.message);

    return res.status(500).json({
      message: 'Internal Server Error'
    });

  }

};

const deleteBookHandler = async (req, res) => {

  try {

    const { id } = req.params;

    const existingBook = await getBookById(id);

    if (!existingBook) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    await deleteBook(id);

    return res.status(204).send();

  } catch (error) {

    console.error('DELETE /books/:id failed:', error.message);

    return res.status(500).json({
      message: 'Internal Server Error'
    });

  }

};

export { getBooksHandler, getBookByIdHandler, createBookHandler, updateBookHandler, deleteBookHandler };