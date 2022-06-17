import React from "react";
import "./pagination.scss";

export const Pagination = ({ postsPerPage, totalPosts, paginate, posts }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination--container">
      {pageNumbers.map((number) => (
        <div
          className="pagination--item"
          key={number}
          number={number}
          onClick={() => paginate(number)}
        >
          <div
            className="pagination--button"
            type="button"
            // onClick={() => paginate(number)}
            href="!#"
          >
            {number}
          </div>
        </div>
      ))}
    </div>
  );
};
