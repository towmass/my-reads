import React from "react";
import Category from "./Category";
import Reading from "./Reading";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";
import "./App.css";

// ES6 syntax
class BooksApp extends React.Component {
  state = {
    searchings: [],
    books: []
  };

  // Runs right after a component is put into the tree (DOM)
  componentDidMount() {
    BooksAPI.getAll().then(res => {
      // res and data comes from BooksAPI.js
      this.setState({ data: res });
    });
  }

  //Creating a searching mechanism
  searchReadings(e) {
    // In case of some search input = user is typing into search bar
    if (e.target.value !== "") {
      BooksAPI.search(e.target.value).then(output => {
        // Look for demanded value via BooksAPI
        if (output.error) {
          // In case of no match, clean the search
          this.setState({ searchings: [] });
        } else if (output) {
          // In case of success, proceed
          output.map(item => {
            if (item.shelf === undefined) {
              item.shelf = "none";
            }
            if (item.imageLinks === undefined) {
              item.imageLinks =
                "url(https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Book_question2.svg/128px-Book_question2.svg.png)";
            }
            this.state.books.forEach(book => {
              if (book.id === item.id) {
                item.shelf = book.shelf;
              }
            });
            return "";
          });
          this.setState({ searchings: output }); // Set the final state of search
        }
      });
      // In case of no search input = search bar is empty
    } else if (e.target.value === "") {
      this.setState({ searchings: [] });
    }
  }

  // Update the list of readings
  newDetails(bookID, event) {
    let testtest = BooksAPI.update(bookID, event.target.value);
    testtest.then(
      BooksAPI.getAll().then(books => {
        this.setState({ books: books });
      })
    );
  }

  // Render must be included in ES6 syntax (not in the new one React 0.14)
  render() {
    // General variables defined
    let allReadings = this.state.books;
    let searchReadings = this.state.searchings;
    // Categorizing readings into three groups
    let currentlyReadingReadings = allReadings.filter(book => {
      return book.shelf === "currentlyReading";
    });
    let wantToReadReadings = allReadings.filter(book => {
      return book.shelf === "wantToRead";
    });
    let readReadings = allReadings.filter(book => {
      return book.shelf === "read";
    });
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            // Usage of react-router-dom
            <div className="list-books">
              <div className="list-books-title">
                <h1>My Wisdom Database</h1>
              </div>
              <div className="list-books-content" />
              <div className="open-search">
                <Link to="/search">Add a new piece!</Link>
              </div>
              <Category
                categoryName="Currently Reading"
                currentC={currentlyReadingReadings}
                updateCategory={this.newDetails.bind(this)}
              />
              <Category
                categoryName="Want To Read"
                currentC={wantToReadReadings}
                updateCategory={this.newDetails.bind(this)}
              />
              <Category
                categoryName="Read"
                currentC={readReadings}
                updateCategory={this.newDetails.bind(this)}
              />
            </div>
          )}
        />

        <Route
          path="/search"
          render={() => (
            // Usage of react-router-dom
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search">
                  Close
                </Link>
                <div className="search-books-input-wrapper">
                  <input
                    onChange={e => this.searchReadings(e)}
                    className="search-bar"
                    type="text"
                    placeholder="Search by title or author..."
                  />

                  {
                    <ol className="books-grid">
                      {searchReadings.map(book => (
                        <Reading
                          key={book.id}
                          book={book}
                          updateCategory={this.newDetails.bind(this)}
                        />
                      ))}
                    </ol>
                  }
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid" />
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
