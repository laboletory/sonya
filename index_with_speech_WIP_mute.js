const OpenAI = require ('openai');
const { Configuration, OpenAIApi } = OpenAI;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;



let conversationHistory = "Sonya Cassie: red \nYou: Are you a robot?\nSonya Cassie: Sonya Cassie: I'm a real person, not a robot. \n"
const configuration = new Configuration({
    organization: "org-MO9E18oesjeJOnSMMvQNhbCB",
    apiKey: "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",
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
        max_tokens: 300,
        temperature: 0.8,
        max_tokens: 160,
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
    console.log('Sonya ready to kick on 3001 ')
});
