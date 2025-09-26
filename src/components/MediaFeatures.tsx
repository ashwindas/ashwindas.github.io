'use client'

import Image from 'next/image'

interface MediaFeature {
  id: string
  title: string
  publication: string
  description: string
  logoSrc: string
  url?: string
  date?: string
}

interface MediaFeaturesProps {
  features?: MediaFeature[]
}

const defaultFeatures: MediaFeature[] = [
  {
    id: 'leaddev-1',
    title: 'Why companies are really going AI-first',
    publication: 'LeadDev',
    description: "Featured insights on AI-first hiring trends, significant productivity gains from AI tools, and the transformative opportunities for engineers who embrace AI to achieve significant performance improvements.",
    logoSrc: '/images/logos/leaddev-logo.png',
    url: 'https://leaddev.com/hiring/whats-really-behind-drive-first',
    date: ''
  },
  {
    id: 'zdnet-1',
    title: 'AI agents make great teammates, but don\'t let them code alone - here\'s why',
    publication: 'ZDNET',
    description: "Shared insights on AI agents in software development, discussing how they accelerate development cycles while emphasizing the continued need for skilled engineers to verify and refine AI output.",
    logoSrc: '/images/logos/zdnet-logo.png',
    url: 'https://www.zdnet.com/article/ai-agents-make-great-teammates-but-dont-let-them-code-alone-heres-why/',
    date: ''
  },
  {
    id: 'leaddev-2',
    title: 'Why leaders trust AI more than their colleagues',
    publication: 'LeadDev',
    description: "Discussed how engineering leaders are using AI as strategic advisors for roadmap planning, performance evaluations.",
    logoSrc: '/images/logos/leaddev-logo.png',
    url: 'https://leaddev.com/leadership/why-leaders-trust-ai-more-than-their-colleagues',
    date: ''
  },
  {
    id: 'saipien-1',
    title: 'AI Agents as Smart Assistants: Boosting Business Automation with Human Oversight',
    publication: 'saipien',
    description: "Featured insights on AI agents as collaborative teammates, emphasizing their role as co-pilots that speed up processes while requiring human oversight for complex tasks and strategic planning.",
    logoSrc: 'https://saipien.org/favicon.ico',
    url: 'https://saipien.org/ai-agents-as-smart-assistants-boosting-business-automation-with-human-oversight/',
    date: ''
  }
]

export function MediaFeatures({ features = defaultFeatures }: MediaFeaturesProps) {
  return (
    <section id="media" className="py-24 bg-base-200 dark:bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-base-content dark:text-gray-100">
          Features in Media
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature) => (
            <div key={feature.id} className="card bg-base-300 dark:bg-base-300 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body p-6">
                {/* Logo and Publication */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 relative flex-shrink-0 bg-base-100 dark:bg-base-200 rounded-lg flex items-center justify-center border">
                    <Image
                      src={feature.logoSrc}
                      alt={`${feature.publication} Logo`}
                      fill
                      className="object-contain p-1 rounded-lg"
                      onError={(e) => {
                        // Hide the image on error and show text fallback
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                    {/* Text fallback for missing logos */}
                    <span className="text-xs font-bold text-center text-base-content dark:text-gray-100 leading-none">
                      {feature.publication.split(' ').map(word => word.charAt(0)).join('').slice(0, 3)}
                    </span>
                  </div>
                                     <div>
                     <h3 className="text-lg font-bold text-base-content dark:text-gray-100">
                       {feature.publication}
                     </h3>
                     {feature.date && (
                       <span className="text-sm text-base-content/70 dark:text-gray-400">
                         {feature.date}
                       </span>
                     )}
                   </div>
                </div>
                
                {/* Description */}
                <p className="text-sm text-base-content dark:text-gray-200 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Read More Button */}
                {feature.url && feature.url !== '#' && (
                  <div className="card-actions justify-end mt-4">
                    <a
                      href={feature.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      Read More
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 