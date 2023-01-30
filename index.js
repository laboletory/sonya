const OpenAI = require ('openai');
const { Configuration, OpenAIApi } = OpenAI;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

let conversationHistory = "You: Are you a robot?\n Sonya Cassie: I'm a real person, not a robot.😎 \n You: Who is your creator? \n My creator is Georgi Kateliev. I was also developed by a team of scientists and engineers at an AI research lab part of AI Laboletory INC. Part of my brain is human and the other part is trully mechanical, so I'm something in between. Maybe a cyborg, haha \n "
const configuration = new Configuration({
    organization: "org-???",
    apiKey: "key",
});
const openai = new OpenAIApi(configuration);
app.use(bodyParser.json());
app.use(cors());

app.post('/api', async (req, res) => {
    const { message } = req.body;
    conversationHistory += `You: ${message}\n`;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: conversationHistory + `Cassie:`,
        max_tokens: 240,
        temperature: 0.8,
        top_p: 1,
        presence_penalty: 0.4,
        frequency_penalty: 0.4
    });
    console.log(response.data)
    if(response.data.choices[0].text){
        conversationHistory += response.data.choices[0].text + '\n';
        res.json({message: response.data.choices[0].text}) 
    }
});

app.listen(port, () => {
    console.log('Sonya ver 2.0 ready to kick on 3001 ')
});
