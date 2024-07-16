const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.get('/', async (req, res) => {
  res.send('Hi');
}

app.get('/douyin', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('Thiếu URL');
  }

  try {
    const { data } = await axios.get(`https://dlpanda.com/vi?token=G7eRpMaa&url=${encodeURIComponent(url)}`);
    const $ = cheerio.load(data);
    let scrapedData = [];
    let imgSrc = [];

    $('.col-md-12.col-lg-6 img').each((index, element) => {
      const src = $(element).attr('src');
      if (src) {
        imgSrc.push(src); 
      }
    });

    $('video source').each((index, element) => {
      const videoUrl = $(element).attr('src');
      if (videoUrl) {
        scrapedData.push({ url: 'https:' + videoUrl });
      }
    });

    res.json({ videos: scrapedData, images: imgSrc });
  } catch (error) {
    res.status(500).send('Lỗi');
  }
});

app.get('/snapchat', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('Thiếu URL');
  }

  try {
    const { data } = await axios.get(`https://dlpanda.com/vi/snapchat?url=${encodeURIComponent(url)}`);
    const $ = cheerio.load(data);
    let videoSrc = [];

    $('video source').each((index, element) => {
      const src = $(element).attr('src');
      if (src) {
        videoSrc.push(src); 
      }
    });

    res.json({ videoSrc });
  } catch (error) {
    res.status(500).send('Lỗi');
  }
});

app.get('/weibo', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('Thiếu URL');
  }

  try {
    const { data } = await axios.get(`https://dlpanda.com/vi/weibo?url=${encodeURIComponent(url)}`);
    const $ = cheerio.load(data);
    let imgSrc = [];

    $('.col-md-12.col-lg-6 img').each((index, element) => {
      const src = $(element).attr('src');
      if (src) {
        imgSrc.push(src); 
      }
    });

    res.json({ imgSrc });
  } catch (error) {
    res.status(500).send('Lỗi');
  }
});

app.get('/tiktok', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('Thiếu URL');
  }

  try {
    const { data } = await axios.get(`https://dlpanda.com/vi?url=${encodeURIComponent(url)}&token=G7eRpMaa`);
    const $ = cheerio.load(data);
    let scrapedData = [];

    $('video source').each((index, element) => {
      const videoUrl = $(element).attr('src');
      if (videoUrl) {
        scrapedData.push({ videoUrl });
      }
    });

    res.json(scrapedData);
  } catch (error) {
    res.status(500).send('Lỗi');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
//Credits: TNTxTRICK
//Thanks for using my code
