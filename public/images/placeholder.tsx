interface PlaceholderProps {
  width: number
  height: number
  text?: string
  bgColor?: string
  textColor?: string
}

export function generatePlaceholderSVG({
  width = 800,
  height = 600,
  text = `${width}×${height}`,
  bgColor = "#f0f0f0",
  textColor = "#888888",
}: PlaceholderProps): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bgColor}"/>
      <text x="50%" y="50%" fontFamily="Arial" fontSize="24" fill="${textColor}" textAnchor="middle" dominantBaseline="middle">${text}</text>
    </svg>
  `

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`
}

