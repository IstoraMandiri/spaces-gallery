import React from "react";
import { styled } from "twin.macro";
import { EnvironmentStoreHook } from "stores/environment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

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
  justify-content: flex-end;
  position: relative;
  border-radius: 3%;
  background-image: url("https://spaces-gallery-assets.s3-us-west-1.amazonaws.com/images/pausemenu.jpg");
  background-position: center;
  background-size: cover;
`;

const Continue = styled.div`
  width: 50%;
  height: 12%;
  position: absolute;
  bottom: 12%;
  margin-top: 5px;
  :hover {
    cursor: pointer;
    border: 2px solid white;
    border-radius: 50%;
  }
`;

const Version = styled.a`
  position: absolute;
  top: 0;
  right: 7px;
  color: white;
  font-size: 0.6em;
`;

const Instagram = styled.div`
  position: absolute;
  top: 8px;
  left: 10px;
  width: auto;
  height: auto;
  border-radius: 30%;
  color: white;
  transition: width 0.5s, height 0.5s;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
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
          <FontAwesomeIcon icon={faInstagram} size="lg" />
        </Instagram>
        <Continue onClick={closeOverlay} />
      </Window>
    </Container>
  );
};

export default PauseMenu;
