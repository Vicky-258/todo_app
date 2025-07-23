import toast from "react-hot-toast";

const friendlyErrorMap = {
  "current_password: Incorrect current password.":
    "Hold up! Your current password is incorrect.",
  "email: user with this email already exists.":
    "📧 This email is already taken. Try another one!",
  "username: A user with that username already exists.":
    "🧑‍🚀 That username’s taken. Got another cool alias?",
};

export const handleApiError = (
  error,
  defaultMessage = "Something went wrong"
) => {
  const status = error?.response?.status;
  const data = error?.response?.data;

  console.log(status);

  if (status === 400 || status === 403) {
    let rawMessage = "";

    if (typeof data === "string") {
      rawMessage = data;
    } else if (typeof data === "object") {
      rawMessage = Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");
    }
    console.log(rawMessage);
    console.log(friendlyErrorMap[rawMessage.trim()])
    const friendlyMessage =
      friendlyErrorMap[rawMessage.trim()] || defaultMessage;
    toast.error(friendlyMessage);
  }
  
  else if (status >= 500) {
    toast.error("💥 Server is throwing a tantrum. Try again soon!");
  } else {
    toast.error(defaultMessage);
  }
};
