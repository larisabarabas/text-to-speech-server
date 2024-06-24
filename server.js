const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.post("/synthesize", async (req, res, next) => {
  const text = req.body.text;
  const apiKey = process.env.API_KEY;
  const endpointURL = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`;
  if (text) {
    const payload = {
      audioConfig: {
        audioEncoding: "MP3",
        effectsProfileId: ["small-bluetooth-speaker-class-device"],
        pitch: 0,
        speakingRate: 1,
      },
      input: {
        text: text,
      },
      voice: {
        languageCode: "en-US",
        name: "en-US-Standard-A",
      },
    };
    const response = await axios.post(endpointURL, payload);
    res.json(response.data);
  } else {
    next("Missing text value");
  }
});

const port = 3001;
app.listen(port, () => {
  console.log("Server running on port 3001");
});
