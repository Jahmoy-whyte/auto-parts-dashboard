const EmailType = ({ setTextBox, isLoading }) => {
  const emailTypes = [
    { id: 1, text: "@gmail.com" },
    { id: 2, text: "@yahoo.com" },
  ];
  return (
    <div className="flex  gap-2 text-sm overflow-x-auto">
      {emailTypes.map((data) => (
        <p
          key={data.id}
          className="border-[1px] bg-slate-100  px-2 rounded-lg cursor-pointer active:scale-95"
          onClick={() => {
            if (isLoading) return;
            setTextBox((prev) => ({
              ...prev,
              email: prev.email + data.text,
            }));
          }}
        >
          {data.text}
        </p>
      ))}
    </div>
  );
};

export default EmailType;
