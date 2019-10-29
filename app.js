const express = require('express');

const app = express();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening to port ${port}`));

app.get('/', (req, res) => res.send('Hello Yitches this the backend'));

app.get('/classify', (req, res) => {
    res.json(req.body.data);
});