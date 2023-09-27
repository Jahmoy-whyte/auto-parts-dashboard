import { AiOutlineClose } from "react-icons/ai";
const Model = ({ show = false, title, subtext, children, close }) => {
  if (!show) return null;
  return (
    <>
      <div className="fixed bg-white opacity-50 top-0 left-0 bottom-0 right-0 blur-sm"></div>
      <div
        onClick={close}
        className="flex justify-center items-center fixed  top-0 left-0 bottom-0 right-0 "
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col max-w-md flex-1 bg-white border-2 p-5 rounded-md text-sm gap-2"
        >
          <div>
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-lg">{title}</h1>
              <AiOutlineClose onClick={close} />
            </div>

            <p className="text-gray-700">{subtext}</p>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Model;
