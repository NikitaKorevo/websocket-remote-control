import { getMousePos, moveMouse } from 'robotjs';
import { WebSocket } from 'ws';

export const mouseNavigation = (ws: WebSocket, command: string, firstParameter: string) => {
  const MouseControlOffsetPixels = parseInt(firstParameter);
  const { x, y } = getMousePos();

  const mouseUp = () => {
    moveMouse(x, y - MouseControlOffsetPixels);
    ws.send(command + '\0');
  };

  const mouseRight = () => {
    moveMouse(x + MouseControlOffsetPixels, y);
    ws.send(command + '\0');
  };

  const mouseDown = () => {
    moveMouse(x, y + MouseControlOffsetPixels);
    ws.send(command + '\0');
  };

  const mouseLeft = () => {
    moveMouse(x - MouseControlOffsetPixels, y);
    ws.send(command + '\0');
  };

  const mousePosition = () => {
    ws.send(`${command} ${x},${y}\0`);
  };

  return {
    mouseUp,
    mouseRight,
    mouseDown,
    mouseLeft,
    mousePosition,
  };
};
