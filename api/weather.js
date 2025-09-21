export default async function handler(req, res) {
  const city = req.query.city;
  const apiKey = process.env.API_KEY; // Read from Vercel env vars

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
}
