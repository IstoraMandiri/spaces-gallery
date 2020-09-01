import React from "react";
import { styled } from "twin.macro";
import { EnvironmentStoreHook } from "stores/environment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
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
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  border-radius: 3%;
  background-image: url("https://spaces-gallery-assets.s3-us-west-1.amazonaws.com/images/pauseMenuBg.png");
  background-position: center;
  background-size: cover;
`;

const Continue = styled.div`
  width: auto;
  height: auto;
  cursor: pointer;
  text-align: center;
  font-size: 1.3em;
  font-family: "Lato", sans-serif;
  transition: opacity 0.15s linear;
  :hover {
    opacity: 0.5;
  }
`;

const Version = styled.a`
  position: absolute;
  top: 32px;
  right: 60px;
  font-size: 0.6em;
`;

const Instagram = styled.div`
  position: absolute;
  top: 35px;
  left: 60px;
  width: auto;
  height: auto;
  border-radius: 30%;
  color: white;
  cursor: pointer;
  transition: opacity 0.15s linear;
  :hover {
    opacity: 0.5;
  }
`;

const MusicIcon = styled.div`
  position: absolute;
  left: 60px;
  bottom: 10px;
`;

const MusicCreds = styled.div`
  position: absolute;
  width: 50%;
  height: 7%;
  bottom: 14px;
  left: 85px;
  diplay: inline;
  font-size: 0.6em;
  cursor: pointer;
  transition: opacity 0.1s linear;
  :hover {
    opacity: 0.5;
  }
`;

const Header = styled.div`
  width: auto;
  height: 30%;
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Lato", sans-serif;
`;

const Title = styled.div`
  height: 70%;
  font-size: 2em;
  text-align: center;
`;

const SubHeader = styled.div`
  width: auto;
  height: auto;
  font-size: 0.6em;
`;

const Text = styled.div`
  width: 100%;
  height: auto;
  margin: 10px 0;
  font-family: "Space Mono", monospace;
  font-size: 0.7em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

type OverlayProps = {
  useEnvStore: EnvironmentStoreHook;
};

const PauseMenu: React.FC<OverlayProps> = (props) => {
  const { useEnvStore } = props;

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
        <Version>v {NEXT_PUBLIC_VERSION}</Version>
        <Instagram
          onClick={() => {
            window.open("https://www.instagram.com/spaces3.0");
          }}
        >
          <FontAwesomeIcon id="musicicon" icon={faInstagram} size="lg" />
        </Instagram>
        <MusicIcon>
          <FontAwesomeIcon icon={faMusic} size="xs" />
        </MusicIcon>
        <MusicCreds
          onClick={() => {
            window.open("https://lucidmonday.com");
          }}
        >
          <b>-- </b>Lucid Monday
        </MusicCreds>
        <Header>
          <Title>SPACES</Title>
          <SubHeader>Opening Exhibit</SubHeader>
        </Header>
        <Text>
          <p>Move around: {isMobile ? "Joystick" : "W/A/S/D"}</p>
          <p>Look around: {isMobile ? "Drag" : "Mouse"}</p>
          <p>Pause: {isMobile ? "Menu Button" : "Esc"}</p>
        </Text>
        <Continue onClick={closeOverlay}>continue</Continue>
      </Window>
    </Container>
  );
};

export default PauseMenu;
