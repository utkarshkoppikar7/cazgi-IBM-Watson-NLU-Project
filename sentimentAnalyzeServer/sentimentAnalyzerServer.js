const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const natLang = require('ibm-watson/natural-language-understanding/v1');
    const {IamAuthenticator} = require('ibm-watson/auth');
    
    const natLangUnderstanding = new natLang ({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey : api_key,
        }),
        serviceUrl: api_url,
    });
    return natLangUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {

    const param = {
        'url': req.query.url,
        'features': {
            'emotion': {
            'limit': 5
            }
        }
    }
    getNLUInstance().analyze(param)
        .then(analysisResults => {
            return res.send(analysisResults.result.emotion.document.emotion);
        })
        .catch(err=>{
            console.log(err);
        });
   // return res.send({"happy":"90","sad":"10"});
});

app.get("/url/sentiment", (req,res) => {
     const param = {
        'url': req.query.url,
        'features': {
            'sentiment':{

            }
        }
    }
    getNLUInstance().analyze(param)
        .then(analysisResults => {
            return res.send(analysisResults.result.sentiment.document.label);
        })
        .catch(err=>{
            console.log(err);
        });
    //return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
    const param = {
        'text': req.query.text,
        'features': {
            'emotion': {
            'limit': 5
            }
        }
    }
    getNLUInstance().analyze(param)
        .then(analysisResults => {
            return res.send(analysisResults.result.emotion.document.emotion);
        })
        .catch(err=>{
            console.log(err);
        });
    //return res.send({"happy":"10","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {
    const param = {
        'text': req.query.text,
        'language': 'en',
        'features': {
            'sentiment':{

            }
        }
    }
    getNLUInstance().analyze(param)
        .then(analysisResults => {
            return res.send(analysisResults.result.sentiment.document.label);
        })
        .catch(err=>{
            console.log(err);
        });
    //return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

