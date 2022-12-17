class DatabaseSql {
  constructor (file, db) {
    switch (db) {
      case 'mysql':
        this.database = require('knex')({
          client: 'mysql',
          connection: {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: file
          }
        }
        )
        console.log('mysql')
        break
      case 'sqlite':
        this.database = require('knex')({
          client: 'sqlite3',
          connection: { filename: `./src/databases/${file}.sqlite3` },
          useNullAsDefault: true
        })
        console.log('sqlite')
        break
    }
  }
}
module.exports = DatabaseSql
