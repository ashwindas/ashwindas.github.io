'use client'

import Image from 'next/image'

interface Publication {
  id: string
  title: string
  publication: string
  description: string
  logoSrc?: string
  url?: string
  date?: string
}

interface PublicationsProps {
  publications?: Publication[]
}

const defaultPublications: Publication[] = [
  {
    id: 'mrc-nti-trace-id-2025',
    title: 'Boosting Authorization Success: A Practical Guide to Visa NTI and Mastercard Trace ID Mandates',
    publication: 'MRC Blog',
    description: 'A comprehensive guide explaining Visa Transaction Identifier (TID/NTI) and Mastercard Trace ID mandates for merchants. Covers technical specifications, implementation examples for subscription and stored-credential models, SCA compliance considerations, and strategies for ensuring compliance to improve authorization rates.',
    logoSrc: '/images/logos/mrc-logo.png',
    url: 'https://merchantriskcouncil.org/learning/resource-center/member-news/blog/2025/boosting-authorization-success-a-practical-guide-to-visa-nti-and-mastercard-trace-id-mandates',
    date: 'November 2025'
  }
]

export function Publications({ publications = defaultPublications }: PublicationsProps) {
  // Don't render the section if there are no publications
  if (publications.length === 0) {
    return null
  }

  return (
    <section id="publications" className="py-24 bg-base-100 dark:bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-base-content dark:text-gray-100">
          Publications
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {publications.map((publication) => (
            <div key={publication.id} className="card bg-base-300 dark:bg-base-300 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body p-6">
                {/* Logo and Publication */}
                <div className="flex items-center gap-3 mb-4">
                  {publication.logoSrc && (
                    <div className="w-12 h-12 relative flex-shrink-0 bg-base-100 dark:bg-base-200 rounded-lg flex items-center justify-center border">
                      <Image
                        src={publication.logoSrc}
                        alt={`${publication.publication} Logo`}
                        fill
                        className="object-contain p-1 rounded-lg"
                        onError={(e) => {
                          // Hide the image on error and show text fallback
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      {/* Text fallback for missing logos */}
                      <span className="text-xs font-bold text-center text-base-content dark:text-gray-100 leading-none">
                        {publication.publication.split(' ').map(word => word.charAt(0)).join('').slice(0, 3)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-base-content dark:text-gray-100">
                      {publication.publication}
                    </h3>
                    {publication.date && (
                      <span className="text-sm text-base-content/70 dark:text-gray-400">
                        {publication.date}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Article Title */}
                <h4 className="text-md font-semibold text-base-content dark:text-gray-100 mb-2">
                  {publication.title}
                </h4>
                
                {/* Description */}
                <p className="text-sm text-base-content dark:text-gray-200 leading-relaxed">
                  {publication.description}
                </p>
                
                {/* Read More Button */}
                {publication.url && publication.url !== '#' && (
                  <div className="card-actions justify-end mt-4">
                    <a
                      href={publication.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      Read Article
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

