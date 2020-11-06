import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Group } from "three";
import { useEnvironment } from "../core/utils/hooks";
import { useFrame } from "react-three-fiber";

type InteractableProps = {
  children: ReactNode;
  onClick?: () => void;
  onHover?: () => void;
  onUnHover?: () => void;
};

/**
 *
 * Interactible adds on click and hover methods to any group of Object3D's
 *
 * @param props
 * @constructor
 */
const Interactable = (props: InteractableProps) => {
  const { children, onClick, onHover, onUnHover } = props;

  const { player } = useEnvironment();
  const { raycaster } = player;

  const group = useRef<Group>();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (group.current) {
      const intersections = raycaster.intersectObject(group.current, true);
      if (!hovered && intersections && intersections.length > 0) {
        setHovered(true);
        if (onHover) {
          onHover();
        }
      } else if (hovered) {
        setHovered(false);
        if (onUnHover) {
          onUnHover();
        }
      }
    }
  });

  const checkClick = useCallback(() => {
    if (hovered && onClick) {
      onClick();
    }
  }, [hovered]);

  useEffect(() => {
    document.addEventListener("click", checkClick);
    return () => {
      document.removeEventListener("click", checkClick);
    };
  }, []);

  return <group ref={group}>{children}</group>;
};

export default Interactable;
