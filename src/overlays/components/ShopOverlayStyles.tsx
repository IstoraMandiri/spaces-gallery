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
  flex-direction: row;
  justify-content: center;
  font-family: "Lato", sans-serif;
`;

export const Exit = styled.div`
  width: auto;
  height: auto;
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
  width: auto;
  height: auto;
  position: absolute;
  top: 20%;
  color: white;
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
  position: absolute;
  top: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Sizes = styled.div`
  width: 100%;
  height: auto;
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
  font-size: 1em;
  cursor: pointer;
  transition: border 0.5s ease-out;
  :hover {
    border: 1px solid white;
  }
`;

export const Purchase = styled.div`
  width: min(200px, 90%);
  height: auto;
  text-align: center;
  border-radius: 5px;
  padding: 10px 0 10px 0;
  cursor: pointer;
  background-color: white;
  color: black;
  position: absolute;
  bottom: 15%;
  transition: background-color 0.5s ease-out, color 0.5s ease-out;
  :hover {
    background-color: red;
    color: white;
  }
`;

export const Price = styled.div`
  width: auto;
  height: auto;
  position: absolute;
  //bottom: 19%;
  top: 29%;
  color: white;
  margin: auto;
  font-size: 1.5em;
`;
