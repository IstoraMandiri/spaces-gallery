import { useEffect, useState } from "react";

const INVALID_KEYWORDS = ["FBAN", "FBAV", "Instagram"];

export const useValidAgent = () => {
  const [valid, setValid] = useState(true);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || "";
    const valid = INVALID_KEYWORDS.filter((val) => ua.includes(val));
    setValid(valid.length === 0);
  }, []);

  return valid;
};
