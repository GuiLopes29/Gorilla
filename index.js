const app = require('./server');
const config = require('./config');
const { cdi } = require('./src/utils/file-reader');

app.listen(config.port, () => {
    cdi();
    console.log('Hauszapi executando em ' + config.url + config.port)
});