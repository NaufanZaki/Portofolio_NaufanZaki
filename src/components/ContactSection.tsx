import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Github, Linkedin, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ContactSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleGithubClick = () => {
    window.open('https://github.com/yourusername', '_blank');
  };

  const handleLinkedinClick = () => {
    window.open('https://linkedin.com/in/yourprofile', '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    toast.success("Message sent successfully!", {
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section-padding bg-surface/30 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground dark:text-white">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground dark:text-gray-300 font-subtitle">
            Ready to bring your ideas to life with innovative technology solutions
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info & Socials */}
          <div className="space-y-8">
            <div className="bg-surface dark:bg-gray-800 p-8 rounded-2xl border border-border-soft">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Get in Touch</h3>
              <p className="text-muted-foreground dark:text-gray-300 leading-relaxed mb-8">
                I'm always interested in discussing new opportunities, innovative projects, 
                and collaborations. Whether you have a specific project in mind or just want 
                to connect, I'd love to hear from you.
              </p>
              
              <div className="flex flex-col gap-4">
                <a 
                  href="mailto:your.email@example.com" 
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface-elevated hover:bg-primary/10 hover:text-primary transition-all group"
                >
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-medium">your.email@example.com</span>
                </a>
              </div>
            </div>

            <div className="flex gap-4 justify-center md:justify-start">
              <button 
                onClick={handleGithubClick}
                className="p-4 rounded-full bg-surface dark:bg-gray-800 border border-border-soft hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group shadow-sm hover:shadow-md"
                aria-label="GitHub Profile"
              >
                <Github className="w-6 h-6" />
              </button>
              
              <button 
                onClick={handleLinkedinClick}
                className="p-4 rounded-full bg-surface dark:bg-gray-800 border border-border-soft hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group shadow-sm hover:shadow-md"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-border-soft">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-surface-elevated border-border-soft focus:border-primary"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-surface-elevated border-border-soft focus:border-primary"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-[150px] bg-surface-elevated border-border-soft focus:border-primary resize-none"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium btn-hero"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <p className="font-subtitle text-sm text-muted-foreground dark:text-gray-400">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;