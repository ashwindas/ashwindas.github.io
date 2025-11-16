import { ScrollButton } from '../components/ScrollButton'
import { EmailButton } from '../components/EmailButton'
import { LinkedInButton } from '../components/LinkedInButton'
import { FiveHundredPxButton } from '../components/FiveHundredPxButton'
import { FiveHundredPxGallery } from '../components/FiveHundredPxGallery'
import { MediaFeatures } from '../components/MediaFeatures'
import { Publications } from '../components/Publications'
import Image from 'next/image'

// Remove dynamic directive for static export compatibility
export default function Home() {
  return (
    <>
      {/* Legal Name: Ashwin Das Chikkerahally Gururaja */}
      <div className="sr-only">
        <h2>Ashwin Das Chikkerahally Gururaja</h2>
      </div>
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
                />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold text-base-content dark:text-gray-100">Ashwin Das Gururaja</h1>
            <p className="py-6 text-lg text-base-content dark:text-gray-200">Engineering Leader @ Adobe | Payments & Risk</p>
            
            {/* Action buttons */}
            <div className="flex flex-wrap justify-center items-center gap-2">
              <ScrollButton
                targetId="about"
                className="btn btn-primary min-w-[140px]"
              >
                About Me
              </ScrollButton>
              <ScrollButton
                targetId="experience"
                className="btn btn-primary min-w-[140px]"
              >
                Experience
              </ScrollButton>
              <ScrollButton
                targetId="photography"
                className="btn btn-primary min-w-[140px]"
              >
                Photography
              </ScrollButton>
              <ScrollButton
                targetId="conferences"
                className="btn btn-primary min-w-[140px]"
              >
                Conferences
              </ScrollButton>
              <ScrollButton
                targetId="publications"
                className="btn btn-primary min-w-[140px]"
              >
                Publications
              </ScrollButton>
              <ScrollButton
                targetId="hackathons"
                className="btn btn-primary min-w-[140px]"
              >
                Hackathons
              </ScrollButton>
              <ScrollButton
                targetId="media"
                className="btn btn-primary min-w-[140px]"
              >
                Media
              </ScrollButton>
              <LinkedInButton className="btn-primary !bg-[#0077B5] hover:!bg-[#0069a1] min-w-[140px]" />
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
                I&apos;m a Senior Engineering Manager at Adobe leading the Commerce - Payment & Risk platform team. With over {Math.ceil((new Date().getFullYear() - 2008) - 2)} years of experience, I specialize in building and scaling distributed systems that process billions in transactions while preventing fraud and managing risk.
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

      {/* Work & Education Section */}
      <section id="experience" className="py-12 bg-base-200 dark:bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center text-base-content dark:text-gray-100">Work & Education</h2>
          
          {/* Work Experience */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 text-center text-base-content dark:text-gray-100">Professional Experience</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-6xl mx-auto">
              {/* Adobe Senior Engineering Manager */}
              <div className="card bg-base-300 dark:bg-base-300 shadow-md hover:shadow-lg transition-shadow">
                <div className="card-body p-3">
                  <div className="flex justify-between items-start flex-wrap gap-1 sm:gap-0">
                    <div className="w-full sm:w-auto">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 relative">
                          <Image
                            src="/images/logos/adobe-icon.png"
                            alt="Adobe Logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h4 className="text-lg font-bold text-base-content dark:text-gray-100">Adobe</h4>
                      </div>
                      <h5 className="text-md font-medium text-primary">Senior Engineering Manager</h5>
                    </div>
                    <span className="badge badge-outline">2020 - Present</span>
                  </div>
                </div>
              </div>
              
              {/* Adobe Staff Engineer */}
              <div className="card bg-base-300 dark:bg-base-300 shadow-md hover:shadow-lg transition-shadow">
                <div className="card-body p-3">
                  <div className="flex justify-between items-start flex-wrap gap-1 sm:gap-0">
                    <div className="w-full sm:w-auto">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 relative">
                          <Image
                            src="/images/logos/adobe-icon.png"
                            alt="Adobe Logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h4 className="text-lg font-bold text-base-content dark:text-gray-100">Adobe</h4>
                      </div>
                      <h5 className="text-md font-medium text-primary">Senior Computer Scientist / Staff Engineer</h5>
                    </div>
                    <span className="badge badge-outline">2017 - 2020</span>
                  </div>
                </div>
              </div>
              
              {/* Adobe Computer Scientist */}
              <div className="card bg-base-300 dark:bg-base-300 shadow-md hover:shadow-lg transition-shadow">
                <div className="card-body p-3">
                  <div className="flex justify-between items-start flex-wrap gap-1 sm:gap-0">
                    <div className="w-full sm:w-auto">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 relative">
                          <Image
                            src="/images/logos/adobe-icon.png"
                            alt="Adobe Logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h4 className="text-lg font-bold text-base-content dark:text-gray-100">Adobe</h4>
                      </div>
                      <h5 className="text-md font-medium text-primary">Computer Scientist</h5>
                    </div>
                    <span className="badge badge-outline">2013 - 2017</span>
                  </div>
                </div>
              </div>
              
              {/* Nokia Role */}
              <div className="card bg-base-300 dark:bg-base-300 shadow-md hover:shadow-lg transition-shadow">
                <div className="card-body p-3">
                  <div className="flex justify-between items-start flex-wrap gap-1 sm:gap-0">
                    <div className="w-full sm:w-auto">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 relative">
                          <Image
                            src="/images/logos/nokia-logo.png"
                            alt="Nokia Logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h4 className="text-lg font-bold text-base-content dark:text-gray-100">Nokia</h4>
                      </div>
                      <h5 className="text-md font-medium text-primary">Software Engineer</h5>
                    </div>
                    <span className="badge badge-outline">2008 - 2011</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Education */}
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-center text-base-content dark:text-gray-100">Education</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-6xl mx-auto">
              <div className="card bg-base-300 dark:bg-base-300 shadow-md hover:shadow-lg transition-shadow">
                <div className="card-body p-3">
                  <div className="flex justify-between items-start flex-wrap gap-1 sm:gap-0">
                    <div className="w-full sm:w-auto">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 relative">
                          <Image
                            src="/images/logos/cmu-logo.png"
                            alt="Carnegie Mellon University Logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h4 className="text-lg font-bold text-base-content dark:text-gray-100">
                          Carnegie Mellon University
                        </h4>
                      </div>
                      <h5 className="text-md font-medium text-primary">Master of Science</h5>
                    </div>
                    <span className="badge badge-outline">2011 - 2013</span>
                  </div>
                </div>
              </div>

              {/* Bachelors Degree */}
              <div className="card bg-base-300 dark:bg-base-300 shadow-md hover:shadow-lg transition-shadow">
                <div className="card-body p-3">
                  <div className="flex justify-between items-start flex-wrap gap-1 sm:gap-0">
                    <div className="w-full sm:w-auto">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 relative">
                          <Image
                            src="/images/logos/bms-logo.png"
                            alt="B.M.S. College of Engineering Logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h4 className="text-lg font-bold text-base-content dark:text-gray-100">
                          B.M.S. College of Engineering
                        </h4>
                      </div>
                      <h5 className="text-md font-medium text-primary">B.E. in Computer Science</h5>
                    </div>
                    <span className="badge badge-outline">2004 - 2008</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features in Media Section */}
      <MediaFeatures />

      {/* Contact Section */}
      <section id="contact" className="py-12 bg-base-100 dark:bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-base-content dark:text-gray-100">Contact</h2>
          <div className="flex flex-wrap justify-center items-center gap-4 max-w-2xl mx-auto">
            <EmailButton className="btn-primary min-w-[140px]" />
            <LinkedInButton className="btn-primary !bg-[#0077B5] hover:!bg-[#0069a1] min-w-[140px]" />
            <FiveHundredPxButton className="btn-primary min-w-[140px]" />
          </div>
        </div>
      </section>

      {/* Conferences Section */}
      <section id="conferences" className="py-24 bg-base-100 dark:bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-base-content dark:text-gray-100">Conferences</h2>
          <div className="space-y-12">
          {/* Speaker Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center text-base-content dark:text-gray-100">Speaker</h3>
            <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
              <a 
                href="https://events.merchantriskcouncil.org/event/38b264d1-3a0c-49f0-bd97-1faccb84a255/speakers?session=7e830ec4-94bc-428d-af36-07d61e4f63d8"
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-base-300 dark:bg-base-300 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer overflow-hidden"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h3 className="card-title text-xl text-base-content dark:text-gray-100">MRC San Diego 2025</h3>
                    <div className="badge badge-primary">Speaker</div>
                  </div>
                  <p className="text-sm text-base-content dark:text-gray-200">
                    <span className="inline-block mr-2">📍 San Diego</span>
                  </p>
                </div>
              </a>

              <a 
                href="https://futureofconversationalai.com/FOCCAS2025.2/"
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-base-300 dark:bg-base-300 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer overflow-hidden"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h3 className="card-title text-xl text-base-content dark:text-gray-100">Future of Chatbots and Conversational AI Summit 2025</h3>
                    <div className="badge badge-primary">Speaker</div>
                  </div>
                  <p className="text-sm text-base-content dark:text-gray-200">
                    <span className="inline-block mr-2">📍 San Francisco</span>
                  </p>
                </div>
              </a>

              <a 
                href="https://www.fraud-leaderssummit.com/fls-june-2025/panel-discussion-mission-gone-60-seconds-rapid-rise-real-time-fraud"
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-base-300 dark:bg-base-300 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer overflow-hidden"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h3 className="card-title text-xl text-base-content dark:text-gray-100">Payment & Fraud Leaders Summit 2025</h3>
                    <div className="badge badge-primary">Speaker</div>
                  </div>
                  <p className="text-sm text-base-content dark:text-gray-200">
                    <span className="inline-block mr-2">📍 Miami</span>
                  </p>
                </div>
              </a>

              <a 
                href="https://events.merchantriskcouncil.org/event/e1cf4439-3cf9-43cd-9d9e-4a9c46e255c0/speakers"
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-base-300 dark:bg-base-300 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer overflow-hidden"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h3 className="card-title text-xl text-base-content dark:text-gray-100">MRC Virtual Summit: Payments Orchestration</h3>
                    <div className="badge badge-primary">Speaker</div>
                  </div>
                  <p className="text-sm text-base-content dark:text-gray-200">
                    <span className="inline-block mr-2">📍 Virtual</span>
                  </p>
                </div>
              </a>

              <a 
                href="https://groupfuturistaevent.com/FODPFM2025/#speakers"
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-base-300 dark:bg-base-300 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer overflow-hidden"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h3 className="card-title text-xl text-base-content dark:text-gray-100">Future of Digital Payment Fraud Management Summit 2025</h3>
                    <div className="badge badge-primary">Speaker</div>
                  </div>
                  <p className="text-sm text-base-content dark:text-gray-200">
                    <span className="inline-block mr-2">📍 Virtual US Edition</span>
                  </p>
                </div>
              </a>

              <a 
                href="https://www.linkedin.com/feed/update/urn:li:activity:7361882655304433665/"
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-base-300 dark:bg-base-300 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer overflow-hidden"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h3 className="card-title text-xl text-base-content dark:text-gray-100">Plug and Play - Agentic Commerce Deep Dive</h3>
                    <div className="badge badge-primary">Speaker</div>
                  </div>
                  <p className="text-sm text-base-content dark:text-gray-200">
                    <span className="inline-block mr-2">📍 Montara Beach, CA</span>
                  </p>
                </div>
              </a>

              <a 
                  href="https://scrs.in/conference/AIC2025/speaker/talk/1083"
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-base-300 dark:bg-base-300 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer overflow-hidden"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h3 className="card-title text-xl text-base-content dark:text-gray-100">IEEE World Conference on Applied Intelligence and Computing (AIC 2025)</h3>
                    <div className="badge badge-primary">Speaker</div>
                  </div>
                  <p className="text-sm text-base-content dark:text-gray-200">
                    <span className="inline-block mr-2">📍 Delhi, India</span>
                  </p>
                </div>
              </a>

              <a 
                  href="https://www.conf42.com/Observability_2025_Ashwin_Das_Gururaja_Devang_Gaur_dashboard_payment_commerce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card bg-base-300 dark:bg-base-300 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer overflow-hidden"
                >
                  <div className="card-body">
                    <div className="flex items-center justify-between">
                      <h3 className="card-title text-xl text-base-content dark:text-gray-100">Conf42 Observability 2025</h3>
                      <div className="badge badge-primary">Speaker</div>
                    </div>
                    <p className="text-sm text-base-content dark:text-gray-200">
                      <span className="inline-block mr-2">📍 Online</span>
                    </p>
                  </div>
                </a>
                
                <a 
                  href="https://scrs.in/conference/air2025/speaker/talk/1161"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card bg-base-300 dark:bg-base-300 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer overflow-hidden"
                >
                  <div className="card-body">
                    <div className="flex items-center justify-between">
                      <h3 className="card-title text-xl text-base-content dark:text-gray-100">Artificial Intelligence and Robotics (AIR 2025)</h3>
                      <div className="badge badge-primary">Speaker</div>
                    </div>
                    <p className="text-sm text-base-content dark:text-gray-200">
                      <span className="inline-block mr-2">📍 Nazarbayev University, Kazakhstan</span>
                    </p>
                  </div>
                </a>

                <a 
                  href="https://scrs.in/conference/CVR2025/speaker/talk/1099"
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-base-300 dark:bg-base-300 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer overflow-hidden"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h3 className="card-title text-xl text-base-content dark:text-gray-100">Computer Vision and Robotics (CVR 2025)</h3>
                    <div className="badge badge-primary">Speaker</div>
                  </div>
                  <p className="text-sm text-base-content dark:text-gray-200">
                    <span className="inline-block mr-2">📍 NIT Goa, India</span>
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Session Chair / Judge Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center text-base-content dark:text-gray-100">Session Chair / Judge</h3>
            <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
              <a 
                href="https://scrs.in/public/conference/bida2025"
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-base-300 dark:bg-base-300 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer overflow-hidden"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h3 className="card-title text-xl text-base-content dark:text-gray-100">Business Intelligence and Data Analytics (BIDA 2025)</h3>
                    <div className="badge badge-primary">Session Chair</div>
                  </div>
                  <p className="text-sm text-base-content dark:text-gray-200">
                    <span className="inline-block mr-2">📍 RV Institute of Management (RVIM), Bangalore, India</span>
                  </p>
                </div>
              </a>
              <a 
                href="https://scrs.in/conference/icivc2025"
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-base-300 dark:bg-base-300 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer overflow-hidden"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h3 className="card-title text-xl text-base-content dark:text-gray-100">Intelligent Vision and Computing (ICIVC 2025)</h3>
                    <div className="badge badge-primary">Session Chair</div>
                  </div>
                  <p className="text-sm text-base-content dark:text-gray-200">
                    <span className="inline-block mr-2">📍 The ICFAI University, Dehradun, India</span>
                  </p>
                </div>
              </a>
              <a 
                href="https://scrs.in/conference/iccis2025"
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-base-300 dark:bg-base-300 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer overflow-hidden"
              >
                <div className="card-body">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="card-title text-xl text-base-content dark:text-gray-100 flex-1">Communication and Intelligent Systems (ICCIS 2025)</h3>
                    <div className="badge badge-primary flex-shrink-0">Session Chair</div>
                  </div>
                  <p className="text-sm text-base-content dark:text-gray-200">
                    <span className="inline-block mr-2">📍 BITS Pilani, K K Birla Goa Campus, India</span>
                  </p>
                </div>
              </a>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <Publications />

      {/* Hackathons Section */}
      <section id="hackathons" className="py-24 bg-base-200 dark:bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-base-content dark:text-gray-100">Hackathons</h2>
          
          {/* Judge Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center text-base-content dark:text-gray-100">Judge</h3>
            <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
              <a 
                href="https://ai-verse-hackathon.vercel.app/judges.html"
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-base-300 dark:bg-base-300 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer overflow-hidden"
              >
                <figure className="relative w-full h-[120px] bg-white flex items-center justify-center">
                  <div className="relative w-[500px] h-[100px]">
                    <Image
                      src="/images/ai-verse-2.0-hackathon-banner.png"
                      alt="AI-VERSE 2.0 Hackathon Banner"
                      fill
                      className="object-contain"
                    />
                  </div>
                </figure>
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h3 className="card-title text-xl text-base-content dark:text-gray-100">AI-VERSE 2.0 - By BMS College Of Engineering</h3>
                    <div className="badge badge-primary">Judge</div>
                  </div>
                  <p className="text-sm text-base-content dark:text-gray-200">October 24 - 26, 2025</p>
                </div>
              </a>

              <a 
                href="https://ai-valley-hackathon.devpost.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-base-300 dark:bg-base-300 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer overflow-hidden"
              >
                <figure className="relative w-full h-[120px] bg-white flex items-center justify-center">
                  <div className="relative w-[500px] h-[100px]">
                    <Image
                      src="/images/cmu-2025-hackathon-banner.png"
                      alt="AI Valley Hackathon Banner"
                      fill
                      className="object-contain"
                    />
                  </div>
                </figure>
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h3 className="card-title text-xl text-base-content dark:text-gray-100">AI Valley Hackathon - By Carnegie Mellon University Students</h3>
                    <div className="badge badge-primary">Judge</div>
                  </div>
                  <p className="text-sm text-base-content dark:text-gray-200">April 19 - 20, 2025</p>
                </div>
              </a>

              <a 
                href="https://amplicode.devpost.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-base-300 dark:bg-base-300 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer overflow-hidden"
              >
                <figure className="relative w-full h-[120px] bg-white flex items-center justify-center">
                  <div className="relative w-[500px] h-[100px]">
                    <Image
                      src="/images/amplicode-2025-hackathon-banner.png"
                      alt="AmpliCode Hackathon 2025 Banner"
                      fill
                      className="object-contain"
                    />
                  </div>
                </figure>
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h3 className="card-title text-xl text-base-content dark:text-gray-100">AmpliCode Hackathon 2025</h3>
                    <div className="badge badge-primary">Judge</div>
                  </div>
                  <p className="text-sm text-base-content dark:text-gray-200">Apr 30 – May 30, 2025</p>
                </div>
              </a>

              <a 
                href="https://code-crunch-tropical-hack25.devpost.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-base-300 dark:bg-base-300 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer overflow-hidden"
              >
                <figure className="relative w-full h-[120px] bg-white flex items-center justify-center">
                  <div className="relative w-[500px] h-[100px]">
                    <Image
                      src="/images/code-crunch-305-hackathon-banner.png"
                      alt="CODE CRUNCH 305 Hackathon Banner"
                      fill
                      className="object-contain"
                    />
                  </div>
                </figure>
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h3 className="card-title text-xl text-base-content dark:text-gray-100">CODE CRUNCH 305 Hackathon</h3>
                    <div className="badge badge-primary">Judge</div>
                  </div>
                  <p className="text-sm text-base-content dark:text-gray-200">Spring 2025 Edition</p>
                </div>
              </a>
            </div>
          </div>

          {/* Winner Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center text-base-content dark:text-gray-100">Winner</h3>
            <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
              <a 
                href="https://web.archive.org/web/20161121142311/http://www.cmu.edu/silicon-valley/news-events/news/2012/paypal-hackathon.html"
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-base-300 dark:bg-base-300 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer overflow-hidden"
              >
                <figure className="relative w-full h-[120px] bg-white flex items-center justify-center">
                  <div className="relative w-[500px] h-[100px]">
                    <Image
                      src="/images/paypal-hackathon-banner.png"
                      alt="PayPal Hack-a-thon Banner"
                      fill
                      className="object-contain"
                    />
                  </div>
                </figure>
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h3 className="card-title text-xl text-base-content dark:text-gray-100">PayPal Hack-a-thon</h3>
                    <div className="badge badge-secondary">Winner</div>
                  </div>
                  <p className="text-sm text-base-content dark:text-gray-200">September 2012</p>
                </div>
              </a>
            </div>
          </div>

          {/* Placeholder for future sections */}
          <div className="space-y-12">
            {/* Additional sections will be added here */}
          </div>
        </div>
      </section>

      {/* Photography Section */}
      <section id="photography" className="py-24 bg-base-100 dark:bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-base-content dark:text-gray-100">Photography</h2>
          <div className="card bg-base-200 dark:bg-base-100 shadow-xl max-w-4xl mx-auto">
            <div className="card-body">
              <p className="text-lg mb-6 text-base-content dark:text-gray-200">
                Photography is my occasional creative outlet. Explore some of my work below:
              </p>
              <FiveHundredPxGallery 
                username="AshwinDas" 
                galleryUrl="https://500px.com/p/AshwinDas/galleries/ashwin-s-photography"
                height={600} 
              />
              <div className="flex justify-center mt-6">
                <FiveHundredPxButton />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
