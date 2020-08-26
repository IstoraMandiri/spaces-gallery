import React, { useRef, useEffect, MutableRefObject } from "react";
import { Vector3 } from "three";
import nipplejs, { JoystickManager } from "nipplejs";
import { EnvironmentStoreHook } from "stores/environment";

type NippleMovementProps = {
  direction: MutableRefObject<Vector3>;
  useEnvStore: EnvironmentStoreHook;
  nippleContainer: MutableRefObject<HTMLElement | null>;
};

/**
 * NippleMovement gives the player a direction to move by taking
 * input from a nipple (joystick).
 *
 * Direction is stored as a Vector3 with the following format
 *    x: left/right movement, + for right
 *    y: forward/back movement, + for forwards
 *    z: up/down movement, + for up
 *
 * @param props
 * @constructor
 */
const NippleMovement = (props: NippleMovementProps) => {
  const { useEnvStore, direction, nippleContainer } = props;

  const nipple = useRef<JoystickManager>();
  const container = useEnvStore((st) => st.container);

  useEffect(() => {
    if (container?.current) {
      nippleContainer.current = document.createElement("divs");
      nippleContainer.current.style.position = "fixed";
      nippleContainer.current.style.left = "0";
      nippleContainer.current.style.bottom = "0";
      nippleContainer.current.style.width = "40%";
      nippleContainer.current.style.maxWidth = "160px";
      nippleContainer.current.style.height = "25%";
      nippleContainer.current.style.height = "160px";
      nippleContainer.current.style.zIndex = "5";
      // add class identifier to nippleContainer to identify touchEvents
      nippleContainer.current.classList.add("nipple-container");
      container.current.appendChild(nippleContainer.current);

      nipple.current = nipplejs.create({
        zone: nippleContainer.current,
        mode: "static",
        position: { left: "50%", top: "50%" },
        color: "transparent",
        size: 120,
        restOpacity: 1,
      });

      nipple.current.on("move", (evt, data) => {
        direction.current.set(data.vector.x, -data.vector.y, 0);
      });

      nipple.current.on("end", () => {
        direction.current.set(0, 0, 0);
      });

      return () => {
        if (nipple.current) {
          nipple.current.destroy();
        }
      };
    }
  }, []);

  return <></>;
};

export default NippleMovement;
