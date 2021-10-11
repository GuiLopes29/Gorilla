const app = require('./server');
const config = require('./config');
const { cdi } = require('./src/utils/file-reader');
const logger = require('./src/middleware/logger')

app.use(logger.logger);
app.use(logger.errorLog);

app.listen(config.port, () => {
    cdi();
    console.log('Hauszapi executando em ' + config.url + config.port)
});