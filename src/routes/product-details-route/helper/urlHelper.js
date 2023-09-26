export const getUrl = (selected) => {
  switch (selected) {
    case "make":
      return `/make/get`;
    case "model":
      return `/model/`;
    case "year":
      return `/year/`;
    case "categories":
      return `/categories/`;
  }
};

export const postUrl = (selected) => {
  switch (selected) {
    case "make":
      return `/make/`;
    case "model":
      return `/model/`;
    case "year":
      return `/year/`;
    case "categories":
      return `/categories/`;
  }
};

export const patchUrl = (selected) => {
  switch (selected) {
    case "make":
      return `/make/`;
    case "model":
      return `/model/`;
    case "year":
      return `/year/`;
    case "categories":
      return `/categories/`;
  }
};

export const deleteUrl = (selected) => {
  switch (selected) {
    case "make":
      return `/make/`;
    case "model":
      return `/model/`;
    case "year":
      return `/year/`;
    case "categories":
      return `/categories/`;
  }
};
