const ProductTable = ({ product, nav }) => {
  return (
    <div className="flex flex-col p-5 overflow-hidden  bg-white lg:w-[400px]  ">
      <h2 className="text-lg font-bold mb-5">
        Out Of Stock ({product.length})
      </h2>

      <div className="flex flex-col gap-2">
        {product.map((data) => {
          return (
            <button
              key={data.id}
              className="flex border-b-2  gap-2 py-2"
              onClick={() => nav(`/home/products/${data.id}`)}
            >
              <img
                src={data.image}
                className="rounded-md p-2 w-16 h-auto bg-gray-100"
              />

              <div className="flex flex-1 text-sm  items-center gap-3 ">
                <p className="hidden md:block"> #{data.id} </p>
                <p> {data.productName} </p>
                <p className="text-red-500 text-center text-sm border-red-200 border-[1px] rounded-md p-1">
                  {data.status}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductTable;
