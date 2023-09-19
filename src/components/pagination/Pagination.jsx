import { useEffect, useState } from "react";

const Pagination = ({ totalPages = 50, numberOfPagePerChunck = 4 }) => {
  const [pageData, setPageData] = useState({
    pages: [],
    numberOfChunks: 0,
    totalPagesArray: [],
    currentChunck: 0,
    currentPage: 0,
  });

  console.log(pageData);
  useEffect(() => {
    get();
  }, []);

  const get = () => {
    const numberOfChunks = Math.ceil(totalPages / numberOfPagePerChunck);
    const totalPagesToArray = [...Array(totalPages).keys()];
    setPageData((prev) => ({
      ...prev,
      numberOfChunks: numberOfChunks,
      pages: totalPagesToArray.slice(0, numberOfPagePerChunck),
      totalPagesArray: totalPagesToArray,
    }));
  };

  const next = () => {
    const totalPagesArray = [...pageData.totalPagesArray];
    const start = pageData.currentChunck + numberOfPagePerChunck;
    const end = start + numberOfPagePerChunck;

    setPageData((prev) => ({
      ...prev,
      pages: totalPagesArray.slice(start, end),
      currentChunck: start,
    }));
  };

  const prev = () => {
    const totalPagesArray = [...pageData.totalPagesArray];
    const start = pageData.currentChunck - numberOfPagePerChunck;
    const end = start + numberOfPagePerChunck;

    setPageData((prev) => ({
      ...prev,
      pages: totalPagesArray.slice(start, end),
      currentChunck: start,
    }));
  };

  return (
    <div>
      <button onClick={prev}>prev</button>
      {pageData.pages.map((data, index) => (
        <button
          onClick={() => {
            setPageData((prev) => ({
              ...prev,
              currentPage: data,
            }));
          }}
        >
          {data}
        </button>
      ))}
      <button onClick={next}>next</button>
    </div>
  );
};

export default Pagination;
