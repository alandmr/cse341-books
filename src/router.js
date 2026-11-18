import express from 'express';
import { getBooksHandler, getBookByIdHandler } from './controllers/books.js';

const router = express.Router();

/**
 * @openapi
 * /books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get all books     
 *     responses:
 *       200:
 *         description: List of books retrieved successfully.
 *       500:
 *         description: Internal server error.
 */
router.get('/books', getBooksHandler);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the book.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book retrieved successfully.
 *       400:
 *         description: Invalid book ID supplied.
 *       404:
 *         description: Book not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/books/:id', getBookByIdHandler);


export default router;