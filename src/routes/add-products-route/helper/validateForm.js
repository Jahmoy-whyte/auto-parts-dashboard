const validateForm = (state) => {
  let valid = true;
  let message = "";

  if (state.name == "") {
    message = "Enter product name";
    valid = false;
  } else if (state.make.value == "") {
    message = "Select make";
    valid = false;
  } else if (state.model.value == "") {
    message = "Select model";
    valid = false;
  } else if (state.year.value == "") {
    message = "Select year";
    valid = false;
    //top
  } else if (state.price == "") {
    message = "Enter price";
    valid = false;
  } else if (state.condition.value == "") {
    message = "Select condition";
    valid = false;
  } else if (state.newArrival.value == "") {
    message = "Select new arrival";
    valid = false;
  } else if (state.subCategory.value == "") {
    message = "Select a category";
    valid = false;
  } else if (state.status.value == "") {
    message = "Select status";
    valid = false;
    //bottom
  } else if (!state.image) {
    message = "Select image";
    valid = false;
  }

  return { valid, message };
};

export default validateForm;
