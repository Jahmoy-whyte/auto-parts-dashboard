import { useEffect, useState } from "react";

const useDebounce = (value = "", delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    if (value == "") return;
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
