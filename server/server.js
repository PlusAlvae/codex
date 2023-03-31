import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'
import mongoose from 'mongoose'
import Post from "./models/Post.js";

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())


app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log(prompt)
    console.log(typeof prompt)
    const response1 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Explain which emotions I am feeling in this text, in 150 to 200 words: ${prompt}`,
      temperature: 0, // Higher values means the model will take more risks.
      max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0, // Numbers between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });
    const response2 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Write this text in second person narrator: ${response1.data.choices[0].text}`,
      temperature: 0, // Higher values means the model will take more risks.
      max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });
    console.log("reached")
    const data = req.body.prompt;
    const newPost = new Post({
      post: data
    });
    await newPost.save();
    console.log("saved")
    res.status(200).send({
      bot: response2.data.choices[0].text
    });

    

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})


mongoose.set("strictQuery", true);
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

   /* ADD DATA ONE TIME */
/*     User.insertMany(users);
    Post.insertMany(posts);  */
  })
  .catch((error) => console.log(`${error} did not connect`));
