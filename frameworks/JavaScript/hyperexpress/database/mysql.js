import { createPool, createConnection } from 'mariadb'
import { isWorker } from 'node:cluster'
import { cpus } from 'node:os'
import { clientOpts } from '../config.js'

const client = await createConnection(clientOpts)

const res = await client.query('SHOW VARIABLES LIKE "max_connections"')

let maxConnections = 150

if (isWorker) {
    maxConnections = cpus().length > 2 ? Math.ceil(res[0].Value * 0.96 / cpus().length) : maxConnections
}

await client.end()

const pool = createPool({ ...clientOpts, connectionLimit: maxConnections })

const execute = (text, values) => pool.execute(text, values || undefined)

export const fortunes = () => execute('SELECT id, message FROM fortune')

export const find = (id) => execute('SELECT id, randomNumber FROM world WHERE id = ?', [id]).then(arr => arr[0])

export const getAllWorlds = () => execute('SELECT id, randomNumber FROM world')

export const update = (obj) => execute('UPDATE world SET randomNumber = ? WHERE id = ?', [obj.randomNumber, obj.id])
