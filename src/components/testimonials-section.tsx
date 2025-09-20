'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Star,
  Quote,
  Trophy,
  Award,
  Calendar,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Users,
  Target,
  Zap,
  Heart
} from 'lucide-react';
import { useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
  project: string;
  date: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  type: 'hackathon' | 'certification' | 'award' | 'recognition';
  date: string;
  issuer?: string;
  credentialId?: string;
  url?: string;
  icon: React.ReactNode;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Product Manager",
    company: "TechStartup Inc.",
    image: "/api/placeholder/64/64",
    content: "Hemant delivered a high-quality mobile app for our client on time and with outstanding features.",
    rating: 5,
    project: "Customer Dashboard Redesign",
    date: "2024-03"
  },
  {
    id: 2,
    name: "Anjali Mehta",
    role: "CTO",
    company: "InnovateLabs",
    image: "/api/placeholder/64/64",
    content: "Very professional and knowledgeable in React Native and Firebase. Great experience working with him!",
    rating: 5,
    project: "Web Application Creation",
    date: "2024-01"
  }
];

const achievements: Achievement[] = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect - Professional",
    description: "Demonstrated expertise in designing distributed systems on AWS platform",
    type: "certification",
    date: "2024-02",
    issuer: "Amazon Web Services",
    credentialId: "AWS-SAA-PRO-123456",
    icon: <Award className="h-6 w-6" />
  },
  {
    id: 2,
    title: "Google Cloud Professional Developer",
    description: "Certified in Google Cloud development and deployment best practices",
    type: "certification",
    date: "2023-10",
    issuer: "Google Cloud",
    credentialId: "GCP-PD-789012",
    icon: <Award className="h-6 w-6" />
  },
  {
    id: 3,
    title: "Tech Innovator Award",
    description: "Awarded for innovative solution in machine learning applications",
    type: "award",
    date: "2023-06",
    issuer: "Tech Innovation Society",
    icon: <Zap className="h-6 w-6" />
  },
];

const getAchievementTypeColor = (type: string) => {
  switch (type) {
    case 'certification': return 'bg-blue-500';
    case 'hackathon': return 'bg-green-500';
    case 'award': return 'bg-purple-500';
    case 'recognition': return 'bg-orange-500';
    default: return 'bg-gray-500';
  }
};

const getAchievementTypeName = (type: string) => {
  switch (type) {
    case 'certification': return 'Certification';
    case 'hackathon': return 'Hackathon';
    case 'award': return 'Award';
    case 'recognition': return 'Recognition';
    default: return 'Achievement';
  }
};

export function TestimonialsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString + '-01').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <section ref={ref} id="testimonials" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Testimonials & Achievements</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Recognition from clients, colleagues, and the tech community.
            Awards, certifications, and successful project outcomes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Testimonials Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Client Testimonials
            </h3>

            <div className="relative group cursor-pointer">
              <div className="bg-card border border-border rounded-lg p-6 group-hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{testimonials[currentTestimonial].name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <Quote className="h-8 w-8 text-primary/20 mb-4" />

                <p className="text-muted-foreground leading-relaxed mb-4">
                  &ldquo;{testimonials[currentTestimonial].content}&rdquo;
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>
                    <strong>Project:</strong> {testimonials[currentTestimonial].project}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(testimonials[currentTestimonial].date)}
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-card border border-border rounded-full p-2 hover:bg-muted transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-card border border-border rounded-full p-2 hover:bg-muted transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <ChevronRight className={`h-4 w-4 transition-all duration-300 ${isAnimating ? 'text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text' : 'text-muted-foreground'}`} />
              </button>

              {/* Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 cursor-pointer ${
                      index === currentTestimonial ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Achievements Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Achievements & Certifications
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${getAchievementTypeColor(achievement.type)}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold group-hover:text-primary transition-colors">
                            {achievement.title}
                          </h4>
                          {achievement.url && (
                            <a
                              href={achievement.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {achievement.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className={`px-2 py-1 rounded-full text-white ${getAchievementTypeColor(achievement.type)}`}>
                            {getAchievementTypeName(achievement.type)}
                          </span>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(achievement.date)}
                          </div>
                        </div>
                        {achievement.issuer && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Issued by {achievement.issuer}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '5+', label: 'Happy Clients', icon: <Users className="h-6 w-6" /> },
            { number: '100%', label: 'Client Satisfaction', icon: <Star className="h-6 w-6" /> },
            { number: '15+', label: 'Certifications', icon: <Award className="h-6 w-6" /> },
            { number: '1', label: 'Hackathon Wins', icon: <Trophy className="h-6 w-6" /> },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
                {stat.icon}
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
