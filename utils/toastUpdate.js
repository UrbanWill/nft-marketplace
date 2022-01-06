import { toast } from "react-toastify";

/**
 * funtion to update toast
 * @param {toastId} string self-descriptive
 * @param {type} string one of: "info", "success", "warning", "error", "default"
 * @param {message} string self-descriptive
 * @param {isLoading} bool self-descriptive
 * @returns {function} updated toast
 */
const toastUpdate = (toastId, type, message, isLoading) =>
  toast.update(toastId, {
    render: () => message,
    type,
    autoClose: 3000,
    isLoading,
  });

export default toastUpdate;
