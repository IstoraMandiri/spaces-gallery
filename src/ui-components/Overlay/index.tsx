import React, { useState } from "react";
import { EnvironmentStoreHook } from "stores/environment";
import { isMobile } from "react-device-detect";
import { Terms, Privacy } from "../Terms";

const { NEXT_PUBLIC_VERSION } = process.env;
import {
  Container,
  ClickContainer,
  Window,
  TextContainer,
  LinksContainer,
  LinkText,
  TextRow,
  Return,
  YearText,
  Line,
  Spacer,
  TermsTextContainer,
  BackButton,
  TermsContainer,
  InstructionText,
  InstructionsContainer,
  AWGELogo,
  CopyRightText,
  CopyRightContainer,
  MenuHeaderContainer,
  MenuNavContainer,
  NavText,
} from "./styled";
import StackedDivider from "../../ui-components/dividers/StackedDivider";
import Images from "../../themes/Images";

type OverlayProps = {
  useEnvStore: EnvironmentStoreHook;
};

const Overlay: React.FC<OverlayProps> = (props) => {
  const { useEnvStore } = props;
  const [currentPage, setPage] = useState(0);

  const year = new Date().getFullYear();

  const paused = useEnvStore((st) => st.paused);
  const setPaused = useEnvStore((st) => st.setPaused);

  const closeOverlay = () => setPaused(false);

  if (currentPage > 0) {
    return (
      <Container paused={paused}>
        <ClickContainer id="click-container" onClick={closeOverlay} />
        <Window>
          <TermsTextContainer>
            <BackButton onClick={() => setPage(0)}>BACK</BackButton>
            {currentPage == 1 ? <Terms /> : <Privacy />}
          </TermsTextContainer>
        </Window>
        <Return id="pause-button" onClick={closeOverlay}>
          {`${isMobile ? "TAP" : "CLICK"} HERE TO RETURN`}
        </Return>
      </Container>
    );
  } else {
    return (
      <Container paused={paused}>
        <ClickContainer id="click-container" onClick={closeOverlay} />
        <Window>
          <MenuHeaderContainer>
            <MenuNavContainer isMobile={isMobile}>
              <NavText>* Awge.com *</NavText>
              <NavText>Version {NEXT_PUBLIC_VERSION}</NavText>
            </MenuNavContainer>
            <AWGELogo src={Images.Logo} />
          </MenuHeaderContainer>
          <TextContainer>
            <TextRow>
              <InstructionText>Move</InstructionText>
              <Line />
              {isMobile ? (
                <InstructionsContainer>
                  <InstructionText>Drag</InstructionText>
                  <InstructionText>Joystick</InstructionText>
                </InstructionsContainer>
              ) : (
                <InstructionText>WASD</InstructionText>
              )}
            </TextRow>
            <TextRow>
              <InstructionText>Look</InstructionText>
              <Line />
              {isMobile ? (
                <InstructionsContainer>
                  <InstructionText>Drag</InstructionText>
                  <InstructionText>Screen</InstructionText>
                </InstructionsContainer>
              ) : (
                <InstructionText>Mouse</InstructionText>
              )}
            </TextRow>
            <TextRow>
              <InstructionText>Pause</InstructionText>
              <Line />
              {isMobile ? (
                <InstructionText>Menu</InstructionText>
              ) : (
                <InstructionText>ESC</InstructionText>
              )}
            </TextRow>
          </TextContainer>
          {isMobile ? (
            <LinksContainer>
              <CopyRightContainer>
                <CopyRightText>©</CopyRightText>
                <YearText> {year} AWGE</YearText>
              </CopyRightContainer>
              <TermsContainer>
                <LinkText onClick={() => setPage(1)}>TERMS</LinkText>
                <StackedDivider />
                <LinkText onClick={() => setPage(2)}>PRIVACY</LinkText>
              </TermsContainer>
            </LinksContainer>
          ) : (
            <React.Fragment>
              {/*  TODO: Coordinate with design team if necessary for click anywhere button  */}
              <LinksContainer />
            </React.Fragment>
          )}
        </Window>
        <Return id="pause-button" onClick={closeOverlay}>
          {`${isMobile ? "TAP" : "CLICK"} HERE TO START`}
        </Return>
      </Container>
    );
  }
};

export default Overlay;
