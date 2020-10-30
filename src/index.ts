import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import { ValidationError } from 'class-validator';
import { isCelebrateError } from 'celebrate';
// import * as methodOverride from 'method-override';
import routes from "./routes";
import { ErrorHandler, handleError } from './helpers/ErrorHandler';

createConnection().then(async connection => {

  // create express app
  const app = express();

  app.enable('trust proxy');

  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('public'));
  
  app.use("/", routes);
  //Set all routes from routes folder
  // app.use(methodOverride());
  
  // app.use((err: ErrorHandler, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  //     handleError(err, res);
  //   }
  // );
  //The 404 Route (ALWAYS Keep this as the last route)
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('err', err);
    if (isCelebrateError(err)) {
      // Logger.error('Error: %o', err);
      res.status(400).json({ error: 'Invalid data' }).end();
    } else if (err instanceof Array && err[0] instanceof ValidationError) {
      const messageArr: Array<string> = [];
      let e: ValidationError;
      for (e of err) {
        Object.values(e.constraints).map((msg: string) => {
          messageArr.push(msg);
        });
      }
      // Logger.error('Error: %o', messageArr);
      res.status(400).json({ errors: messageArr }).end();
    } else if (err.name === 'UnauthorizedError') {
      /**
       * Handle 401 thrown by express-jwt library
       */
      return res.status(401).json({ error: err.message });
    } else {
      next(err);
    }
  });

  // // app.use(
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   (err: ErrorHandler, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  //     // Logger.error('Error: %o', err.message);
  //     handleError(err, res);
  //   }
  // );

  // app.on('error', (error: express.Application) => {
  //   if (error.syscall !== 'listen') {
  //     throw error
  //   }
  //   switch (error.code) {
  //     case 'EACCES':
  //       console.error('Port requires elevated privileges')
  //       process.exit(1)
  //       break
  //     case 'EADDRINUSE':
  //       console.log('Port is already in use')
  //       process.exit(1)
  //       break
  //     default:
  //       throw error
  //   }
  // })
  
  // start express server
  app.listen(8081, () => {
    console.log("Server started on port 3000!");
  });

  console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));


