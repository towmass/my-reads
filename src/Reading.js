import React from "react";
import "./App.css";

// Using a new syntax for React 0.14
const Reading = props => (
  <li className="book-list-item" key={props.book.id}>
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${props.book.imageLinks.thumbnail})`
          }}
        />
        <div className="book-shelf-changer">
          <select
            value={props.book.shelf}
            id="select-shelf"
            onChange={e => {
              props.updateCategory(props.book, e);
            }}
          >
            <option disabled>Move to category:</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors}</div>
    </div>
  </li>
);

export default Reading;
