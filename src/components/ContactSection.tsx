import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin } from 'lucide-react';

const ContactSection: React.FC = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:your.email@example.com';
  };

  const handleGithubClick = () => {
    window.open('https://github.com/yourusername', '_blank');
  };

  const handleLinkedinClick = () => {
    window.open('https://linkedin.com/in/yourprofile', '_blank');
  };

  return (
    <section id="contact" className="section-padding bg-surface/30">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground font-subtitle">
            Ready to bring your ideas to life with innovative technology solutions
          </p>
        </div>
        
        <div className="card-portfolio p-8 md:p-12 rounded-2xl text-center animate-fade-in-up">
          <p className="text-lg mb-8 text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            I'm always interested in discussing new opportunities, innovative projects, 
            and collaborations. Whether you have a specific project in mind or just want 
            to connect, I'd love to hear from you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={handleEmailClick}
              className="btn-hero px-8 py-4 text-lg font-medium rounded-xl flex items-center gap-3"
              size="lg"
            >
              <Mail className="w-5 h-5" />
              Send Email
            </Button>
          </div>
          
          <div className="flex justify-center space-x-6">
            <button 
              onClick={handleGithubClick}
              className="p-4 rounded-full bg-surface hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
              aria-label="GitHub Profile"
            >
              <Github className="w-6 h-6" />
            </button>
            
            <button 
              onClick={handleLinkedinClick}
              className="p-4 rounded-full bg-surface hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="font-subtitle text-sm text-muted-foreground">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;