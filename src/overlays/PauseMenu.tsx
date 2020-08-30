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

const Version = styled.a`
  position: absolute;
  top: 0;
  right: 5px;
  font-size: 0.6em;
`;

const Instagram = styled.img`
  position: absolute;
  top: 0;
  left: 5px;
  width: 25px;
  height: 25px;
  :hover {
    cursor: pointer;
  }
`;

const SubHeader = styled.div`
  font-size: 0.5em;
`;

const Controls = styled.div`
  width: 80%;
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
    font-size: 0.9em;
    width: 75%;
  }
`;

const ControlSet = styled.div`
  width: 100%;
  margin-left: 25px;
  padding-top: 25px;
  //border: purple dashed 1px;
  font-size: 0.7em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 500px) {
    margin-left: 10px;
  }
`;

const Key = styled.div`
  font-weight: bold;
`;

const Binding = styled.div`
  width: 45%;
  //border: orange solid 2px;
  text-align: start;
`;

const Continue = styled.div`
  width: 70%;
  height: auto;
  margin-top: 5px;
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
        <Version>v 1.0.0</Version>
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
    </Container>
  );
};

export default PauseMenu;
