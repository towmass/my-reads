import React from "react";
import "./App.css";
import Reading from "./Reading";

// Using a new syntax for React 0.14
const Category = props => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.categoryName}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.currentC.map(book => (
          <Reading
            key={book.id}
            book={book}
            updateCategory={props.updateCategory}
          />
        ))}
      </ol>
    </div>
  </div>
);

export default Category;
