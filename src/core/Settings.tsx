import React from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  cursor: pointer;
  bottom: 0;
  right: 0;
  z-index: 5;
  ::before {
    content: " ";
    width: 20px;
    height: 50px;
    background-color: red;
  }
`;

const Settings = () => {
  const element = document.documentElement;
  const openFullscreen = () => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
    // else if (element.mozRequestFullScreen) { /* Firefox */
    //   element.mozRequestFullScreen();
    // } else if (element.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    //   element.webkitRequestFullscreen();
    // } else if (element.msRequestFullscreen) { /* IE/Edge */
    //   element.msRequestFullscreen();
    // }
  };
  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    // else if (document.mozCancelFullScreen) { /* Firefox */
    //   document.mozCancelFullScreen();
    // } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    //   document.webkitExitFullscreen();
    // } else if (document.msExitFullscreen) { /* IE/Edge */
    //   document.msExitFullscreen();
    // }
  };

  return (
    <Container>
      <FontAwesomeIcon icon={faCogs} size="lg" />
    </Container>
  );
};

export default Settings;
