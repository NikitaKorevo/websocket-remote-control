import { WebSocket } from 'ws';
import { mouseNavigation } from './mouseNavigation';
import { Commands } from '../types';
import { figureDrawing } from './figureDrawing';
import { screenImage } from './screenImage';

export const router = (ws: WebSocket, data: string) => {
  const [command, firstParameter, secondParameter] = data.split(' ');

  const { mouseUp, mouseRight, mouseDown, mouseLeft, mousePosition } = mouseNavigation(
    ws,
    command,
    firstParameter
  );
  const { drawCircle, drawSquare, drawRectangle } = figureDrawing(
    ws,
    command,
    firstParameter,
    secondParameter
  );
  const { getScreenImage } = screenImage(ws, command);

  switch (command) {
    case Commands.Mouse_up:
      return mouseUp();

    case Commands.Mouse_right:
      return mouseRight();

    case Commands.Mouse_down:
      return mouseDown();

    case Commands.Mouse_left:
      return mouseLeft();

    case Commands.Mouse_position:
      return mousePosition();

    case Commands.Draw_circle:
      return drawCircle();

    case Commands.Draw_square:
      return drawSquare();

    case Commands.Draw_rectangle:
      return drawRectangle();

    case Commands.Prnt_scrn:
      return getScreenImage();

    default:
      break;
  }
};
