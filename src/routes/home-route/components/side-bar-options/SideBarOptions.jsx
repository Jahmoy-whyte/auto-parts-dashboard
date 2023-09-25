const SideBarOptions = ({ title, icon, onClick, path }) => {
  return (
    <button
      onClick={() => onClick(path)}
      className="flex items-center gap-3 py-3  "
    >
      {icon} <p className="text-left"> {title} </p>
    </button>
  );
};

export default SideBarOptions;
