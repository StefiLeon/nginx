const express = require ('express');
const { fork } = require ('child_process');
const app = express();

const PORT = parseInt(process.argv[2] || 8080);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/info', (req, res) => {
    res.send({
        argumentos:process.argv,
        plataforma: process.platform,
        version_node: process.version,
        memoria: process.memoryUsage().rss,
        path: process.execPath,
        id: process.pid,
        folder: process.cwd()
    })
})

app.get('/api/randoms', (req, res) => {
    const calculus = fork('calculus', [req.query.cant])
    calculus.on('message', (data) => {
        res.send({ port: PORT, numbers: data })
    })
})