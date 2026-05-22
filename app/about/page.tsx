import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollAnimation from '@/components/ScrollAnimation';
import Footer from '@/components/Footer';
import { StarsBackground } from '@/components/ui/stars';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

export default function AboutPage() {
  return (
    <>
      <div className="fixed inset-0 -z-10 w-full h-full">
        <StarsBackground className="w-full h-full" />
      </div>
      <Section id="hero" variant="default" className="pt-32">
        <Container>
          <div className="relative rounded-2xl px-8 py-10 sm:px-12 sm:py-14">
            {/* Liquid glass shadow layer */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]" />
            {/* Frosted glass backdrop layer */}
            <div
              className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-2xl bg-white/[0.02]"
              style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            />
            <div className="relative z-10">
          <ScrollAnimation>
            <SectionHeader
              title="About Me"
              description="Learn more about my journey in engineering, robotics, and technology."
            />
          </ScrollAnimation>

          <div className="max-w-3xl mx-auto space-y-6">
            <ScrollAnimation delay={200}>
              <p className="text-lg text-grey-700 dark:text-grey-300 leading-relaxed">
                I'm Ethan Kunder, a high school junior at Gunderson High School and a student in the Mechatronics program at Silicon Valley Career Technical Education Center (SVCTE), where I'm developing hands-on experience across multiple engineering disciplines. I love exploring the intersection of programming, robotics, AI, and creative engineering, turning small ideas into systems that move, respond, and think.
              </p>
              <p className="text-lg text-grey-700 dark:text-grey-300 leading-relaxed mt-4">
                <strong>EKfeats</strong> is my platform designed to showcase a diverse range of projects spanning music, electronics, coding, mechanics, and 3D software. The site serves as a visual journey through the impressive variety of work I've completed over the past few years, with a focus on innovation and creative problem-solving.
              </p>
            </ScrollAnimation>

            <ScrollAnimation delay={300}>
              <p className="text-lg text-grey-700 dark:text-grey-300 leading-relaxed">
                At SVCTE, I've learned to solve problems from multiple perspectives, work in professional team settings, and apply both hardware and software to real-world challenges. This program has strengthened my ability to think critically, design iteratively, and build with purpose.
              </p>
            </ScrollAnimation>

            <ScrollAnimation delay={400}>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Robotics Leadership</h3>
                <p className="text-lg text-grey-700 dark:text-grey-300 leading-relaxed">
                  I founded my school's Robotics Club, where I lead our rookie team in the FIRST Tech Challenge (FTC). Through this experience, I've gained valuable lessons in leadership, team coordination, sponsorship outreach, and project management, all while mentoring peers in programming, design, and problem-solving.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={500}>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Technical Skills</h3>
                <p className="text-lg text-grey-700 dark:text-grey-300 leading-relaxed">
                  I'm fluent in Python and currently expanding my skills in C++ for embedded systems and microcontroller applications while pursuing Cisco certification. Outside the classroom, I enjoy 3D printing, experimenting with Arduino and Raspberry Pi, and automating workflows with Make.com.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-4 py-2 glass-light rounded-full text-sm">C++</span>
                  <span className="px-4 py-2 glass-light rounded-full text-sm">Python</span>
                  <span className="px-4 py-2 glass-light rounded-full text-sm">Electrical Engineering</span>
                  <span className="px-4 py-2 glass-light rounded-full text-sm">CAD</span>
                  <span className="px-4 py-2 glass-light rounded-full text-sm">Mechanical Engineering</span>
                  <span className="px-4 py-2 glass-light rounded-full text-sm">Industrial Automation</span>
                  <span className="px-4 py-2 glass-light rounded-full text-sm">Arduino</span>
                  <span className="px-4 py-2 glass-light rounded-full text-sm">Raspberry Pi</span>
                  <span className="px-4 py-2 glass-light rounded-full text-sm">3D Design</span>
                  <span className="px-4 py-2 glass-light rounded-full text-sm">3D Printing</span>
                  <span className="px-4 py-2 glass-light rounded-full text-sm">Soldering</span>
                  <span className="px-4 py-2 glass-light rounded-full text-sm">Woodworking</span>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={600}>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Creative Projects & DIY</h3>
                <p className="text-lg text-grey-700 dark:text-grey-300 leading-relaxed">
                  My passion for building extends far beyond the classroom. What started with simple DIY creations using paper, cardboard, and popsicle sticks has evolved into more advanced projects involving electronics, woodworking, 3D printing, soldering, and beyond. Each build reflects my journey of learning, experimenting, and pushing the limits of creativity. From mini dremel tools and plasma lighters to CPU desk fans and hard drive clocks, I love turning curiosity into functional creations.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={650}>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Music & Digital Composition</h3>
                <p className="text-lg text-grey-700 dark:text-grey-300 leading-relaxed">
                  Beyond engineering, I'm a lifelong musician, trained through the Royal Conservatory of Music and fluent on piano, drums, and digital composition. I've created original compositions including "Hills and Valleys," "Icarius," "Oceans," "Pianoissma," and "One with Nature." Music has taught me to listen, improvise, and create patterns, skills I bring to engineering every day.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={700}>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Photography</h3>
                <p className="text-lg text-grey-700 dark:text-grey-300 leading-relaxed">
                  I am also a self-taught photographer. I love the outdoors and part of that reason is that I love to capture wildlife and nature in photos. Photography has taught me patience, instrument fine tuning, and made me more aware of things around me.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={750}>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Education</h3>
                <ul className="space-y-3 text-lg text-grey-700 dark:text-grey-300">
                  <li>
                    <strong>Silicon Valley Career Technical Education Center</strong><br />
                    Mechatronics, Robotics, and Automation Engineering (2025-2026)
                  </li>
                  <li>
                    <strong>Gunderson High School</strong><br />
                    High School Diploma (2023-2027) • Grade 11 • 4.0+ GPA
                  </li>
                  <li>
                    <strong>De Anza College</strong><br />
                    Former Dual Enrollment Student
                  </li>
                </ul>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={850}>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Looking Forward</h3>
                <p className="text-lg text-grey-700 dark:text-grey-300 leading-relaxed">
                  My long-term goal is to develop technology that feels intuitive, human, and useful, blending technical precision with creativity to design systems that make everyday life smarter and more connected.
                </p>
                <p className="text-lg text-grey-700 dark:text-grey-300 leading-relaxed">
                  I'm currently seeking internship opportunities in Electromechanical Engineering, Automation Engineering, Software Development, and Autonomous Systems Engineering.
                </p>
              </div>
            </ScrollAnimation>

          </div>
            </div>{/* end relative z-10 */}
          </div>{/* end glass panel */}

            <ScrollAnimation delay={900}>
              <div className="pt-10 mt-8 max-w-3xl mx-auto">
                <LiquidButton
                  asChild
                  size="xxl"
                  className="text-black dark:text-white font-semibold uppercase tracking-wider text-sm sm:text-base shadow-lg shadow-black/5 dark:shadow-black/20"
                >
                  <a
                    href="/student%20resume.pdf"
                    download="Ethan-Kunder-Resume.pdf"
                    data-cursor-hover
                  >
                    Download resume
                  </a>
                </LiquidButton>
              </div>
            </ScrollAnimation>
        </Container>
      </Section>
      <Footer />
    </>
  );
}

