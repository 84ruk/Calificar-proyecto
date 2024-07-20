'use client'
import { useAuthMessageStore } from "@/store/auth/autMessage-store";

const AuthMessage = () => {
  const { showMessage, message } = useAuthMessageStore();

  if (!showMessage) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded shadow-lg z-50">
      {message}
    </div>
  );
};

export default AuthMessage;
