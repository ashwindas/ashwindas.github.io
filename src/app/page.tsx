import { ScrollButton } from '@/components/ScrollButton'
import { EmailButton } from '@/components/EmailButton'
import { LinkedInButton } from '@/components/LinkedInButton'
import { FiveHundredPxButton } from '@/components/FiveHundredPxButton'
import Image from 'next/image'

// Remove dynamic directive for static export compatibility
export default function Home() {
  return (
    <>
      {/* Hero Section with DaisyUI styling */}
      <section id="home" className="hero min-h-screen bg-base-200 dark:bg-base-100 pt-24">
        <div className="hero-content text-center">
          <div className="max-w-md">
            {/* Profile image with DaisyUI avatar */}
            <div className="avatar mb-5">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto overflow-hidden">
                <Image
                  src="/images/headshot.jpg"
                  alt="Ashwin Das Gururaja"
                  width={128}
                  height={128}
                  priority
                />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold text-base-content dark:text-gray-100">Ashwin Das Gururaja</h1>
            <p className="py-6 text-lg text-base-content dark:text-gray-200">Engineering Leader @ Adobe | Payments & Risk</p>
            
            {/* Action buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              <ScrollButton
                targetId="about"
                className="btn btn-primary"
              >
                About Me
              </ScrollButton>
              <ScrollButton
                targetId="photography"
                className="btn btn-primary"
              >
                Photography
              </ScrollButton>
              <LinkedInButton />
            </div>
          </div>
        </div>
      </section>

      {/* About Section with DaisyUI card */}
      <section id="about" className="py-24 bg-base-100 dark:bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-base-content dark:text-gray-100">About Me</h2>
          <div className="card bg-base-200 dark:bg-base-100 shadow-xl max-w-4xl mx-auto">
            <div className="card-body">
              <p className="text-lg text-base-content dark:text-gray-200">
                I&apos;m a Senior Engineering Manager at Adobe leading the Payments, Risk, and Intelligence team. With over 15 years of experience, I specialize in building and scaling distributed systems that process billions in transactions while preventing fraud and managing risk.
              </p>
              <p className="text-lg mt-4 text-base-content dark:text-gray-200">
                My expertise spans engineering leadership, building high-performing teams, and driving technical excellence. I&apos;ve partnered with product teams to develop innovative solutions that accelerate revenue growth by supporting new business models. My leadership philosophy centers on empowering engineers through mentorship while maintaining rigorous technical standards, resulting in high-performance teams.
              </p>
              <p className="text-lg mt-4 text-base-content dark:text-gray-200">
                Outside of work, I&apos;m a proud father to a 3-year-old son and 1-year-old daughter. I enjoy listening to podcasts, reading non-fiction books, and taking occasional hikes to disconnect and recharge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Photography Section */}
      <section id="photography" className="py-24 bg-base-100 dark:bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-base-content dark:text-gray-100">Photography</h2>
          <div className="card bg-base-200 dark:bg-base-100 shadow-xl max-w-4xl mx-auto">
            <div className="card-body text-center">
              <p className="text-lg mb-6 text-base-content dark:text-gray-200">
                Photography is my occasional creative outlet. View my portfolio on 500px:
              </p>
              <div className="flex justify-center">
                <FiveHundredPxButton />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section with DaisyUI elements */}
      <section id="contact" className="py-24 bg-base-200 dark:bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-base-content dark:text-gray-100">Get In Touch</h2>
          <div className="card bg-base-200 dark:bg-base-100 shadow-xl max-w-md mx-auto">
            <div className="card-body">
              <p className="text-lg mb-6 text-center text-base-content dark:text-gray-200">
                Feel free to reach out through LinkedIn or email:
              </p>
              <div className="flex justify-center space-x-4">
                <LinkedInButton />
                <EmailButton />
              </div>
              <p className="mt-6 text-sm text-center opacity-75 text-base-content dark:text-gray-300">
                I&apos;ll respond to professional inquiries as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
