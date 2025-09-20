'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Send,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  X,
  Bot,
  User,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { useState } from 'react';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What technologies do you specialize in?",
    answer: "I specialize in modern web technologies including React, Next.js, TypeScript, Node.js, Python, and cloud platforms like AWS. I also have experience with AI/ML integration and mobile app development."
  },
  {
    question: "How long does it take for you to complete a project?",
    answer: "Project timelines vary depending on complexity and scope. Typically, small projects take 2-4 weeks, medium projects 1-3 months, and large enterprise applications 3-6 months. I'll provide a detailed timeline during our consultation."
  },
  {
    question: "Do you work with international clients?",
    answer: "Absolutely! I've worked with clients from all over the world including the US, Europe, Asia, and Australia. I adapt to different time zones and communication preferences."
  },
  {
    question: "What's your development process like?",
    answer: "I follow an agile development process with regular updates, code reviews, and testing. The process includes discovery, planning, development, testing, deployment, and maintenance phases."
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer: "Yes, I offer various support packages including bug fixes, feature updates, performance monitoring, and technical consultation. We can discuss specific support needs for your project."
  }
];

export function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your AI assistant. I can help answer questions about projects, technologies, or anything else you'd like to know. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = getBotResponse(currentMessage);
      const botMessage: Message = {
        id: messages.length + 2,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    for (const faq of faqs) {
      if (lowerMessage.includes(faq.question.toLowerCase().split(' ')[0])) {
        return faq.answer;
      }
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm here to help you learn more about my services and experience. Feel free to ask me anything!";
    }

    if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
      return "I'd love to discuss potential projects with you! You can also check out my portfolio section to see some of my recent work.";
    }

    if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
      return "You can reach me directly through the contact form above, or email me at contact@example.com. I typically respond within 24 hours!";
    }

    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate')) {
      return "Project costs depend on complexity, timeline, and specific requirements. I offer free consultations to discuss your needs and provide accurate quotes.";
    }

    return "That's an interesting question! While I don't have a specific answer for that, I'd be happy to discuss it in more detail. Feel free to use the contact form above or continue chatting!";
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section ref={ref} id="contact" className="py-20 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient-rainbow">Let&apos;s Work Together</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ready to bring your ideas to life? Get in touch and let&apos;s discuss
            how we can create something amazing together.
          </p>
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-gradient-1 rounded-full animate-pulse"></div>
              <div className="w-4 h-4 bg-gradient-2 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-4 h-4 bg-gradient-3 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-4 h-4 bg-gradient-4 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <div className="w-4 h-4 bg-gradient-5 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let&apos;s Start a Conversation</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I&apos;m always excited to work on new and challenging projects. Whether you have a
                specific project in mind or just want to explore possibilities, I&apos;d love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              <motion.div
                className="flex items-center gap-4 p-4 glass rounded-xl border border-white/10 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="w-12 h-12 gradient-rainbow rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Mail className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <div className="font-medium text-gradient">Email</div>
                  <div className="text-muted-foreground">hemantahire3991@gmail.com</div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-4 glass rounded-xl border border-white/10 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="w-12 h-12 gradient-secondary rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: -360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Phone className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <div className="font-medium text-secondary">Phone</div>
                  <div className="text-muted-foreground">+91 9322951422</div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-4 glass rounded-xl border border-white/10 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="w-12 h-12 gradient-accent rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  <MapPin className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <div className="font-medium text-accent">Location</div>
                  <div className="text-muted-foreground">Nashik, India</div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-4 glass rounded-xl border border-white/10 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Clock className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <div className="font-medium text-primary">Response Time</div>
                  <div className="text-muted-foreground">Within 24 hours</div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="animated-gradient p-6 rounded-xl glow-primary"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-semibold mb-2 flex items-center gap-2 text-white">
                <Sparkles className="h-5 w-5 text-white" />
                Free Consultation
              </h4>
              <p className="text-white/80 text-sm">
                Schedule a 30-minute call to discuss your project requirements,
                timeline, and get a personalized quote.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmitForm} className="glass border border-white/10 rounded-xl p-6 backdrop-blur-md">
              <h3 className="text-xl font-semibold mb-6 text-gradient">Send a Message</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gradient">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gradient">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      placeholder="hemantahire3991@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gradient">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gradient">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none transition-all duration-300"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-vibrant py-3 rounded-lg font-semibold text-lg shadow-lg glow-primary hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 inline mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 text-green-400 bg-green-500/20 p-3 rounded-lg border border-green-400/30"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm">Message sent successfully! I&apos;ll get back to you soon.</span>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>

        {/* AI Chatbot Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="gradient-rainbow text-white p-4 rounded-full shadow-2xl glow-primary hover:shadow-3xl transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: isChatOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isChatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </motion.div>
          </motion.button>
          {!isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-16 right-0 bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap"
            >
              AI Assistant
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black/80"></div>
            </motion.div>
          )}
        </motion.div>

        {/* AI Chatbot */}
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 right-6 w-80 h-96 glass border border-white/10 rounded-xl shadow-2xl z-40 flex flex-col backdrop-blur-md"
          >
            {/* Chat Header */}
            <div className="gradient-rainbow text-white p-4 rounded-t-xl flex items-center gap-3">
              <motion.div
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Bot className="h-5 w-5" />
              </motion.div>
              <div>
                <div className="font-semibold">AI Assistant</div>
                <div className="text-xs opacity-90 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Online
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gradient-to-b from-white/5 to-transparent">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' ? 'gradient-rainbow text-white' : 'glass'
                    }`}>
                      {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'gradient-rainbow text-white'
                        : 'glass border border-white/10'
                    }`}>
                      <div className="text-sm">{message.content}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 glass rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="glass border border-white/10 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-secondary rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-accent rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm transition-all duration-300"
                />
                <motion.button
                  onClick={handleSendMessage}
                  className="gradient-rainbow text-white p-2 rounded-lg hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
