import { WebSocket } from 'ws';
import {
  dragMouse,
  getMousePos,
  mouseToggle,
  moveMouse,
  moveMouseSmooth,
  setMouseDelay,
} from 'robotjs';
import Jimp from 'jimp';

export const router = (ws: WebSocket, data: string) => {
  const [command, firstParameter, secondParameter, ...otherParameters] = data.split(' ');

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

    case 'draw_circle':
      setMouseDelay(2);
      mouseToggle('down');

      for (let i = 0; i <= Math.PI * 2; i += 0.01) {
        const x1 = x + +firstParameter * Math.cos(i) - +firstParameter;
        const y1 = y + +firstParameter * Math.sin(i);

        dragMouse(x1, y1);
      }

      mouseToggle('up');
      break;

    case 'draw_square':
      ws.send(command);
      mouseToggle('down');

      moveMouseSmooth(x, y);
      moveMouseSmooth(x + +firstParameter, y);
      moveMouseSmooth(x + +firstParameter, y + +firstParameter);
      moveMouseSmooth(x, y + +firstParameter);
      moveMouseSmooth(x, y);

      mouseToggle('up');
      break;

    case 'draw_rectangle':
      ws.send(command);
      mouseToggle('down');

      moveMouseSmooth(x, y);
      moveMouseSmooth(x + +firstParameter, y);
      moveMouseSmooth(x + +firstParameter, y + +secondParameter);
      moveMouseSmooth(x, y + +secondParameter);
      moveMouseSmooth(x, y);

      mouseToggle('up');
      break;

    default:
      break;
  }
};
