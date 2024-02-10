//
//
// Critical Genesis Website CMS
//
// Utilizes custom Plugins and Express
//
//

// Import Express
import express from 'express'

// Import plugins
import Molly from './plugins/molly/molly.mjs'
import About from './plugins/about/about.mjs'

// Import Pug
import pug from 'pug'

// Create Express app
const app = express()

// Create Global plugin object
let vars = {}


//
// Main function contains primary logic
//
async function main()
{
    // Create Express app

    // Create Molly instance
    const molly = new Molly(app, vars)
    const about = new About(app, vars)

    // Start Express app
    app.listen(80, () => console.log('Listening on port 80'))

    // Serve Express routes
    await express_routes()
}

async function express_routes()
{
    // Serve main static at route
    app.use('/', express.static('main/'))

    //Serve main page using pug
    app.get('/', (req, res) => {
        res.send(pug.renderFile('main/index.pug'))
    })
}

main()