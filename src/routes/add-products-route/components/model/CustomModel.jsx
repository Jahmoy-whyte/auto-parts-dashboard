import { AiOutlineClose } from "react-icons/ai";
const CustomModel = ({ data = [], onClick, isOpen, setIsOpen }) => {
  return (
    <>
      {isOpen ? (
        <div
          onClick={() => setIsOpen(false)}
          className="bg-slate-700 bg-opacity-10 z-10 h-full w-full absolute top-0 flex justify-center items-center overflow-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white max-w-sm flex-1 h-56 rounded-md p-5"
          >
            <div className="flex justify-between">
              <h1>Home</h1>
              <AiOutlineClose onClick={() => setIsOpen(false)} />
            </div>

            {data.map(() => {
              return (
                <div>
                  <p>dwdw</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CustomModel;
