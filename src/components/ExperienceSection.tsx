import React from 'react';

interface ExperienceItem {
  role: string;
  organization: string;
  duration: string;
  details: string;
}

const experiences: ExperienceItem[] = [
  {
    role: "Web Developer Intern",
    organization: "PT INKA (Persero)",
    duration: "Jan 2025 - Apr 2025",
    details: "Developed a legal workflow dashboard utilizing Strapi headless CMS and ReactJS."
  },
  {
    role: "Lecturer Assistant, Web Programming",
    organization: "Institut Teknologi Sepuluh Nopember",
    duration: "Aug 2024 - Nov 2024",
    details: "Developed course materials for HTML, CSS, Javascript, Express JS, MongoDB, and Nuxt.js."
  },
  {
    role: "Lecturer Assistant, Data Structures",
    organization: "Institut Teknologi Sepuluh Nopember",
    duration: "Feb 2024 - May 2024",
    details: "Created programming exercises using the HackerRank platform."
  }
];

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="section-padding bg-surface/30">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Professional Experience
          </h2>
          <p className="text-lg text-muted-foreground font-subtitle">
            Building expertise through hands-on experience
          </p>
        </div>
        
        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <div 
              key={index}
              className="timeline-item animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="card-portfolio p-8 rounded-2xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-primary mb-2 md:mb-0">
                    {experience.role}
                  </h3>
                  <span className="font-subtitle text-sm text-muted-foreground bg-surface px-3 py-1 rounded-full">
                    {experience.duration}
                  </span>
                </div>
                
                <h4 className="text-lg font-semibold text-secondary mb-4">
                  {experience.organization}
                </h4>
                
                <p className="text-muted-foreground leading-relaxed">
                  {experience.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;