import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
// import escapeRegExp from 'escape-string-regexp';
// import sortBy from 'sort-by';

class SearchBooks extends Component {
    state = {
        query: '',
        booksFound: []
    };
    /**
     * @description change state based on a query
     * @param String input value
     * @returns Object state
     */
    searchBooks = query => {
        if (query === '') {
            this.setState({ query: '', booksFound: [] });
        } else {
            BooksAPI.search(query).then(booksFound => {
                if (booksFound.error) {
                    booksFound = [];
                }
                this.setState({
                    booksFound
                });
            });
            this.setState({ query: query });
        }
    };
    render() {
        const { booksFound } = this.state;
        const { books } = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
                    </Link>

                    <div className="search-books-input-wrapper">
                        {/*
      NOTES: The search from BooksAPI is limited to a particular set of search terms.
      You can find these search terms here:
      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
      you don't find a specific author or title. Every search is limited by search terms.
    */}
                        <DebounceInput
                            minLength={2}
                            debounceTimeout={500}
                            placeholder="Search by title or author"
                            onChange={e => this.searchBooks(e.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {booksFound.map(bookResult => {
                            let bookOnShelf = books.find(
                                book => book.id === bookResult.id
                            );

                            return (
                                <Book
                                    book={
                                        bookOnShelf ? bookOnShelf : bookResult
                                    }
                                    key={bookResult.id}
                                    moveToShelf={this.props.moveToShelf}
                                />
                            );
                        })}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchBooks;
