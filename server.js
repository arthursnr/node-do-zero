// import { createServer } from 'node:http'

//  const server = createServer(() => {
//  console.log('oi');
//  })

//  server.listen(3333)

import { fastify } from 'fastify';
//import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js';

const server = fastify()

// POST http://localhost:3333/videos

//Route Parameter - :ID
// PUT http://localhost:3333/videos/

//const database = new DatabaseMemory()

const database = new DatabasePostgres()


// CRIAR O VIDEO (CREATE)
server.post('/videos', async (request, reply) => {
    console.log('Dados do corpo da requisição:', request.body);

    const {title, description, duration} = request.body
    

    await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

// LISTANCO O VIDEO (READ)
server.get('/videos', async (request) => {
    const search = request.query.search


    const videos = await database.list(search)

    return videos;
})

// ATUALIZA O VIDEO (UPDATE)
server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body

await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

// DELETANDO O VIDEO (DELETE)
server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})

