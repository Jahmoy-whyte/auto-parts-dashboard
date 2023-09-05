const SideBarOptions = ({ title, icon, onClick }) => {
  return (
    <button onClick={onClick} className="flex items-center gap-3 py-3  ">
      {icon} <p> {title} </p>
    </button>
  );
};

export default SideBarOptions;
