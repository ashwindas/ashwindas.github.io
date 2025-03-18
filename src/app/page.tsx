import { ScrollButton } from '@/components/ScrollButton'
import { EmailButton } from '@/components/EmailButton'
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
            <div className="flex justify-center gap-4">
              <ScrollButton
                targetId="projects"
                className="btn btn-primary"
              >
                View My Work
              </ScrollButton>
              <ScrollButton
                targetId="contact"
                className="btn btn-outline"
              >
                Contact Me
              </ScrollButton>
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
                I&apos;m an Engineering Leader at Adobe specializing in Payments & Risk systems. 
                With expertise in building secure, scalable financial infrastructure, I focus on creating 
                reliable payment solutions and implementing effective risk management strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section with DaisyUI cards */}
      <section id="projects" className="py-24 bg-base-200 dark:bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="card bg-base-100 dark:bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <h3 className="card-title">Project 1</h3>
                <p>Description of your first project goes here.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">View Project</button>
                </div>
              </div>
            </div>
            
            {/* Add a second project card for better layout */}
            <div className="card bg-base-100 dark:bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <h3 className="card-title">Project 2</h3>
                <p>Description of your second project goes here.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">View Project</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section with DaisyUI elements */}
      <section id="contact" className="py-24 bg-base-100 dark:bg-base-200">
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
