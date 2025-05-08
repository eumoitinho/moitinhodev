import Image from "next/image"

interface PlaceholderImageProps {
  width: number
  height: number
  text?: string
  className?: string
  alt?: string
}

export function PlaceholderImage({ width, height, text, className, alt = "Placeholder image" }: PlaceholderImageProps) {
  // Create a data URI for the SVG
  const svgContent = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="50%" fontFamily="Arial" fontSize="24" fill="#888" textAnchor="middle" dominantBaseline="middle">${text || `${width}×${height}`}</text>
    </svg>
  `

  const dataUri = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString("base64")}`

  return <Image src={dataUri || "/placeholder.svg"} width={width} height={height} alt={alt} className={className} />
}
