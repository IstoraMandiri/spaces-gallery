import styled from "@emotion/styled";

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  display: flex;
  font-family: "Lato", sans-serif;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Exit = styled.div`
  color: white;
  cursor: pointer;
  position: absolute;
  top: 25px;
  left: 25px;
  :hover {
    text-decoration: white underline;
  }
`;

export const ProductDesc = styled.div`
  color: white;
  text-align: center;

  & > h2 {
    margin-bottom: 10px;
  }

  & > h4 {
    margin-top: 0;
  }
`;

export const ProductImage = styled.div`
  width: 100%;
  height: 90%;
  border-radius: 5%;
  background-image: url("https://spaces-gallery-assets.s3-us-west-1.amazonaws.com/images/shirtPhoto.png");
  background-size: cover;
  background-position: center -90px;
  background-repeat: no-repeat;
`;

export const ProductContent = styled.div`
  width: min(90%, 300px);
  border-radius: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Sizes = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
`;

export const SingleSize = styled.button`
  border: 1px solid black;
  margin: 20px 0 20px 0;
  outline: none;
  border-radius: 50%;
  height: 48px;
  width: 48px;
  text-align: center;
  font-size: 0.7em;
  cursor: pointer;
  transition: border 0.5s ease-out;
  :hover {
    border: 1px solid white;
  }
`;

export const Purchase = styled.div`
  width: min(200px, 90%);
  text-align: center;
  border-radius: 5px;
  padding: 10px 0 10px 0;
  cursor: pointer;
  background-color: white;
  color: black;
  transition: background-color 0.5s ease-out, color 0.5s ease-out;
  :hover {
    background-color: red;
    color: white;
  }
`;

export const Price = styled.h2`
  color: white;
  font-size: 1.25em;
  margin: 5px 0;
`;
