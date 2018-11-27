import React, { Component } from 'react';
import Book from './Book';

class Shelf extends Component {
    render() {
        const { books } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(book => (
                            <Book book={book} key={book.id} />
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Shelf;
