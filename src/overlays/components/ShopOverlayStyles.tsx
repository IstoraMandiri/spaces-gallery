import styled from "@emotion/styled";

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  display: flex;
  font-family: "Lomino", sans-serif;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
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

  & > h3 {
    margin: 0;
  }

  & > h5 {
    color: #acacac;
    margin-bottom: 0.5rem;
    margin-top: 0;
  }

  & > p {
    margin: 0;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  border-radius: 5%;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 0 25px;
  box-sizing: border-box;
`;

export const Sizes = styled.div`
  margin-bottom: 8px;
`;

export const SingleSize = styled.button<{
  available: boolean;
  selected: boolean;
}>`
  text-align: center;
  padding: 0;
  border: 1px solid black;
  margin: 0 5px;
  outline: none;
  border-radius: 50%;
  height: 38px;
  width: 38px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.25s ease-out;
  background: rgba(255, 255, 255, ${(props) => (props.selected ? 1 : 0.7)});

  &:hover {
    ${(props) => props.available && "background: rgba(255, 255, 255, 1)"};
  }
`;

export const Purchase = styled.button`
  margin-top: 15px;
  width: min(200px, 90%);
  text-align: center;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  background-color: white;
  font-size: 1.25rem;
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
  margin: 8px 0;
`;

export const LeftSide = styled.div`
  width: 100%;
  max-width: 500px;

  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export const RightSide = styled.div`
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

export const Description = styled.p`
  margin: 1.25rem 0 3rem !important;
  font-size: 1.25rem;
`;

export const Input = styled.input`
  font-size: 1rem;
  margin: 5px 0;
  max-width: 250px;
  border: 5px;
  padding: 8px 12px;
  width: 100%;
  text-align: center;
`;

export const Form = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
