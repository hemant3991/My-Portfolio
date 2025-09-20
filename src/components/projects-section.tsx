'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  Calendar,
  Code2,
  Globe,
  Smartphone,
  Database,
  Brain,
  Cloud
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface Project {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  language: string;
  topics: string[];
  category: 'Web' | 'AI' | 'Mobile' | 'Database' | 'Cloud' | 'Other';
}

const projectCategories = [
  { id: 'all', name: 'All Projects', icon: <Globe className="h-4 w-4" /> },
  { id: 'Web', name: 'Web Development', icon: <Code2 className="h-4 w-4" /> },
  { id: 'AI', name: 'AI/ML', icon: <Brain className="h-4 w-4" /> },
  { id: 'Mobile', name: 'Mobile Apps', icon: <Smartphone className="h-4 w-4" /> },
  { id: 'Database', name: 'Database', icon: <Database className="h-4 w-4" /> },
  { id: 'Cloud', name: 'Cloud/DevOps', icon: <Cloud className="h-4 w-4" /> },
];

const mockProjects: Project[] = [
  {
    id: 2,
    name: 'Next.js Portfolio Platform',
    description: 'A cutting-edge portfolio platform built with Next.js 14, featuring AI integration, 3D visualizations, and modern web technologies.',
    html_url: 'https://github.com/username/next-portfolio',
    homepage: 'https://portfolio.dev',
    stargazers_count: 189,
    forks_count: 43,
    created_at: '2024-02-20T09:15:00Z',
    updated_at: '2024-09-15T16:45:00Z',
    language: 'TypeScript',
    topics: ['nextjs', 'react', 'typescript', 'tailwindcss'],
    category: 'Web'
  },
  {
    id: 3,
    name: 'Real-time Collaboration App',
    description: 'A real-time collaborative workspace with live editing, video calls, and project management features built with React and Socket.io.',
    html_url: 'https://github.com/username/collab-app',
    homepage: 'https://collab.dev',
    stargazers_count: 156,
    forks_count: 32,
    created_at: '2024-03-10T11:30:00Z',
    updated_at: '2024-09-12T13:20:00Z',
    language: 'JavaScript',
    topics: ['react', 'socketio', 'collaboration', 'realtime'],
    category: 'Web'
  },
  {
    id: 4,
    name: 'Mobile Fitness Tracker',
    description: 'A comprehensive fitness tracking app with offline capabilities, social features, and integration with various health APIs.',
    html_url: 'https://github.com/username/fitness-app',
    stargazers_count: 134,
    forks_count: 45,
    created_at: '2024-05-12T14:20:00Z',
    updated_at: '2024-09-14T10:30:00Z',
    language: 'Dart',
    topics: ['flutter', 'firebase', 'health', 'mobile'],
    category: 'Mobile'
  },
];

export function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      'TypeScript': 'bg-blue-500',
      'JavaScript': 'bg-yellow-500',
      'Python': 'bg-green-500',
      'Go': 'bg-cyan-500',
      'Rust': 'bg-orange-500',
      'Java': 'bg-red-500',
      'C++': 'bg-purple-500',
      'HCL': 'bg-indigo-500',
      'Dart': 'bg-teal-500',
    };
    return colors[language] || 'bg-gray-500';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section ref={ref} id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient-rainbow">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A showcase of my recent work, featuring cutting-edge technologies,
            innovative solutions, and real-world applications.
          </p>
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-gradient-1 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-gradient-2 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-4 h-4 bg-gradient-3 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-4 h-4 bg-gradient-4 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
              <div className="w-4 h-4 bg-gradient-5 rounded-full animate-bounce" style={{ animationDelay: '0.8s' }}></div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {projectCategories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'gradient-rainbow text-white shadow-lg glow-primary'
                  : 'glass hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {category.icon}
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                type: 'spring',
                stiffness: 100
              }}
              whileHover={{
                y: -10,
                scale: 1.02,
                rotateX: 5,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              <div className="relative bg-card border border-white/10 rounded-xl p-6 h-full overflow-hidden glass hover:bg-white/5 transition-all duration-500">
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Animated border */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-30 transition-opacity duration-500 p-[1px]">
                  <div className="w-full h-full bg-card rounded-xl" />
                </div>

                {/* Project Header */}
                <div className="relative flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-3 h-3 rounded-full bg-green-400 animate-pulse"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <h3 className="text-xl font-semibold group-hover:text-gradient-rainbow transition-all duration-300">
                      {project.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.a
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-white transition-all duration-300 p-2 rounded-lg glass hover:bg-white/10 glow-primary"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="h-5 w-5" />
                    </motion.a>
                    {project.homepage && (
                      <motion.a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-white transition-all duration-300 p-2 rounded-lg glass hover:bg-white/10 glow-secondary"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="h-5 w-5" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4 leading-relaxed relative z-10">
                  {project.description}
                </p>

                {/* Topics/Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.topics.slice(0, 4).map((topic) => (
                    <motion.span
                      key={topic}
                      className="px-3 py-1 text-xs bg-gradient-to-r from-primary/20 to-secondary/20 text-white rounded-full border border-white/10"
                      whileHover={{ scale: 1.05 }}
                    >
                      {topic}
                    </motion.span>
                  ))}
                  {project.topics.length > 4 && (
                    <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                      +{project.topics.length - 4}
                    </span>
                  )}
                </div>

                {/* Language and Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getLanguageColor(project.language)} animate-pulse`} />
                    <span className="text-sm font-medium text-gradient">{project.language}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <motion.div
                      className="flex items-center gap-1 hover:text-yellow-400 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Star className="h-4 w-4" />
                      {project.stargazers_count}
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <GitFork className="h-4 w-4" />
                      {project.forks_count}
                    </motion.div>
                  </div>
                </div>

                {/* Dates */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Created {formatDate(project.created_at)}</span>
                  </div>
                  <div>
                    Updated {formatDate(project.updated_at)}
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Want to see more of my work?
          </p>
          <motion.a
            href="https://github.com/hemant3991"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 gradient-rainbow text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg glow-primary hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Github className="h-6 w-6" />
            </motion.div>
            <span>View GitHub Profile</span>
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
