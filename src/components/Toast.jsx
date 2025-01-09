import toast from "react-hot-toast";

export const notify = (message, type = "success") => {
  const options = {
    position: "fixed", 
    duration: 2000,
    containerClassName: "toast-container", 
  };

  if (type === "success") {
    toast.success(message, options);
  } else if (type === "error") {
    toast.error(message, options);
  } else {
    toast(message, options);
  }
};


