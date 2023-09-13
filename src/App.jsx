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
/*


product_id 	
product_name	
make_id	
model_id	
year_id	

image
description
	
price	
condition_of_part
new_arrival	
subcategory_id		
status	


	


*/
