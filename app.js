const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ limit: 524288000, extended: false }));
app.use(bodyParser.json({ limit: 524288000 }));

app.get('/', (req, res) => res.send('Hello Yitches this the backend'));

app.post('/classify', (req, res) => {
    const img_bitmap = Object.values(req.body.img.data);
    res.send(img_bitmap);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening to port ${port}`));