const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());


app.get('/api', async (req, res) => {

    const limit = req.query.limit || 10;

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
    const data = await response.json();
    res.json(data);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server listening on PORT:${PORT}`);
})