import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">About Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src="/images/about-us.jpg" // Replace with your actual image path
            alt="About Us"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3">Our Story</h2>
          <p className="text-gray-700 mb-4">
            We are a team of passionate individuals dedicated to providing high-quality products and services. Our
            journey began with a simple idea: to make a difference in the world through innovation and creativity.
          </p>
          <p className="text-gray-700 mb-4">
            Over the years, we have grown and evolved, but our core values remain the same. We believe in integrity,
            collaboration, and a relentless pursuit of excellence.
          </p>
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-700">
            Our mission is to empower individuals and organizations to achieve their full potential by providing them
            with the tools and resources they need to succeed.
          </p>
        </div>
      </div>
    </div>
  )
}
