import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class NotFound extends React.Component {
    state = {
        containerStyles: {
            padding: '20px',
            textAlign: 'center'
        },
        imageStyle: {
            width: '230px',
            margin: 'auto',
            background: 'tansparent',
            boxShadow: 'none'
        },
        buttonStyle: {
            width: '80px',
            padding: '8px 16px',
            margin: '5px',
            background: '#2e7c31',
            textDecoration: 'none',
            color: '#ffffff',
            borderRadius: '3px'
        }
    };
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div
                    className="list-books-content"
                    style={this.state.containerStyles}
                >
                    <img
                        src="img/not-found.svg"
                        alt="page not found"
                        style={this.state.imageStyle}
                    />
                </div>
                <div
                    className="list-books-content"
                    style={this.state.containerStyles}
                >
                    <Link to="/" style={this.state.buttonStyle}>
                        Home
                    </Link>
                    <Link to="/search" style={this.state.buttonStyle}>
                        Search
                    </Link>
                </div>
            </div>
        );
    }
}

export default NotFound;
