import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

const INVALID_KEYWORDS = ["FBAN", "FBAV", "Instagram"];

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InvalidBrowser = () => {
  const [valid, setValid] = useState(true);
  const loc = useRef<string>();

  function isValidApp() {
    const ua = navigator.userAgent || navigator.vendor || "";
    const valid = INVALID_KEYWORDS.filter((val) => ua.includes(val));
    return valid.length === 0;
  }

  useEffect(() => {
    loc.current = window.location.href;
    setValid(isValidApp());
  }, []);

  if (valid) {
    return null;
  }

  return (
    <Container>
      invalid browser dumbass
      <button onClick={() => window.open(loc.current, "_system")}>
        proceed to correct browser
      </button>
    </Container>
  );
};

export default InvalidBrowser;
