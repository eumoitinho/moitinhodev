// This file will be used to generate placeholder SVGs
export default function handler(req, res) {
  const { width = 800, height = 600, text = "Placeholder Image" } = req.query

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#888" text-anchor="middle" dominant-baseline="middle">${text}</text>
    </svg>
  `

  res.setHeader("Content-Type", "image/svg+xml")
  res.status(200).send(svg)
}

