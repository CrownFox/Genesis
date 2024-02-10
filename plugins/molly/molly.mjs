//
// Molly CMS plugin
// Requires an Express app to be passed in
// Uses OpenAI and Pinecone.io APIs
//

// Import OpenAI
import OpenAI from 'openai'

// Import Express
import express from 'express'
import bodyParser from 'body-parser'

const dev = true

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Import Pinecone.io
import {Pinecone} from '@pinecone-database/pinecone'

// Import Pug
import pug from 'pug'

//
// Molly is a CMS plugin requiring an app and a vars input
//

// Create an instance of OpenAI
const openai = new OpenAI({
    apiKey: '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'
})

// Create an instance of Pinecone.io
const pinecone = new Pinecone({
    apiKey: '9dcbf03c-7a4c-42a0-83c2-5b048d221351',
    environment: 'us-west4-gcp'
})

const PINECONE_INDEX = 'molly'

const globals = {}


class Molly
{
    constructor(app)
    {
        this.app = app

        // Create static endpoint
        this.app.use('/molly/', express.static('plugins/molly/page/'))

        // Create dynamic endpoint using index.pug
        this.app.get('/molly/', (req, res) => {
            res.send(pug.renderFile('plugins/molly/page/index.pug', {dev: dev}))
        })

        this.app.post('/molly/api/:method/', urlencodedParser, methodHandler)
    }
}

async function methodHandler(req, res)
{
    let methodName = req.params.method

    switch(methodName)
    {
        case 'completion':
            console.log('Completion')
            console.log(req.body)
            let username = req.body.username
            let prompt = req.body.prompt

            let result = await completion(username, prompt)
            res.json(result)

            break
    }
}

async function completion(username, prompt)
{
    //Get content from args
    await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
        messages: [
            {role: 'system', content: "Your name is Molly. You are an unfinished Digital Assistant. You are talking to a user named " + username + "."},
            {role: 'user', content: prompt}
        ]
    }).then((response) => {
        console.log(response.choices[0].message)
        globals['completion'] = response.choices[0].message.content
    })

    console.log(globals['completion'])

    return globals['completion']
}

export default Molly