import { dragMouse, getMousePos, mouseToggle, moveMouseSmooth, setMouseDelay } from 'robotjs';
import { WebSocket } from 'ws';

export const figureDrawing = (
  ws: WebSocket,
  command: string,
  firstParameter: string,
  secondParameter: string
) => {
  const { x, y } = getMousePos();

  const drawCircle = () => {
    const radiusPixels = parseInt(firstParameter);

    ws.send(command + '\0');

    setMouseDelay(2);
    mouseToggle('down');

    for (let i = 0; i <= Math.PI * 2; i += 0.01) {
      const x1 = x + radiusPixels * Math.cos(i) - radiusPixels;
      const y1 = y + radiusPixels * Math.sin(i);

      dragMouse(x1, y1);
    }

    mouseToggle('up');
  };

  const drawSquare = () => {
    const figureSideLengthPixels = parseInt(firstParameter);

    ws.send(command + '\0');

    mouseToggle('down');
    moveMouseSmooth(x, y);
    moveMouseSmooth(x + figureSideLengthPixels, y);
    moveMouseSmooth(x + figureSideLengthPixels, y + figureSideLengthPixels);
    moveMouseSmooth(x, y + figureSideLengthPixels);
    moveMouseSmooth(x, y);
    mouseToggle('up');
  };

  const drawRectangle = () => {
    const figureWidthPixels = parseInt(firstParameter);
    const figureLengthPixels = parseInt(secondParameter);

    ws.send(command + '\0');

    mouseToggle('down');
    moveMouseSmooth(x, y);
    moveMouseSmooth(x + figureLengthPixels, y);
    moveMouseSmooth(x + figureLengthPixels, y + figureWidthPixels);
    moveMouseSmooth(x, y + figureWidthPixels);
    moveMouseSmooth(x, y);
    mouseToggle('up');
  };

  return { drawCircle, drawSquare, drawRectangle };
};
