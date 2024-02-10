//
// About CMS plugin
// Requires an Express app to be passed in
// Provides a simple about page
//


// Import Express
import express from 'express'
import bodyParser from 'body-parser'

// Import Pug
import pug from 'pug'

class About
{
    constructor(app)
    {
        this.app = app

        // Create static endpoint
        this.app.use('/about/', express.static('plugins/about/page/'))

        // Create dynamic endpoint using index.pug
        this.app.get('/about/', (req, res) => {
            res.send(pug.renderFile('plugins/about/page/index.pug'))
        })
    }
}

export default About