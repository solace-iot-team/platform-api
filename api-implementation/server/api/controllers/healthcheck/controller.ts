import { NextFunction, Request, Response } from 'express';
import L from '../../../common/logger';
import fetch from 'node-fetch';

export class Controller {
  async all(req: Request, res: Response, next: NextFunction): Promise<void> {
    L.info('checking health');
    const port = parseInt(process.env.PLATFORM_PORT) || 3000;

    fetch(`http://localhost:${port}/liveliness`).then(async (response) => {
      if (response.status == 200) {
        res.status(200).json({ status: 'ok' }).end();
      } else {
        L.error(`Unhealthy ${response.status}`);
        let j = await response.json();
        res.status(503).json(j).end();
      }
    }).catch(e => {
      L.error(e);
      res.status(503).json(e).end();
    });
  }
}
export default new Controller();
