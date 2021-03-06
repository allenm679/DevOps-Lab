const express = require('express');
const path = require('path');

const app = express();

// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '2c9ab3cd513246e68f286fdb75be78ef',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");
app.use(rollbar.errorHandler())

app.use(express.json())
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.css'))
  })


  app.get('/', (req,res) => {
      res.sendFile(path.join(__dirname,'../index.html'))
  })

  app.get('/err',(req,res) => {
      try{
          terror()
      } catch (err) {
        rollbar.error('invalid')
        rollbar.critical('invalid')
        rollbar.warning('Facebook api unavailable')
        rollbar.info('User logged in')
        rollbar.debug('done')
        
    }
  })


  const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

