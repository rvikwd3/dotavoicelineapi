import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Request, Response } from 'express';
import path from 'path';
import cookieSession from 'cookie-session';
import { createServer } from 'http';
import { Server } from 'socket.io';

import errorMiddleware from './middleware/errorHandler';
import voicelineRouter from './routes/voicelines';
import userRouter from './routes/users';
import { generateTwitchAuthUrl } from './utils';

// express server config
const app: Express = express();

const httpServer = createServer(app);

// cookie-session config
app.use(cookieSession({
  name: 'voiceline-api-server-session',
  keys: ['voicelineApiServerCookie_Key1', 'voicelineApiServerCookie_Key2'],

  // Cookies options
  maxAge: 1000 * 60 * 60 * 5,   // 5 minutes
  sameSite: 'lax',
  httpOnly: true,
  signed: true,
  overwrite: true,
}));

// Socket.io io config
const io = new Server(httpServer, {
  cors: {
    origin: process.env.SOCKETIO_CORS_ORIGIN_LIST?.split(','),
    methods: ["GET", "POST"]
  }
});


io.on("connection", async (socket) => {
  console.log(`Token payload: ${socket.handshake.auth.token}`);
  if (socket.handshake.auth.token) {
    await socket.join(socket.handshake.auth.token as string);
  }
});

// Set variable 'io' as socketIo server, so express routes can use it
app.set('io', io);

// Set templating engine to 'ejs'
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.json());

// Landing page
app.get('/', (req: Request, res: Response) => {
  if (!req.session) {
    console.log(`Request object doesn't have the 'session' property`);
    return;
  }
  const [twitchAuthUrl, twitchAuthState] = generateTwitchAuthUrl();
  req.session.twitchAuthState = twitchAuthState;
  res.render('pages/frontend/index.html', { authUrl: twitchAuthUrl });
});

/* Static Files (in /public) server */
app.use(express.static(path.join(__dirname, '../public')));

/*
 * API Routes
*/
app.use('/voicelines', voicelineRouter);
app.use('/user', userRouter);

/*
 * Middleware
*/
app.use(errorMiddleware);

console.log(`Express server and SocketIo server running on port: ${process.env.PORT}`);

// Socket.io listening port
httpServer.listen(process.env.PORT);