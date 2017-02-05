const Hapi = require('hapi');
const mysql = require('mysql');

const server = new Hapi.Server();
server.connection({ port: 9000, host: 'localhost' });

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'rest'
});

connection.connect();

server.route({
    method: 'GET',
    path: '/{id}',
    handler: function (request, reply) {
      console.log('ID', request.params.id);
      connection.query('SELECT * FROM users WHERE id = ' +  request.params.id, function (error, results, fields) {
        if (error) {
          throw error;
        }
        console.log('RESULTS', results);
        return reply(results[0]);
      });
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
