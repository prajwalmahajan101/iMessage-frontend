import toast from "react-hot-toast";

const myToast = (type: "success" | "error") => (message: string) => {
  toast(message, {
    icon: type === "success" ? "✅" : "❌",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: type === "success" ? "#018041" : "#c70000",
    },
  });
};

export const toastSuccess = myToast("success");
export const toastError = myToast("error");
