const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Importing routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

//Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
