interface ErrorMessagesProps {
  messages: string[];
}

const ErrorMessages: React.FC<ErrorMessagesProps> = ({ messages }) => {
  return (
    <div className="border border-red-300 bg-red-50 p-4 rounded-lg max-w-md mx-auto mt-4 text-center">
      {/* {console.log(messages)} */}
      <h3 className="text-lg font-medium text-red-800">Error</h3>
      <ul className="text-sm text-red-700">
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorMessages;
