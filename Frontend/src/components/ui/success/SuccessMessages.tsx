interface SuccessMessagesProps {
  messages: string[];
}

const SuccessMessages: React.FC<SuccessMessagesProps> = ({ messages }) => {
  return (
    <div className="border border-green-300 bg-green-50 p-4 rounded-lg max-w-md mx-auto mt-4 shadow-lg text-center">
      <div className="flex flex-col items-center ">
        <h3 className="text-lg font-semibold text-green-800 mb-2">Éxito</h3>
        <ul className="text-center text-sm text-green-700 space-y-1">
          {messages.map((message, index) => (
            <li key={index} className="flex items-center mr-5">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SuccessMessages;
