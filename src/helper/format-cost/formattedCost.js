const formattedCost = (price) => {
  try {
    const formatted = new Intl.NumberFormat("en-JM", {
      currency: "JMD",
    }).format(price);
    return "$" + formatted.split(".")[0];
  } catch (error) {
    return price;
  }
};

export default formattedCost;
