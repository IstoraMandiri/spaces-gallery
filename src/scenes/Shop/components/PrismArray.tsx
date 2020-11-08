import Prism from "./Prism";

const prismColors = ["#af9fff", "#fcfdfe", "#d7dbe2", "#dc7da8", "#8b8c89"];

const PrismArray = React.memo(() => {
  const PrismArr = [];
  for (let i = 0; i < 30; i++) {
    PrismArr.push(
      <Prism
        scale={[Math.random() * 5, Math.random() * 5, Math.random() * 5]}
        position={[
          Math.floor(Math.random() * 40),
          Math.floor(Math.random() * 30) + 1.5,
          Math.floor(Math.random() * 40),
        ]}
        color={prismColors[Math.floor(Math.random() * prismColors.length)]}
      />
    );
    PrismArr.push(
      <Prism
        scale={[
          Math.random() * 4 + 2,
          Math.random() * 4 + 2,
          Math.random() * 4 + 2,
        ]}
        position={[
          Math.floor(-Math.random() * 40),
          Math.floor(Math.random() * 30) + 1.5,
          Math.floor(Math.random() * 40),
        ]}
        color={prismColors[Math.floor(Math.random() * prismColors.length)]}
      />
    );
    PrismArr.push(
      <Prism
        scale={[
          Math.random() * 4 + 2,
          Math.random() * 4 + 2,
          Math.random() * 4 + 2,
        ]}
        position={[
          Math.floor(Math.random() * 40),
          Math.floor(Math.random() * 30) + 1.5,
          Math.floor(-Math.random() * 40),
        ]}
        color={prismColors[Math.floor(Math.random() * prismColors.length)]}
      />
    );
    PrismArr.push(
      <Prism
        scale={[
          Math.random() * 4 + 2,
          Math.random() * 4 + 2,
          Math.random() * 4 + 2,
        ]}
        position={[
          Math.floor(-Math.random() * 40),
          Math.floor(Math.random() * 30) + 1.5,
          Math.floor(-Math.random() * 40),
        ]}
        color={prismColors[Math.floor(Math.random() * prismColors.length)]}
      />
    );
  }
  return <>{PrismArr}</>;
});

export default PrismArray;
