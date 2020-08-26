import "webrtc";

interface EnvironmentEvent {
  name: string;
  callback: (...args: any[]) => void;
}
