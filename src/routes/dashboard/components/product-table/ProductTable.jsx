import formattedCost from "../../../../helper/format-cost/formattedCost";

const ProductTable = ({ product }) => {
  return (
    <div className="flex flex-col bg-white p-5 overflow-hidden  lg:w-[500px]  ">
      <h2 className="text-lg font-bold mb-5">
        Out Of Stock ({product.length})
      </h2>

      <div className="flex flex-col gap-2">
        {product.map((data) => {
          return (
            <div className="flex border-b-2  gap-2 p-2">
              <img
                src={data.image}
                className="rounded-md p-2 w-16 h-auto bg-gray-100"
              />

              <div className="flex flex-1 text-sm  items-center gap-3 ">
                <p className="hidden md:block"> #{data.id} </p>
                <p> {data.productName} </p>
                <p className="text-red-500 text-center text-sm bg-red-200 rounded-md p-1">
                  {data.status}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductTable;
