'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LevelSchema extends Schema {
  up () {
    this.create('levels', (table) => {
      table.increments()
      table.string("level", 5);
      table.timestamps()
    })
  }

  down () {
    this.drop('levels')
  }
}

module.exports = LevelSchema
