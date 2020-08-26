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
  padding: 25px 15px;
  background: url("https://dwvo2npct47gg.cloudfront.net/images/awge-space/menu-sign.png")
    center center no-repeat;
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
  font-size: 1em;
`;

const TextContainer = styled.div`
  width: 70%;
  height: 66%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
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
  font-family: "Merchant Copy Wide", "Merchant Copy", sans-serif;

  @media screen and (max-width: 500px) {
    font-size: 0.7em;
  }
`;

const VersionText = styled.p`
  position: absolute;
  top: 13px;
  right: 15px;
  font-size: 0.8em;
  color: white;
`;

const YearText = styled(VersionText)`
  left: 15px;
  right: inherit;
`;

const Line = styled.div`
  height: 0.375em;
  border-bottom: 3px dashed white;
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
        <YearText>{`© ${year}`}</YearText>
        <VersionText>{`v${NEXT_PUBLIC_VERSION}`}</VersionText>
        <TextContainer>
          <TextRow>
            <p>Move</p>
            <Spacer />
            <Line />
            <Spacer />
            <p>{isMobile ? "Joystick" : "WASD"}</p>
          </TextRow>
          <TextRow>
            <p>Look</p>
            <Spacer />
            <Line />
            <Spacer />
            <p>{isMobile ? "Drag" : "Mouse"}</p>
          </TextRow>
          <TextRow>
            <p>Pause</p>
            <Spacer />
            <Line />
            <Spacer />
            <p>{isMobile ? "Menu Button" : "Esc"}</p>
          </TextRow>
        </TextContainer>
      </Window>
      <Return id="pause-button" onClick={closeOverlay}>
        {`${isMobile ? "TAP" : "CLICK"} HERE TO RETURN`}
      </Return>
    </Container>
  );
};

export default PauseMenu;
