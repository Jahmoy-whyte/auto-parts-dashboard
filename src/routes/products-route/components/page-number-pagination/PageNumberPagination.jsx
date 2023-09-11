import PageNumbers from "../page-numbers/PageNumbers";
const PageNumberPagination = ({ state, next, prev, getProducts }) => {
  if (state.searchText != "") return null;
  return (
    <div className="flex justify-end my-2">
      <div className="flex text-sm">
        <button onClick={prev} className="border-2 p-2">
          prev
        </button>
        <div className="flex ">
          {state.pageChunk.map((num) => {
            return (
              <PageNumbers
                state={state}
                number={num}
                onClick={getProducts}
                key={num}
              />
            );
          })}
        </div>
        <button onClick={next} className="border-2 p-2 ">
          next
        </button>
      </div>
    </div>
  );
};

export default PageNumberPagination;
