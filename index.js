const path = require('path');
const fastify = require('fastify')({
    logger: {
        prettyPrint: true
    }
});
const port = process.env.PORT || 3000;

fastify.register(require('point-of-view'),{
    engine: {
        handlebars: require('handlebars')
    }
});

fastify.register(require('fastify-static'),{
    root: path.join(__dirname, 'public'),
    prefix: '/public/'
});

//route
fastify.get('/', function (request, reply) {
    const name = request.query.name || 'Anonymous';
    reply.view('/public/templates/index.hbs', {name});
});

// Run the server!
fastify.listen(3000, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
})