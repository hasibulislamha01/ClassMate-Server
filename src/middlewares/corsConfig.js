const cors = require('cors');

const corsOptions = cors({
    origin: [
        "http://localhost:5173",
        "https://classmate-ac788.web.app",
        "https://classmate-ac788.firebaseapp.com",
    ],
});

module.exports = corsOptions; 
