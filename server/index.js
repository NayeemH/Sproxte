// Config 
require('dotenv').config();


// Import data
const connection = require('./config/mongodb');
const app = require('./app');



// PORT
const PORT = process.env.PORT || 5000;


// Start app after mongodb is connected
connection()
.then(()=> {
    app.listen(PORT, () => {
        console.log('\x1b[32m%s\x1b[0m', `Server is running on port ${PORT}`);
    });
});