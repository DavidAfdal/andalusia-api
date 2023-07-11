import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import sewaRouter from './routes/sewaGedungRoute';
import blogRouter from './routes/blogRoute';
import HttpError from './util/httpError';

dotenv.config();

const port = process.env.PORT || 3000;
const app: Express = express();

app.use(express.json());
app.use('/api/gedung', sewaRouter);
app.use('/api/blog', blogRouter);
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.errorCode || 500).json({
    errorMessage: err.message || 'Something Wrong in server',
    stack: err.stack,
  });
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});
