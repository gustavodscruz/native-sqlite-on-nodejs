import {DatabaseSync} from 'node:sqlite'
import bricks from 'sql-bricks'
const database = new DatabaseSync('./db.sqlite')


function runSeed(items){
    database.exec(
        `DROP TABLE IF EXISTS students`
    )
    database.exec(`
        CREATE TABLE students(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL
        ) STRICT
        `)
    insert({table : 'students', items })

}
export function select(query){
    return database.prepare(query).all()

}
export function insert({table, items}){
    const {text, values} = bricks.insertInto(table, items)
    .toParams({ placeholder: '?'})
    const insertStatement = database.prepare(text)
    insertStatement.run(...values)
}

runSeed([
    {
        name: 'gustavodscruz',
        phone: '3123133131'
    },
    {
        name: 'afonso heitor',
        phone: '3123133131'
    },
    {
        name: 'heitinho',
        phone: '3123133131'
    },
])
