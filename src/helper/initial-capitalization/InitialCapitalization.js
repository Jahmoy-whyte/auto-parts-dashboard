const InitialCapitalization = (string = "") => {
  return string.substring(0, 1).toUpperCase() + "" + string.substring(1);
};
export default InitialCapitalization;
