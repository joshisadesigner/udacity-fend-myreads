import React, { Component } from 'react';
import Book from './Book';

class Shelf extends Component {
    /**
     * @description: Make human readable shelf name
     * @param: String - shelf name 'currentlyReading'
     * @returns: String - 'Currently Reading'
     */
    readableName = string => {
        switch (string) {
            case 'currentlyReading':
                return 'Currently Reading';
            case 'wantToRead':
                return 'Want To Read';
            case 'read':
                return 'Read';
            default:
                return 'None';
        }
    };
    render() {
        const { books, shelfs } = this.props;
        return (
            <div>
                {shelfs.map(shelf => (
                    <div className="bookshelf" key={shelf}>
                        <h2 className="bookshelf-title">
                            {this.readableName(shelf)}
                        </h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books
                                    .filter(book => book.shelf === shelf)
                                    .map(book => (
                                        <Book
                                            book={book}
                                            key={book.id}
                                            moveToShelf={this.props.moveToShelf}
                                        />
                                    ))}
                            </ol>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Shelf;
