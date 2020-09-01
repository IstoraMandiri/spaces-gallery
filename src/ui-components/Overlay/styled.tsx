import { styled } from "twin.macro";

export const Container = styled.div<{ paused: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  transition: opacity 0.25s ease;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.paused ? 1 : 0)};
  pointer-events: ${(props) => (props.paused ? "all" : "none")};
`;

export const ClickContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

export const MenuHeaderContainer = styled.div`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

interface IMenuNavContainer {
  isMobile: boolean;
}

export const MenuNavContainer = styled.div<IMenuNavContainer>`
  width: 65%;
  z-index: 0;
  max-width: 550px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  position: absolute;
`;

export const NavText = styled.p`
  color: white;
  font-size: 23px;
`;

export const AWGELogo = styled.img`
  height: 55px;
  resize-mode: contain;
  z-index: 1;
`;

export const Window = styled.div`
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
  font-size: 1em;
  padding: 50px;
  width: 90%;
  max-width: 600px;
  height: 91vw;
  max-height: 400px;
`;

export const TextContainer = styled.div`
  width: 60%;
  display: flex;
  height: 50%;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 1.1em;
  margin-bottom: 2%;
`;

export const LinksContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const TermsContainer = styled.div`
  width: 37%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  padding-top: 7px;
`;

const Text = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LinkText = styled.a`
  text-decoration: none;
  font-size: 0.34em;
  cursor: pointer;
  color: white;
  text-shadow: none;
  opacity: 0.8;
  letter-spacing: 1.5px;
`;

export const InstructionsContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
`;
export const InstructionText = styled.p`
  text-align: center;
  font-size: 0.5em;
  width: 5.5em;
`;

export const TextRow = styled(Text)`
  width: 100%;
  height: 35%;
  flex-direction: row;
  justify-content: space-between;
`;

export const Return = styled.button`
  border: 3px solid black;

  padding: 5px 10px;

  border-radius: 8px;
  color: black;
  font-size: 0.8em;
  background-color: #fbd30d;
  height: 2.9em;
  font-family: "Merchant Copy Wide", "Merchant Copy", sans-serif;
  @media screen and (max-width: 500px) {
    font-size: 0.7em;
  }
  margin-top: 0px;
  width: 88%;
  max-width: 450px;
`;

export const CopyRightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CopyRightText = styled.p`
  font-size: 0.34em;
  color: white;
  opacity: 0.8;
  letter-spacing: 1.5px;
`;

export const YearText = styled.p`
  font-size: 0.34em;
  color: white;
  opacity: 0.8;
  margin-left: 5px;
  letter-spacing: 1.5px;
`;

export const Line = styled.div`
  background-image: linear-gradient(
    to right,
    white 33%,
    rgba(255, 255, 255, 0) 0%
  );
  background-position: bottom;
  background-size: 10px 6px;
  background-repeat: repeat-x;
  width: 50%;
  height: 10px;
`;

export const Spacer = styled.div`
  width: 5%;
`;

export const TermsTextContainer = styled.div`
  overflow-y: scroll;
  height: 70%;
  width: 90%;
  text-align: center;
  color: white;
  margin-top: 10px;
`;

export const BackButton = styled.div`
  position: absolute;
  top: 18px;
  left: 25px;
  font-size: 0.9em;
  height: 30px;
  width: 30px;
  cursor: pointer;
`;
