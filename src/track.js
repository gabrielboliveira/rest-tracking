const restify = require('restify')
const TrackingCorreios = require('tracking-correios')
const env = require('./env')

const server = restify.createServer({
    name: env.name
})

server.use(restify.bodyParser())

server.post('/track', (req, res, next) => {
    if (req && req.params && req.params.codes) {
        TrackingCorreios.track(req.params.codes)
            .then( success => {
                res.send( { data: success } )
            })
            .catch( error => {
                res.send(new restify.InvalidArgumentError(error.message))
            })
            .finally( () => {
                next()
            })
    } else {
        res.send(new restify.InvalidArgumentError("Nenhum dado válido recebido."))
        next()
    }
});

server.listen(env.port, () => console.log(`${server.name} listening at ${server.url}`))

process.on('uncaughtException', function (err) {
    console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
})
