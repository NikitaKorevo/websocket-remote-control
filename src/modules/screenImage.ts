import Jimp from 'jimp';
import { getMousePos, screen } from 'robotjs';
import { WebSocket } from 'ws';

export const screenImage = (ws: WebSocket, command: string) => {
  const getScreenImage = async () => {
    const { x, y } = getMousePos();
    const widthScreenImagePixels = 200;
    const heightScreenImagePixels = 200;

    const image = screen.capture(
      x - widthScreenImagePixels / 2,
      y - heightScreenImagePixels / 2,
      widthScreenImagePixels,
      heightScreenImagePixels
    );

    const jimp = new Jimp({
      data: image.image,
      width: widthScreenImagePixels,
      height: heightScreenImagePixels,
    });

    const buffer = await jimp.getBase64Async(jimp.getMIME());
    const data = buffer.slice('data:image/png;base64'.length + 1);

    ws.send(`${command} ${data}`);
  };

  return { getScreenImage };
};
