import { ScrollButton } from '@/components/ScrollButton'
import { EmailButton } from '@/components/EmailButton'
import { LinkedInButton } from '@/components/LinkedInButton'
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
            <div className="avatar mb-8">
              <div className="w-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto">
                <Image
                  src="/images/headshot.jpg"
                  alt="Ashwin Das Gururaja"
                  width={200}
                  height={200}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold">Ashwin Das Gururaja</h1>
            <p className="py-6 text-lg">Engineering Leader @ Adobe | Payments & Risk</p>
            
            {/* Action buttons */}
            <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
              <ScrollButton
                targetId="about"
                className="btn btn-sm btn-primary px-4"
              >
                About Me
              </ScrollButton>
              <ScrollButton
                targetId="photography"
                className="btn btn-sm btn-primary px-4"
              >
                Photography
              </ScrollButton>
              <ScrollButton
                targetId="contact"
                className="btn btn-sm btn-outline px-4"
              >
                Contact Me
              </ScrollButton>
              <LinkedInButton />
            </div>
          </div>
        </div>
      </section>

      {/* About Section with DaisyUI card */}
      <section id="about" className="py-24 bg-base-100 dark:bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <div className="card bg-base-200 dark:bg-base-100 shadow-xl max-w-4xl mx-auto">
            <div className="card-body">
              <p className="text-lg">
                Hi, I&apos;m Ashwin Das Gururaja, a Senior Engineering Manager at Adobe with over 15 years of experience driving technical excellence. My expertise spans building and scaling distributed systems, web application development, designing data-intensive applications that process millions of transactions daily, and implementing microservices architectures. I&apos;ve successfully applied AI solutions to real-world challenges, resulting in measurable efficiency gains across multiple production workflows.
              </p>
              <p className="text-lg mt-4">
                I&apos;ve led globally distributed teams, architecting cloud-based solutions that have achieved 99.99% uptime while reducing operational costs. I&apos;ve driven high-impact innovations across Commerce Platform, Payments and Risk, Subscription Lifecycle, and Digital Publishing domains—translating complex business requirements into elegant technical solutions that have accelerated revenue growth by supporting new business models. My leadership philosophy centers on empowering engineers through mentorship while maintaining rigorous technical standards, resulting in high-performance teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Photography Section */}
      <section id="photography" className="py-24 bg-base-100 dark:bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Photography</h2>
          <div className="card bg-base-200 dark:bg-base-100 shadow-xl max-w-4xl mx-auto">
            <div className="card-body text-center">
              <p className="text-lg mb-6">
                I enjoy capturing moments through photography. Check out my portfolio on 500px:
              </p>
              <div className="flex justify-center">
                <a 
                  href="https://500px.com/p/AshwinDas" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                >
                  View My Photos
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section with DaisyUI elements */}
      <section id="contact" className="py-24 bg-base-200 dark:bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
          <div className="card bg-base-200 dark:bg-base-100 shadow-xl max-w-md mx-auto">
            <div className="card-body">
              <p className="text-lg mb-6 text-center">
                I&apos;m always open to new opportunities and collaborations.
              </p>
              <div className="form-control">
                <EmailButton />
              </div>
              <p className="mt-6 text-sm text-center opacity-75">
                By contacting me, you agree to my <a href="/privacy.html" className="link link-hover link-primary">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
