import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="text-main flex border-4 h-screen border-black justify-center items-center rounded-md bg-slate-500">
        <h1>hello there tailwind</h1>
      </div>
    </>
  );
}

export default App;
