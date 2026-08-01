import React from "react";
import { motion } from "framer-motion";
import { Users, Calendar, Award, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LeadershipRole {
  title: string;
  organization: string;
  period: string;
  bullets: string[];
}

const roles: LeadershipRole[] = [
  {
    title: "Information Media Head of Bureau",
    organization: "Himpunan Mahasiswa Teknologi Informasi (HMTI) ITS",
    period: "Jan 2025 – Jan 2026",
    bullets: [
      "Ensured consistent brand messaging across all digital media channels.",
      "Supervised bureau team members and coordinated cross-functional project timelines.",
      "Directed the design division, managing full-spectrum digital content production.",
    ],
  },
  {
    title: "Information Media Staff",
    organization: "Himpunan Mahasiswa Teknologi Informasi (HMTI) ITS",
    period: "Jan 2024 – Jan 2025",
    bullets: [
      "Created graphic design content covering complex information technology topics.",
      "Organized educational workshops on graphic design and web development.",
      "Managed social media strategy and content publication calendar.",
    ],
  },
  {
    title: "Staff, Secretarial Division",
    organization: "Gerigi Institut Teknologi Sepuluh Nopember",
    period: "Mar 2023 – Jul 2023",
    bullets: [
      "Managed comprehensive data records for ITS new student orientation program.",
      "Ensured well-being, logistics, and safety of new students during orientation activities.",
      "Maintained accurate administrative documentation and executive reporting.",
    ],
  },
];

export const LeadershipSection: React.FC = () => {
  return (
    <section id="leadership" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-foreground mb-4">
              Leadership & <span className="text-primary">Activities</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground dark:text-gray-300 font-subtitle max-w-2xl mx-auto">
              Empowering communities, driving organization initiatives, and fostering teamwork.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <Card className="bg-card/70 dark:bg-zinc-900/80 backdrop-blur-md border border-border/60 hover:border-primary/40 rounded-3xl h-full flex flex-col p-6 shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3" />
                      {role.period}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold font-title text-foreground mb-1 leading-snug">
                  {role.title}
                </h3>
                <p className="text-sm font-subtitle text-primary mb-4 font-medium">
                  {role.organization}
                </p>

                <hr className="border-border/40 mb-4" />

                <ul className="space-y-2.5 text-xs md:text-sm text-muted-foreground dark:text-gray-300 flex-1">
                  {role.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
