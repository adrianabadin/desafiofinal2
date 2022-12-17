const knex = require('knex')

class DatabaseSql {
  constructor (file, db) {
    switch (db) {
      case 'mysql':
        this.database = knex({
          client: 'mysql',
          connection: {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: file
          }
        }
        )
        break
      case 'sqlite':
        this.database = knex({
          client: 'sqlite3',
          connection: { filename: `./src/database/${file}` }
        })
        break
    }
  }
}
module.exports = DatabaseSql
