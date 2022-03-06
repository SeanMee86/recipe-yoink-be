const express = require('express');
const app = express();
const cors = require('cors');
const parser = require('node-html-parser');
const axios = require('axios');
const port = process.env.PORT || 8000;

app.use(
    express.json(),
    express.urlencoded({extended: false}),
    cors()
)

app.route('/getUrl')
    .post((req, res) => {
        axios.get(req.body.url)
            .then(response => {
                const html = parser.parse(response.data);
                res.send(html.querySelector(req.body.selector).toString())
            })
    })

app.listen(
    port,
    () => console.log(`listening on port: ${port}`)
)