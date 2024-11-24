import csv from 'csv-parser'
import Redis from 'ioredis'

import fs from 'fs'

let r = new Redis()
let p = r.pipeline()

fs.createReadStream('Top_1000_Songs.csv')
 .pipe(csv())
 .on('data', data => {
    let key = `name:${data.Position}`
    p.hset(key, data)
 })
 .on('end', () =>{
    p.exec()
    r.quit()
 })