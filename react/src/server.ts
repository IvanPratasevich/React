import { createServer as createViteServer } from 'vite';
import express, { Application, Request, Response } from 'express';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import path from 'node:path';
import 'whatwg-fetch';
import 'dotenv/config';

async function createServer() {
  try {
    const PORT = process.env.PORT || 3333;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    const app: Application = express();

    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.use('*', async (req: Request, res: Response) => {
      const { originalUrl } = req;

      let html = await readFile(path.resolve(__dirname, '../index.html'), 'utf8');
      html = await vite.transformIndexHtml(originalUrl, html);

      const parts = html.split('<!--ssr-->');

      const [firstPart, lastPart] = parts;

      const { render } = await vite.ssrLoadModule('./src/entry-server.tsx');

      const { pipe } = render(
        {
          onShellReady() {
            res.write(firstPart);
            pipe(res);
          },

          onShellError(error: Error) {
            console.error(error);
          },

          onAllReady() {
            res.status(200).end(lastPart);
          },

          onError(error: Error) {
            console.error(error);
          },
        },
        originalUrl
      );
    });

    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  } catch (error: unknown) {}
}

createServer();
