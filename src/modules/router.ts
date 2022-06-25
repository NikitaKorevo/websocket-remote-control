import { WebSocket } from 'ws';
import { getMousePos, moveMouse } from 'robotjs';
import Jimp from 'jimp';

export const router = (ws: WebSocket, data: string) => {
  const [command, firstParameter, secondParameter, otherParameters] = data.split(' ');

  const { x, y } = getMousePos();

  switch (command) {
    case 'mouse_up':
      moveMouse(x, y - +firstParameter);
      ws.send(command + '\0');
      break;

    case 'mouse_right':
      moveMouse(x + +firstParameter, y);
      ws.send(command + '\0');
      break;

    case 'mouse_down':
      moveMouse(x, y + +firstParameter);
      ws.send(command + '\0');
      break;

    case 'mouse_left':
      moveMouse(x - +firstParameter, y);
      ws.send(command + '\0');
      break;

    case 'mouse_position':
      ws.send(`${command} ${x},${y}`);
      break;

    default:
      break;
  }
};
