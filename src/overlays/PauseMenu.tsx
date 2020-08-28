import React from "react";
import { styled } from "twin.macro";
import { EnvironmentStoreHook } from "stores/environment";
import { isMobile } from "react-device-detect";

const { NEXT_PUBLIC_VERSION } = process.env;

const Container = styled.div<{ paused: boolean }>`
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

const ClickContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Window = styled.div`
  width: 90%;
  max-width: 400px;
  height: 91vw;
  max-height: 400px;
  padding: 25px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  font-family: "MyriadPro";
  //text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
  font-size: 1em;
  border: blue solid 3px;
  background-color: white;
`;

const Header = styled.div`
  width: 70%;
  height: auto;
  color: black;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  //border: red dashed 2px;
`;

const SubHeader = styled.div`
  font-size: 0.5em;
`;

const Controls = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 0 10px 0;
  //border: blue 2px dashed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: black;
  font-size: 1em;
  @media screen and (max-width: 500px) {
    font-size: 1em;
    width: 75%;
  }
`;

const ControlSet = styled.div`
  width: 70%;
  padding-top: 25px;
  //border: purple dashed 1px;
  font-size: 0.7em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Key = styled.div`
  font-weight: bold;
`;

const Binding = styled.div`
  width: 40%;
  //border: orange solid 2px;
  text-align: start;
`;

const Continue = styled.div`
  width: 70%;
  height: auto;
  margin-top: 15px;
  padding: 2px 0 2px 0;
  //border: green dashed 2px;
  text-align: center;
  color: black;
  font-size: 1.1em;
  :hover {
    color: red;
    cursor: pointer;
  }
`;

const TextContainer = styled.div`
  width: 70%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 1.1em;
  @media screen and (max-width: 500px) {
    font-size: 1em;
    width: 75%;
  }
`;

const LinksContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Text = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LinkText = styled.a`
  text-decoration: underline;
  font-size: 0.8em;
  cursor: pointer;
  color: #0c665c;
  text-shadow: none;
`;

const TextRow = styled(Text)`
  width: 100%;
  margin-bottom: 7px;
  flex-direction: row;
  justify-content: stretch;
`;

const Return = styled.button`
  border: 3px solid black;
  width: 88%;
  max-width: 391.1px;
  padding: 5px 10px;
  margin-top: 25px;
  border-radius: 8px;
  color: black;
  font-size: 0.8em;
  background-color: #fbd30d;
  //font-family: "Merchant Copy Wide", "Merchant Copy", sans-serif;

  @media screen and (max-width: 500px) {
    font-size: 0.7em;
  }
`;

const Line = styled.div`
  height: 0.375em;
  border-bottom: 3px dashed black;
  flex: 1 0 5px;
`;

const Spacer = styled.div`
  width: 5%;
`;

type OverlayProps = {
  useEnvStore: EnvironmentStoreHook;
};

const PauseMenu: React.FC<OverlayProps> = (props) => {
  const { useEnvStore } = props;

  const year = new Date().getFullYear();

  const paused = useEnvStore((st) => st.paused);
  const overlay = useEnvStore((st) => st.overlay);
  const setPaused = useEnvStore((st) => st.setPaused);

  const closeOverlay = () => setPaused(false);

  if (overlay) {
    return null;
  }

  return (
    <Container paused={paused}>
      <ClickContainer id="click-container" onClick={closeOverlay} />
      <Window>
        <Header>S P A C E S</Header>
        <Controls>
          <SubHeader>3D on the Web</SubHeader>
          <ControlSet>
            <Key>Move Around:</Key>
            <Binding>{isMobile ? "Joystick" : "W, A, S, D"}</Binding>
          </ControlSet>
          <ControlSet>
            <Key>Look Around:</Key>
            <Binding>{isMobile ? "Drag" : "Mouse"}</Binding>
          </ControlSet>
          <ControlSet>
            <Key>Pause:</Key>
            <Binding>{isMobile ? "Menu Button" : "Esc"}</Binding>
          </ControlSet>
        </Controls>
        <Continue onClick={closeOverlay}>CONTINUE</Continue>
      </Window>
      {/*<TextContainer>*/}
      {/*  <TextRow>*/}
      {/*    <p>Move</p>*/}
      {/*    <Spacer />*/}
      {/*    <Line />*/}
      {/*    <Spacer />*/}
      {/*    <p>{isMobile ? "Joystick" : "WASD"}</p>*/}
      {/*  </TextRow>*/}
      {/*  <TextRow>*/}
      {/*    <p>Look</p>*/}
      {/*    <Spacer />*/}
      {/*    <Line />*/}
      {/*    <Spacer />*/}
      {/*    <p>{isMobile ? "Drag" : "Mouse"}</p>*/}
      {/*  </TextRow>*/}
      {/*  <TextRow>*/}
      {/*    <p>Pause</p>*/}
      {/*    <Spacer />*/}
      {/*    <Line />*/}
      {/*    <Spacer />*/}
      {/*    <p>{isMobile ? "Menu Button" : "Esc"}</p>*/}
      {/*  </TextRow>*/}
      {/*</TextContainer>*/}
      {/*<Return id="pause-button" onClick={closeOverlay}>*/}
      {/*  {`${isMobile ? "TAP" : "CLICK"} HERE TO CONTINUE`}*/}
      {/*</Return>*/}
    </Container>
  );
};

export default PauseMenu;
