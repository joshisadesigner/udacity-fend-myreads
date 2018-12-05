import React, { Component } from 'react';

class Book extends Component {
    handleSelection = e => {
        this.props.moveToShelf(this.props.book, e.target.value);
    };
    /**
     * @description Render book cover or placeholder cover image
     * @package Object current book in map function
     * @returns html
     */
    checkThumbnail = book => {
        if (!book.imageLinks) {
            return (
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(img/image-placeholder.jpg)`,
                        backgroundSize: 'contain'
                    }}
                >
                    <h5
                        style={{
                            textAlign: 'center',
                            color: 'white'
                        }}
                    >
                        {book.title}
                    </h5>
                </div>
            );
        } else {
            return (
                <img
                    className="book-cover"
                    src={book.imageLinks.thumbnail}
                    alt={book.title}
                    style={{
                        width: 128,
                        height: 193
                    }}
                />
            );
        }
    };
    render() {
        const { book } = this.props;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        {this.checkThumbnail(book)}
                        <div className="book-shelf-changer">
                            <select
                                name={book.title}
                                value={book.shelf ? book.shelf : 'none'}
                                onChange={this.handleSelection}
                            >
                                <option value="move" disabled>
                                    Move to...
                                </option>
                                <option value="currentlyReading">
                                    Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        );
    }
}

export default Book;
