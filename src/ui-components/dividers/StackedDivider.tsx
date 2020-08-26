import React from "react";
import { styled } from "twin.macro";

const ThinLineContainer = styled.div`
  height: 14.4px;
  width: 8px;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  display: flex;
`;
const ThinLineView = styled.div`
  background-color: white;
  width: 1.5px;
  height: 6px;
  display: flex;
`;

const areEqual = () => {
  return true;
};

const StackedDivider = () => {
  return (
    <ThinLineContainer>
      <ThinLineView />
      <ThinLineView />
    </ThinLineContainer>
  );
};

export default React.memo(StackedDivider, areEqual);
