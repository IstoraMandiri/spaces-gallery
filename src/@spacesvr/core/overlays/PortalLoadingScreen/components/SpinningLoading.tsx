import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";

const spin = keyframes`
    from {
        opacity: 0.0;
    }
    to {
        opacity: 0.6;
        transform: translate3d(-4px, -4px, 570px);
    }
`;

const Wrapper = styled.div<{ finished: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  perspective: 500px;
  -moz-perspective: 500px;
  -webkit-perspective: 500px;

  & > i {
    display: block;
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    opacity: 0;
    background: rgba(255, 0, 255, 0.5);
    box-shadow: 0px 0px 10px white;
    animation-name: ${spin};
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }

  & i:nth-of-type(1) {
    transform: rotate(11.6129deg) translate3d(80px, 0, 0);
    animation-delay: 0.04839s;
  }

  i:nth-of-type(2) {
    transform: rotate(23.22581deg) translate3d(80px, 0, 0);
    animation-delay: 0.09677s;
  }

  i:nth-of-type(3) {
    transform: rotate(34.83871deg) translate3d(80px, 0, 0);
    animation-delay: 0.14516s;
  }

  i:nth-of-type(4) {
    transform: rotate(46.45161deg) translate3d(80px, 0, 0);
    animation-delay: 0.19355s;
  }

  i:nth-of-type(5) {
    transform: rotate(58.06452deg) translate3d(80px, 0, 0);
    animation-delay: 0.24194s;
  }

  i:nth-of-type(6) {
    transform: rotate(69.67742deg) translate3d(80px, 0, 0);
    animation-delay: 0.29032s;
  }

  i:nth-of-type(7) {
    transform: rotate(81.29032deg) translate3d(80px, 0, 0);
    animation-delay: 0.33871s;
  }

  i:nth-of-type(8) {
    transform: rotate(92.90323deg) translate3d(80px, 0, 0);
    animation-delay: 0.3871s;
  }

  i:nth-of-type(9) {
    transform: rotate(104.51613deg) translate3d(80px, 0, 0);
    animation-delay: 0.43548s;
  }

  i:nth-of-type(10) {
    transform: rotate(116.12903deg) translate3d(80px, 0, 0);
    animation-delay: 0.48387s;
  }

  i:nth-of-type(11) {
    transform: rotate(127.74194deg) translate3d(80px, 0, 0);
    animation-delay: 0.53226s;
  }

  i:nth-of-type(12) {
    transform: rotate(139.35484deg) translate3d(80px, 0, 0);
    animation-delay: 0.58065s;
  }

  i:nth-of-type(13) {
    transform: rotate(150.96774deg) translate3d(80px, 0, 0);
    animation-delay: 0.62903s;
  }

  i:nth-of-type(14) {
    transform: rotate(162.58065deg) translate3d(80px, 0, 0);
    animation-delay: 0.67742s;
  }

  i:nth-of-type(15) {
    transform: rotate(174.19355deg) translate3d(80px, 0, 0);
    animation-delay: 0.72581s;
  }

  i:nth-of-type(16) {
    transform: rotate(185.80645deg) translate3d(80px, 0, 0);
    animation-delay: 0.77419s;
  }

  i:nth-of-type(17) {
    transform: rotate(197.41935deg) translate3d(80px, 0, 0);
    animation-delay: 0.82258s;
  }

  i:nth-of-type(18) {
    transform: rotate(209.03226deg) translate3d(80px, 0, 0);
    animation-delay: 0.87097s;
  }

  i:nth-of-type(19) {
    transform: rotate(220.64516deg) translate3d(80px, 0, 0);
    animation-delay: 0.91935s;
  }

  i:nth-of-type(20) {
    transform: rotate(232.25806deg) translate3d(80px, 0, 0);
    animation-delay: 0.96774s;
  }

  i:nth-of-type(21) {
    transform: rotate(243.87097deg) translate3d(80px, 0, 0);
    animation-delay: 1.01613s;
  }

  i:nth-of-type(22) {
    transform: rotate(255.48387deg) translate3d(80px, 0, 0);
    animation-delay: 1.06452s;
  }

  i:nth-of-type(23) {
    transform: rotate(267.09677deg) translate3d(80px, 0, 0);
    animation-delay: 1.1129s;
  }

  i:nth-of-type(24) {
    transform: rotate(278.70968deg) translate3d(80px, 0, 0);
    animation-delay: 1.16129s;
  }

  i:nth-of-type(25) {
    transform: rotate(290.32258deg) translate3d(80px, 0, 0);
    animation-delay: 1.20968s;
  }

  i:nth-of-type(26) {
    transform: rotate(301.93548deg) translate3d(80px, 0, 0);
    animation-delay: 1.25806s;
  }

  i:nth-of-type(27) {
    transform: rotate(313.54839deg) translate3d(80px, 0, 0);
    animation-delay: 1.30645s;
  }

  i:nth-of-type(28) {
    transform: rotate(325.16129deg) translate3d(80px, 0, 0);
    animation-delay: 1.35484s;
  }

  i:nth-of-type(29) {
    transform: rotate(336.77419deg) translate3d(80px, 0, 0);
    animation-delay: 1.40323s;
  }

  i:nth-of-type(30) {
    transform: rotate(348.3871deg) translate3d(80px, 0, 0);
    animation-delay: 1.45161s;
  }

  i:nth-of-type(31) {
    transform: rotate(360deg) translate3d(80px, 0, 0);
    animation-delay: 1.5s;
  }

  i:nth-of-type(32) {
    transform: rotate(371.6129deg) translate3d(80px, 0, 0);
    animation-delay: 1.54839s;
  }

  i:nth-of-type(33) {
    transform: rotate(383.22581deg) translate3d(80px, 0, 0);
    animation-delay: 1.59677s;
  }

  i:nth-of-type(34) {
    transform: rotate(394.83871deg) translate3d(80px, 0, 0);
    animation-delay: 1.64516s;
  }

  i:nth-of-type(35) {
    transform: rotate(406.45161deg) translate3d(80px, 0, 0);
    animation-delay: 1.69355s;
  }

  i:nth-of-type(36) {
    transform: rotate(418.06452deg) translate3d(80px, 0, 0);
    animation-delay: 1.74194s;
  }

  i:nth-of-type(37) {
    transform: rotate(429.67742deg) translate3d(80px, 0, 0);
    animation-delay: 1.79032s;
  }

  i:nth-of-type(38) {
    transform: rotate(441.29032deg) translate3d(80px, 0, 0);
    animation-delay: 1.83871s;
  }

  i:nth-of-type(39) {
    transform: rotate(452.90323deg) translate3d(80px, 0, 0);
    animation-delay: 1.8871s;
  }

  i:nth-of-type(40) {
    transform: rotate(464.51613deg) translate3d(80px, 0, 0);
    animation-delay: 1.93548s;
  }

  i:nth-of-type(41) {
    transform: rotate(476.12903deg) translate3d(80px, 0, 0);
    animation-delay: 1.98387s;
  }

  i:nth-of-type(42) {
    transform: rotate(487.74194deg) translate3d(80px, 0, 0);
    animation-delay: 2.03226s;
  }

  i:nth-of-type(43) {
    transform: rotate(499.35484deg) translate3d(80px, 0, 0);
    animation-delay: 2.08065s;
  }

  i:nth-of-type(44) {
    transform: rotate(510.96774deg) translate3d(80px, 0, 0);
    animation-delay: 2.12903s;
  }

  i:nth-of-type(45) {
    transform: rotate(522.58065deg) translate3d(80px, 0, 0);
    animation-delay: 2.17742s;
  }

  i:nth-of-type(46) {
    transform: rotate(534.19355deg) translate3d(80px, 0, 0);
    animation-delay: 2.22581s;
  }

  i:nth-of-type(47) {
    transform: rotate(545.80645deg) translate3d(80px, 0, 0);
    animation-delay: 2.27419s;
  }

  i:nth-of-type(48) {
    transform: rotate(557.41935deg) translate3d(80px, 0, 0);
    animation-delay: 2.32258s;
  }

  i:nth-of-type(49) {
    transform: rotate(569.03226deg) translate3d(80px, 0, 0);
    animation-delay: 2.37097s;
  }

  i:nth-of-type(50) {
    transform: rotate(580.64516deg) translate3d(80px, 0, 0);
    animation-delay: 2.41935s;
  }

  i:nth-of-type(51) {
    transform: rotate(592.25806deg) translate3d(80px, 0, 0);
    animation-delay: 2.46774s;
  }

  i:nth-of-type(52) {
    transform: rotate(603.87097deg) translate3d(80px, 0, 0);
    animation-delay: 2.51613s;
  }

  i:nth-of-type(53) {
    transform: rotate(615.48387deg) translate3d(80px, 0, 0);
    animation-delay: 2.56452s;
  }

  i:nth-of-type(54) {
    transform: rotate(627.09677deg) translate3d(80px, 0, 0);
    animation-delay: 2.6129s;
  }

  i:nth-of-type(55) {
    transform: rotate(638.70968deg) translate3d(80px, 0, 0);
    animation-delay: 2.66129s;
  }

  i:nth-of-type(56) {
    transform: rotate(650.32258deg) translate3d(80px, 0, 0);
    animation-delay: 2.70968s;
  }

  i:nth-of-type(57) {
    transform: rotate(661.93548deg) translate3d(80px, 0, 0);
    animation-delay: 2.75806s;
  }

  i:nth-of-type(58) {
    transform: rotate(673.54839deg) translate3d(80px, 0, 0);
    animation-delay: 2.80645s;
  }

  i:nth-of-type(59) {
    transform: rotate(685.16129deg) translate3d(80px, 0, 0);
    animation-delay: 2.85484s;
  }

  i:nth-of-type(60) {
    transform: rotate(696.77419deg) translate3d(80px, 0, 0);
    animation-delay: 2.90323s;
  }

  i:nth-of-type(61) {
    transform: rotate(708.3871deg) translate3d(80px, 0, 0);
    animation-delay: 2.95161s;
  }

  i:nth-of-type(62) {
    transform: rotate(720deg) translate3d(80px, 0, 0);
    animation-delay: 3s;
  }

  animation-delay: 1s;
  transition: transform 1.75s ease-out, opacity 1.75s ease-out;
  ${(props) => props.finished && "transform: translate3d(0, 0, 500px)"};
  ${(props) => props.finished && "opacity: 0"};
`;

const SpinningLoading = (props: { progress: number }) => {
  const { progress } = props;
  const listElements = [...Array(62)].map((x, ind) => <i key={ind} />);

  return <Wrapper finished={progress === 100}>{listElements}</Wrapper>;
};

export default SpinningLoading;
