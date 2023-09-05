import { toast } from "react-toastify";

const toastMessage = (type, message) => {
  toast[type](message);
};

export default toastMessage;
