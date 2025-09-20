'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Text, Html } from '@react-three/drei';
import { useRef, useState, useMemo } from 'react';
import {
  Globe,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  ExternalLink,
  Play,
  Pause,
  RotateCw
} from 'lucide-react';
import * as THREE from 'three';

interface CareerEvent {
  id: number;
  title: string;
  description: string;
  type: 'work' | 'education' | 'achievement' | 'project';
  location: {
    name: string;
    coordinates: [number, number]; // [latitude, longitude]
    country: string;
  };
  date: string;
  duration?: string;
  technologies?: string[];
  achievements?: string[];
  url?: string;
  icon: React.ReactNode;
  color: string;
}

const careerEvents: CareerEvent[] = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    description: "Led development of React/Next.js applications serving 100K+ users",
    type: "work",
    location: {
      name: "San Francisco, CA",
      coordinates: [37.7749, -122.4194],
      country: "USA"
    },
    date: "2024",
    duration: "Current",
    technologies: ["React", "Next.js", "TypeScript", "Node.js"],
    achievements: ["Improved performance by 40%", "Led team of 5 developers"],
    icon: <Briefcase className="h-4 w-4" />,
    color: "#3b82f6"
  },
  {
    id: 2,
    title: "Computer Science Degree",
    description: "Bachelor of Science in Computer Science",
    type: "education",
    location: {
      name: "Berkeley, CA",
      coordinates: [37.8715, -122.2730],
      country: "USA"
    },
    date: "2020",
    duration: "4 years",
    achievements: ["Dean's List", "CS Club President"],
    icon: <GraduationCap className="h-4 w-4" />,
    color: "#10b981"
  },
  {
    id: 3,
    title: "AI Code Review Assistant",
    description: "Built ML-powered code review tool used by 500+ developers",
    type: "project",
    location: {
      name: "Remote",
      coordinates: [37.7749, -122.4194],
      country: "Global"
    },
    date: "2023",
    technologies: ["Python", "TensorFlow", "React"],
    achievements: ["Reduced code review time by 60%", "Won Global AI Hackathon"],
    url: "https://ai-code-review.dev",
    icon: <Award className="h-4 w-4" />,
    color: "#f59e0b"
  },
  {
    id: 4,
    title: "Startup Full Stack Developer",
    description: "Developed real-time collaboration platform",
    type: "work",
    location: {
      name: "Remote",
      coordinates: [40.7128, -74.0060],
      country: "USA"
    },
    date: "2021",
    duration: "1.5 years",
    technologies: ["React", "Socket.io", "PostgreSQL"],
    achievements: ["Built platform for 1000+ users", "Implemented real-time features"],
    icon: <Briefcase className="h-4 w-4" />,
    color: "#3b82f6"
  }
];

function CareerGlobe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<CareerEvent | null>(null);

  useFrame((state) => {
    if (globeRef.current && isRotating) {
      globeRef.current.rotation.y += 0.005;
    }
  });

  const eventsOnGlobe = useMemo(() => {
    return careerEvents.map((event, index) => {
      const phi = (90 - event.location.coordinates[0]) * (Math.PI / 180);
      const theta = (event.location.coordinates[1] + 180) * (Math.PI / 180);

      const x = -(Math.sin(phi) * Math.cos(theta));
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);

      const radius = 2.2;
      const position: [number, number, number] = [
        x * radius,
        y * radius,
        z * radius
      ];

      return {
        ...event,
        position,
        angle: index * (360 / careerEvents.length)
      };
    });
  }, []);

  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };

  return (
    <>
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        zoomSpeed={0.6}
        panSpeed={0.5}
        rotateSpeed={0.4}
      />

      {/* Main Globe */}
      <Sphere ref={globeRef} args={[2, 64, 32]}>
        <meshPhongMaterial
          color="#1e40af"
          transparent
          opacity={0.8}
          wireframe={false}
        />
      </Sphere>

      {/* Globe Wireframe */}
      <Sphere args={[2, 64, 32]}>
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.1}
          wireframe={true}
        />
      </Sphere>

      {/* Career Event Markers */}
      {eventsOnGlobe.map((event) => (
        <group key={event.id}>
          {/* Event Marker */}
          <mesh position={event.position}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color={event.color} />
          </mesh>

          {/* Event Label */}
          <Html position={event.position} center>
            <div className="bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none">
              {event.location.name}
            </div>
          </Html>
        </group>
      ))}

      {/* Rotation Control */}
      <Html position={[0, -3, 0]}>
        <button
          onClick={toggleRotation}
          className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          {isRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isRotating ? 'Pause' : 'Play'} Rotation
        </button>
      </Html>
    </>
  );
}

function EventCard({ event, onClose }: { event: CareerEvent; onClose: () => void }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString + '-01').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-card border border-border rounded-lg p-6 max-w-md shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white`} style={{ backgroundColor: event.color }}>
            {event.icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{event.title}</h3>
            <p className="text-sm text-muted-foreground">{event.location.name}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          ×
        </button>
      </div>

      <p className="text-muted-foreground mb-4 leading-relaxed">
        {event.description}
      </p>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(event.date)}</span>
          {event.duration && (
            <span className="text-primary">• {event.duration}</span>
          )}
        </div>

        {event.technologies && (
          <div>
            <div className="text-sm font-medium mb-2">Technologies:</div>
            <div className="flex flex-wrap gap-2">
              {event.technologies.map((tech) => (
                <span key={tech} className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {event.achievements && (
          <div>
            <div className="text-sm font-medium mb-2">Key Achievements:</div>
            <ul className="text-sm text-muted-foreground space-y-1">
              {event.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}

        {event.url && (
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
          >
            <ExternalLink className="h-3 w-3" />
            View Project
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function CareerGlobeSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedEvent, setSelectedEvent] = useState<CareerEvent | null>(null);

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Career Journey</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            An interactive 3D globe showcasing my professional journey,
            key projects, and career milestones across different locations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-card border border-border rounded-lg p-4 h-96 relative">
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <CareerGlobe />
              </Canvas>
              <div className="absolute top-4 right-4 bg-muted/80 backdrop-blur-sm rounded-lg p-2">
                <Globe className="h-5 w-5 text-primary" />
              </div>
            </div>
          </motion.div>

          {/* Event Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold">Career Timeline</h3>

            <div className="space-y-4 max-h-80 overflow-y-auto">
              {careerEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div
                    onClick={() => setSelectedEvent(event)}
                    className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0`} style={{ backgroundColor: event.color }}>
                        {event.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{event.title}</div>
                        <div className="text-xs text-muted-foreground">{event.location.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(event.date + '-01').getFullYear()}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {event.type}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Legend */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="text-sm font-semibold mb-3">Legend</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Work Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Education</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>Achievements</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Selected Event Details */}
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <EventCard event={selectedEvent} onClose={() => setSelectedEvent(null)} />
          </motion.div>
        )}

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: '5+', label: 'Years Experience', icon: <Briefcase className="h-6 w-6" /> },
            { number: '50+', label: 'Projects Completed', icon: <Globe className="h-6 w-6" /> },
            { number: '3', label: 'Countries Worked', icon: <MapPin className="h-6 w-6" /> },
            { number: '15+', label: 'Technologies', icon: <Award className="h-6 w-6" /> },
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
