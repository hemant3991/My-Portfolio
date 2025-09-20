import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { SkillsSection } from '@/components/skills-section';
import { ProjectsSection } from '@/components/projects-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { ContactSection } from '@/components/contact-section';
// import { CareerGlobeSection } from '@/components/career-globe';
import { Footer } from '@/components/footer';
import { CursorGradient } from '@/components/cursor-gradient';

export default function Home() {
  return (
    <CursorGradient>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <HeroSection />
          {/* About Section */}
          <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 pt-32">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left">
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    I am a software engineer passionate about building impactful solutions that blend AI, cloud, and full-stack development.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                    &ldquo;With experience in React Native, Firebase, MongoDB, and modern web technologies, I&rsquo;ve developed end-to-end applications ranging from mobile apps to AI-powered platforms.&rdquo;
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-lg border border-white/10">
                    <h3 className="text-xl font-semibold mb-4 text-center">Key Highlights</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center justify-center lg:justify-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Full Stack Development
                      </li>
                      <li className="flex items-center justify-center lg:justify-start gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        Cloud Architecture
                      </li>
                      <li className="flex items-center justify-center lg:justify-start gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        Modern UI/UX Design
                      </li>
                      <li className="flex items-center justify-center lg:justify-start gap-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        Problem Solving
                      </li>
                    </ul>
                  </div>
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
    </CursorGradient>
  );
}
