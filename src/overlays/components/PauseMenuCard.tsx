import React from "react";
import styled from "@emotion/styled";
import { isMobile } from "react-device-detect";

type CardProps = {
  text?: string;
  title?: string;
  imgSrc?: string;
};

const Card = styled.div`
  min-width: 35%;
  min-height: 45%;
  margin: 2% 2.5% 0 2.5%;
  background-color: white;
  border-radius: 3%;
  box-shadow: 5px 10px rgba(0, 0, 0, 0.5);
`;

const Text = styled.text`
  font-size: 1rem;
`;

const Image = styled.div`
  width: 45%;
  height: 45%;
`;

const PauseMenuCard = (props: CardProps) => {
  const { text, title, imgSrc } = props;
  return (
    <Card>
      <Image>
        <img src={imgSrc} />
      </Image>
      <Text>{text}</Text>
    </Card>
  );
};

export default PauseMenuCard;
