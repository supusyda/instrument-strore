import React from "react";

const Pagination = ({ pagination, onPageChange, totalRow }) => {
  const handlePageChange = (newpage) => {
    if (onPageChange) {
      onPageChange(newpage);
    }
  };
  // React.useEffect({

  // })

  const { onPage, currentPage } = pagination;
  let paginationNumber = Math.ceil(totalRow / onPage);
  return (
    <nav>
      <ul className="pagination justify-content-center">
        {[...Array(paginationNumber)].map((x, i) => (
          <li className={`page-item`}>
            <button
              className={
                currentPage == i + 1 ? "page-link active" : "page-link "
              }
              onClick={() => {
                handlePageChange(i + 1);
              }}
            >
              {i + 1}
            </button>
          </li>
        ))}

        {/* <li className={`page-item`}>
          <NavLink
            to={"#"}
            className={({ isActive }) =>
              isActive ? "page-link active" : "page-link"
            }
          >
            2
          </NavLink>
        </li>
        <li className={`page-item`}>
          <NavLink
            to={"#"}
            className={({ isActive }) =>
              isActive ? "page-link active" : "page-link"
            }
          >
            3
          </NavLink>
        </li>
        <li className={`page-item`}>
          <NavLink
            to={"#"}
            className={({ isActive }) =>
              isActive ? "page-link active" : "page-link"
            }
          >
            4
          </NavLink>
        </li>
        <li className={`page-item`}>
          <NavLink
            to={"#"}
            className={({ isActive }) =>
              isActive ? "page-link active" : "page-link"
            }
          >
            5
          </NavLink>
        </li> */}
      </ul>
    </nav>
  );
};

export default Pagination;
