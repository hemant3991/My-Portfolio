'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Code2,
  Database,
  Cloud,
  Smartphone,
  Palette,
  Brain,
  Server,
  Globe,
  GitBranch,
  Shield,
  Zap,
  Users
} from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  category: string;
}

const skills: Skill[] = [
  { name: 'C++', level: 95, icon: <Code2 className="h-6 w-6" />, category: 'Primary Language' },
  { name: 'React/Next.js', level: 95, icon: <Code2 className="h-6 w-6" />, category: 'Frontend' },
  { name: 'TypeScript', level: 90, icon: <Code2 className="h-6 w-6" />, category: 'Frontend' },
  { name: 'Node.js', level: 88, icon: <Server className="h-6 w-6" />, category: 'Backend' },
  { name: 'Python', level: 50, icon: <Code2 className="h-6 w-6" />, category: 'Backend' },
  { name: 'MongoDB', level: 80, icon: <Database className="h-6 w-6" />, category: 'Database' },
  { name: 'AWS', level: 85, icon: <Cloud className="h-6 w-6" />, category: 'Cloud' },
  { name: 'Docker', level: 83, icon: <Server className="h-6 w-6" />, category: 'DevOps' },
  { name: 'React Native', level: 78, icon: <Smartphone className="h-6 w-6" />, category: 'Mobile' },
  { name: 'UI/UX Design', level: 75, icon: <Palette className="h-6 w-6" />, category: 'Design' },
  { name: 'Git', level: 90, icon: <GitBranch className="h-6 w-6" />, category: 'DevOps' },
  { name: 'Team Leadership', level: 85, icon: <Users className="h-6 w-6" />, category: 'Soft Skills' },
];

const categories = [...new Set(skills.map(skill => skill.category))];

export function SkillsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} id="skills" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and competencies,
            built over years of hands-on experience in software development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-8">Technical Skills</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-primary group-hover:scale-110 transition-transform duration-200">
                        {skill.icon}
                      </div>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
                      className="h-full gradient-rainbow rounded-full relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/30 animate-pulse" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Categories & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Skill Categories */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gradient">Expertise Areas</h3>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass border border-white/10 rounded-xl p-4 text-center hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 glow-primary"
                  >
                    <div className="text-2xl font-bold text-gradient-rainbow mb-1">
                      {skills.filter(skill => skill.category === category).length}
                    </div>
                    <div className="text-sm text-muted-foreground">{category}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Experience Stats */}
            <div className="animated-gradient p-6 rounded-xl glow-primary">
              <h3 className="text-xl font-semibold mb-4 text-white">Experience Highlights</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Years of Experience</span>
                  <span className="text-2xl font-bold text-white">5+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Projects Completed</span>
                  <span className="text-2xl font-bold text-white">50+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Technologies Mastered</span>
                  <span className="text-2xl font-bold text-white">16</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Client Satisfaction</span>
                  <span className="text-2xl font-bold text-white">100%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Want to see these skills in action?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="btn-vibrant px-8 py-3 rounded-lg font-semibold glow-primary"
            >
              View My Projects
            </a>
            <a
              href="#contact"
              className="glass px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-md border border-white/20"
            >
              Let's Work Together
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
