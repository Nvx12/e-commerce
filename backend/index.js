import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import db from './config/db.js';
import router from './routes/index.js';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import logger from './logging/logger.js';


dotenv.config();

const app = express();
db();
const corsConfig = {
    origin: true,
    credentials: true,
};
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
app.use(helmet({
    contentSecurityPolicy: true,
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
    },
    noSniff: true
}));

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", 'trusted-scripts.com'],
        },
    })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(session({
    secret: 'webslesson',
    name: 'AuthCookie',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
    }
}));

app.use('/v1', router);

app.use((req, res, next) => {
    res.status(405)
        .json({
            status: 405,
            isError: true,
            message: "Method not allowed",
            result: null
        })
});

app.use((req, res, next) => {
    logger.log("info", `${req.method} ${req.url}`);
    next();
});
app.listen(process.env.PORT, () => logger.log("info",`Server running on port ${process.env.PORT}`));
