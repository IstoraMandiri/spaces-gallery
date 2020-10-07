import React from "react";
import Hills from "./Hills";

const HillRange = () => {
  return (
    <>
      <Hills angle={Math.PI / 6.32} dimensions={[200, 50]} dist={100} />
      <Hills
        angle={-Math.PI / 4.641}
        dimensions={[300, 90]}
        dist={175}
        tall={20}
      />
      <Hills angle={Math.PI} dimensions={[300, 90]} dist={175} />
      <Hills
        angle={(Math.PI * Math.PI) / 4}
        dimensions={[500, 90]}
        dist={250}
        tall={30}
      />
      <Hills
        angle={Math.PI + Math.PI / 4}
        dimensions={[500, 90]}
        dist={340}
        tall={40}
      />
    </>
  );
};

export default HillRange;
