import { WebSocket } from 'ws';
import Jimp from 'jimp';
import { mouseNavigation } from './mouseNavigation';
import { Commands } from '../types';
import { figureDrawing } from './figureDrawing';

export const router = (ws: WebSocket, data: string) => {
  const [command, firstParameter, secondParameter, ...otherParameters] = data.split(' ');
  console.log(command);

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
      return;

    default:
      break;
  }
};
