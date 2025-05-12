// app/auth/layout.jsx
import { Toaster } from "react-hot-toast";

export default function AuthLayout({ children }) {

  return (
    <div className="min-h-screen flex items-center justify-center bg-bground dark:bg-bgroundDark transition duration-500 ease-in-out">        {children}
        <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
