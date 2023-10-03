const SideMenuOptions = ({ title, icon, onClick, path }) => {
  //   const windowWidth = window.innerWidth;
  //   if (windowWidth < 650) {
  //     alert("Wd");
  //   }
  // }
  return (
    <button
      onClick={() => {
        onClick(path);
      }}
      className="flex items-center gap-3 py-3  "
    >
      {icon} <p className="text-left"> {title} </p>
    </button>
  );
};

export default SideMenuOptions;
