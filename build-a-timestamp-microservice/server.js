import express from 'express';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static('public'));

// Return the current timestamp when no date is provided
app.get('/api', (req, res) => {
  const date = new Date();

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Return the timestamp for a supplied date
app.get('/api/:date', (req, res) => {
  const dateParam = req.params.date;
  let date;

  if (/^\d+$/.test(dateParam)) {
    date = new Date(Number(dateParam));
  } else {
    date = new Date(dateParam);
  }

  if (Number.isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;