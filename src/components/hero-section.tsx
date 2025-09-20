'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, Download } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ThemeToggle } from './theme-toggle';

// Simple Animated Name Component
function AnimatedName() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="text-gradient-rainbow font-extrabold">Hemant</span>;
  }

  return (
    <div className="relative inline-block">
      <motion.span
        className="text-gradient-rainbow font-extrabold"
        animate={{
          opacity: [1, 0, 1],
          scale: [1, 1.1, 1],
          color: [
            '#ff6b6b',
            '#4ecdc4',
            '#45b7d1',
            '#96ceb4',
            '#feca57',
            '#ff9ff3',
            '#54a0ff'
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          textShadow: '0 0 20px rgba(255, 107, 107, 0.5)',
        }}
      >
        Hemant Ahire
      </motion.span>

      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 text-gradient-rainbow font-extrabold opacity-30"
        animate={{
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          filter: 'blur(10px)',
        }}
      >
        Hemant
      </motion.div>
    </div>
  );
}

// Client-side only particles component
function Particles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: 50 + (i * 2) % 100, // Deterministic positioning
    y: 20 + (i * 3) % 80,
    duration: 3 + (i % 3),
    delay: (i * 0.1) % 2,
  }));

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </>
  );
}

export function HeroSection() {
  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      <div className="absolute inset-0 gradient-rainbow opacity-5" />

      {/* Floating Particles - Client-side only */}
      <Particles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4">
              Hi, I&apos;m{' '}
              <AnimatedName />
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-light">
              Full Stack Developer & AI Enthusiast
            </p>
          </motion.div>

          {/* Subtitle with enhanced styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            &ldquo;I build scalable, high-performance applications by combining modern web technologies, cloud computing, and artificial
            intelligence. Passionate about solving real-world problems through software innovation.&rdquo;
            </p>
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-gradient-1 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-gradient-2 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-gradient-3 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <div className="w-3 h-3 bg-gradient-4 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                <div className="w-3 h-3 bg-gradient-5 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link
              href="#projects"
              className="btn-vibrant px-8 py-4 rounded-lg text-lg font-semibold shadow-lg glow-primary"
            >
              View My Work
            </Link>
            <Link
              href="#contact"
              className="glass px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-md border border-white/20"
            >
              Get In Touch
            </Link>
            <a href="/resume.pdf" download="Hemant_Ahire_Resume.pdf" className="gradient-secondary px-6 py-4 rounded-lg text-lg font-semibold text-white shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 glow-secondary">
              <Download className="h-5 w-5" />
              Download Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center items-center space-x-4 mb-12"
          >
            {/* Theme Toggle */}
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">Theme:</span>
              <ThemeToggle />
            </div>

            <div className="h-8 w-px bg-white/20 mx-4"></div>

            <a
              href="https://github.com/hemant3991"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-all duration-300 p-2 rounded-lg glass hover:bg-white/10 glow-primary"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/hemant-ahire-5a6505250/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-all duration-300 p-2 rounded-lg glass hover:bg-white/10 glow-secondary"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:hemantahire3991@gmail.com"
              className="text-muted-foreground hover:text-white transition-all duration-300 p-2 rounded-lg glass hover:bg-white/10 glow-accent"
            >
              <Mail className="h-6 w-6" />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: '5+', label: 'Projects', color: 'text-gradient' },
              { number: '0', label: 'Years Experience', color: 'text-secondary' },
              { number: '0', label: 'Happy Clients', color: 'text-accent' },
              { number: '24/7', label: 'Support', color: 'text-gradient-rainbow' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 glass rounded-xl hover:bg-white/5 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className={`text-2xl sm:text-3xl font-bold mb-2 ${stat.color}`}>
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-white transition-colors animate-bounce glass p-3 rounded-full hover:bg-white/10"
      >
        <ArrowDown className="h-6 w-6" />
      </motion.button>

      {/* Floating elements */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-primary/30 rounded-full gradient-primary opacity-20 z-0"
      />
      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 border-secondary/30 rounded-full gradient-secondary opacity-20 z-0"
      />
      <motion.div
        animate={{
          rotate: 180,
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-1/2 left-1/5 w-16 h-16 border-2 border-accent/30 rounded-full gradient-accent opacity-20 z-0"
      />
      <motion.div
        animate={{
          rotate: -180,
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute bottom-1/3 left-3/4 w-20 h-20 border-2 border-orange-400/30 rounded-full bg-gradient-to-r from-orange-400/20 to-pink-400/20 z-0"
      />
    </section>
  );
}
