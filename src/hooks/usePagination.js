import { useCallback, useState } from "react";
const usePagination = () => {
  const [pageData, setPageData] = useState({
    pages: [],
    totalPages: 0,
    currentPage: 0,
    totalPagesInArrayFormat: [],
    currentChunk: 1,
    totalChunks: 0,
    numberOfRowsPerPage: 0,
    numberOfPagesPerChunk: 0,
  });

  const calulatePages = (
    totalRows,
    numberOfRowsPerPage,
    numberOfPagesPerChunk = 4
  ) => {
    const totalPages = Math.ceil(totalRows / numberOfRowsPerPage);
    const totalChunks = Math.ceil(totalPages / numberOfPagesPerChunk);
    const totalPagesInArrayFormat = [...Array(totalPages).keys()];

    setPageData((prev) => ({
      ...prev,
      totalPages: totalPages,
      totalChunks: totalChunks,
      pages: totalPagesInArrayFormat.slice(0, numberOfPagesPerChunk),
      totalPagesInArrayFormat: totalPagesInArrayFormat,
      numberOfRowsPerPage: numberOfRowsPerPage,
      numberOfPagesPerChunk: numberOfPagesPerChunk,
    }));
  };

  const next = useCallback(() => {
    if (pageData.currentChunk == pageData.totalChunks) return;
    const numberOfPagesPerChunk = pageData.numberOfPagesPerChunk;
    const totalPagesInArrayFormat = [...pageData.totalPagesInArrayFormat];
    const start = pageData.pages.at(0) + numberOfPagesPerChunk;

    const end = start + numberOfPagesPerChunk;

    setPageData((prev) => ({
      ...prev,
      pages: totalPagesInArrayFormat.slice(start, end),
      currentChunk: pageData.currentChunk + 1,
    }));
  }, [pageData]);

  const prev = useCallback(() => {
    if (pageData.currentChunk == 1) return;
    const numberOfPagesPerChunk = pageData.numberOfPagesPerChunk;
    const totalPagesInArrayFormat = [...pageData.totalPagesInArrayFormat];
    const start = pageData.pages.at(0) - numberOfPagesPerChunk;
    const end = start + numberOfPagesPerChunk;

    setPageData((prev) => ({
      ...prev,
      pages: totalPagesInArrayFormat.slice(start, end),
      currentChunk: pageData.currentChunk - 1,
    }));
  }, [pageData]);

  const setCurrentPage = (currentPage) => {
    setPageData((prev) => ({
      ...prev,
      currentPage: currentPage,
    }));
  };

  return {
    pages: pageData.pages,
    calulatePages,
    next,
    prev,
    setCurrentPage,
    currentPage: pageData.currentPage,
  };
};

export default usePagination;
