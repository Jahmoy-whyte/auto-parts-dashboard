const SideMenuOptions = ({ title, icon, onClick, path, close }) => {
  //console.log("======================================dwdwd");

  return (
    <button
      className="flex items-center gap-3 py-3 px-4 mx-1 transition-all rounded-md hover:bg-blue-400 "
      onClick={() => {
        //const windowWidth = window.innerWidth;
        onClick(path);

        // if (windowWidth < 650) close();
      }}
    >
      {icon} <p className="text-left"> {title} </p>
    </button>
  );
};

export default SideMenuOptions;
