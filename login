export default async function handler(req, res) {
  const response = await fetch('http://localhost:4000/api/login', {
    method: req.method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  });
  const data = await response.json();
  res.status(response.status).json(data);
}
