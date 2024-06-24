import expressBrute from 'express-brute';


const store = new expressBrute.MemoryStore();

const bruteForce = new expressBrute(store, {
    freeRetries: 3,
    minWait: 1000,
    maxWait: 60 * 1000,
    lifetime: 60,
    failCallback: (req, res, next, nextValidRequestDate) => {
        res.status(429).json({ error: 'Rate limit exceeded, please try again later.' });
    }
});


export default bruteForce;