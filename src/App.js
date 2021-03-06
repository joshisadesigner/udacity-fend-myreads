import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBooks from './SearchBooks';
import Shelf from './BooksShelf';
import NotFound from './404';

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        books: [],
        shelfs: []
    };
    /**
     * @description function to reuse to get data from server
     * @param none
     * @returns Array of objects - books and shelfs
     */
    getBooksData() {
        BooksAPI.getAll().then(books => {
            this.setState({
                books,
                shelfs: this.existingShelfs(books)
            });
        });
    }
    componentDidMount() {
        this.getBooksData();
    }
    /**
     * @description Create array for existing shelft defined in shelf key of the books
     * @param Array books array
     * @returns Array, existing shelfs
     */
    existingShelfs = books => {
        let shelfsArr = books.map(book => book.shelf);
        let shelfs = new Set(shelfsArr);
        return [...shelfs];
    };
    /**
     * @description Change book shelf value
     * @param Object name of the book to change
     * @param String name of the shelf where the book will be moved
     * @returns Array - List of all books with changed shelfs
     */
    moveToShelf = (book, newShelf) => {
        BooksAPI.update(book, newShelf).then(() => {
            this.getBooksData();
        });
    };
    render() {
        return (
            <div className="app">
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <div className="list-books">
                                <div className="list-books-title">
                                    <h1>MyReads</h1>
                                </div>
                                <div className="list-books-content">
                                    <Shelf
                                        books={this.state.books}
                                        shelfs={this.state.shelfs}
                                        moveToShelf={this.moveToShelf}
                                    />
                                </div>
                                <div className="open-search">
                                    <Link to="/search">
                                        <button>Add a book</button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    />
                    <Route
                        path="/search"
                        render={() => (
                            <SearchBooks
                                books={this.state.books}
                                moveToShelf={this.moveToShelf}
                            />
                        )}
                    />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export default BooksApp;
