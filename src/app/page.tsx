import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { SkillsSection } from '@/components/skills-section';
import { ProjectsSection } from '@/components/projects-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { ContactSection } from '@/components/contact-section';
// import { CareerGlobeSection } from '@/components/career-globe';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        {/* About Section */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 pt-32">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">About Me</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I am a software engineer passionate about building impactful solutions that blend AI, cloud, and full-stack development.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                &ldquo;With experience in React Native, Firebase, MongoDB, and modern web technologies, I&rsquo;ve developed end-to-end applications ranging from mobile apps to AI-powered platforms.&rdquo;
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Key Highlights</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Full Stack Development</li>
                  <li>• Cloud Architecture</li>
                  <li>• Modern UI/UX Design</li>
                  <li>• Problem Solving</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <SkillsSection />

        <ProjectsSection />

        <TestimonialsSection />

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
