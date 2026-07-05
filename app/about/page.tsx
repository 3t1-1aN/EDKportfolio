'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import { FrostedPanel } from '@/components/ui/frosted-glass';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollAnimation from '@/components/ScrollAnimation';
import Footer from '@/components/Footer';
import { BlurText } from '@/components/ui/blur-text';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { categoryImages } from '@/lib/projects/category-images';
import {
  bodySequenceEnd,
  countWords,
  headingSequenceEnd,
  sectionHeaderSequenceEnd,
} from '@/lib/motion-presets';

const ABOUT_TITLE = 'About Me';
const ABOUT_DESCRIPTION =
  'Learn more about my journey in engineering, robotics, and technology.';

const introParagraph =
  "I'm Ethan Kunder, a high school junior at Gunderson High School and a student in the Mechatronics program at Silicon Valley Career Technical Education Center (SVCTE), where I'm developing hands-on experience across multiple engineering disciplines. I love exploring the intersection of programming, robotics, AI, and creative engineering, turning small ideas into systems that move, respond, and think.";

const platformParagraph =
  'EKfeats is my platform designed to showcase a diverse range of projects spanning music, electronics, coding, mechanics, and 3D software. The site serves as a visual journey through the impressive variety of work I\'ve completed over the past few years, with a focus on innovation and creative problem-solving.';

const RINCELL_INTERNSHIP =
  "I'm currently interning at Rincell Corporation, with a focus on electromechanical engineering, automation engineering, software development, and autonomous systems engineering.";

function buildSequence() {
  let seq = sectionHeaderSequenceEnd(ABOUT_TITLE, ABOUT_DESCRIPTION);

  const body = (text: string) => {
    const start = seq;
    seq = bodySequenceEnd(countWords(text), start);
    return start;
  };

  const heading = (text: string) => {
    const start = seq;
    seq = headingSequenceEnd(countWords(text), start);
    return start;
  };

  return {
    intro: body(introParagraph),
    platform: body(platformParagraph),
    svcte: body(
      "At SVCTE, I've learned to solve problems from multiple perspectives, work in professional team settings, and apply both hardware and software to real-world challenges. This program has strengthened my ability to think critically, design iteratively, and build with purpose."
    ),
    roboticsHeading: heading('Robotics Leadership'),
    roboticsBody: body(
      "I founded my school's Robotics Club, where I lead our rookie team in the FIRST Tech Challenge (FTC). Through this experience, I've gained valuable lessons in leadership, team coordination, sponsorship outreach, and project management, all while mentoring peers in programming, design, and problem-solving."
    ),
    skillsHeading: heading('Technical Skills'),
    skillsBody: body(
      "I'm fluent in Python and currently expanding my skills in C++ for embedded systems and microcontroller applications while pursuing Cisco certification. Outside the classroom, I enjoy 3D printing, experimenting with Arduino and Raspberry Pi, and automating workflows with Make.com."
    ),
    creativeHeading: heading('Creative Projects & DIY'),
    creativeBody: body(
      'My passion for building extends far beyond the classroom. What started with simple DIY creations using paper, cardboard, and popsicle sticks has evolved into more advanced projects involving electronics, woodworking, 3D printing, soldering, and beyond.'
    ),
    musicHeading: heading('Music & Digital Composition'),
    musicBody: body(
      "Beyond engineering, I'm a lifelong musician, trained through the Royal Conservatory of Music and fluent on piano, drums, and digital composition."
    ),
    photoHeading: heading('Photography'),
    photoBody: body(
      'I am also a self-taught photographer. I love the outdoors and part of that reason is that I love to capture wildlife and nature in photos.'
    ),
    forwardHeading: heading('Looking Forward'),
    forwardBody: body(
      'My long-term goal is to develop technology that feels intuitive, human, and useful, blending technical precision with creativity to design systems that make everyday life smarter and more connected.'
    ),
    forwardBody2: body(RINCELL_INTERNSHIP),
    end: seq,
  };
}

const delays = buildSequence();

export default function AboutPage() {
  return (
    <>
      <Section id="hero" variant="default" className="pt-32">
        <Container>
          <FrostedPanel>
            <div className="px-8 py-10 sm:px-12 sm:py-14">
            <SectionHeader
              title={ABOUT_TITLE}
              description={ABOUT_DESCRIPTION}
              blurTitle
              blurDescription
            />

            <div className="max-w-5xl mx-auto space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-start mb-2">
                <div className="space-y-4">
                  <BlurText
                    text={introParagraph}
                    variant="body"
                    trigger="mount"
                    startDelay={delays.intro}
                    className="text-lg text-grey-300 leading-relaxed"
                  />
                  <BlurText
                    text={platformParagraph}
                    variant="body"
                    trigger="mount"
                    startDelay={delays.platform}
                    className="text-lg text-grey-300 leading-relaxed"
                  />
                </div>
                <ScrollAnimation delay={delays.intro * 1000}>
                  <figure className="relative w-full overflow-hidden rounded-2xl glass-light">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={categoryImages.about}
                        alt="Ethan Kunder collaborating at a leadership event"
                        fill
                        className="object-cover object-[center_35%]"
                        sizes="(max-width: 1024px) 100vw, 440px"
                        priority
                      />
                    </div>
                  </figure>
                </ScrollAnimation>
              </div>

              <BlurText
                text="At SVCTE, I've learned to solve problems from multiple perspectives, work in professional team settings, and apply both hardware and software to real-world challenges. This program has strengthened my ability to think critically, design iteratively, and build with purpose."
                variant="body"
                trigger="mount"
                startDelay={delays.svcte}
                className="text-lg text-grey-300 leading-relaxed"
              />

              <div className="space-y-4">
                <BlurText
                  text="Robotics Leadership"
                  variant="heading"
                  as="h3"
                  trigger="mount"
                  startDelay={delays.roboticsHeading}
                  className="text-2xl font-bold"
                />
                <BlurText
                  text="I founded my school's Robotics Club, where I lead our rookie team in the FIRST Tech Challenge (FTC). Through this experience, I've gained valuable lessons in leadership, team coordination, sponsorship outreach, and project management, all while mentoring peers in programming, design, and problem-solving."
                  variant="body"
                  trigger="mount"
                  startDelay={delays.roboticsBody}
                  className="text-lg text-grey-300 leading-relaxed"
                />
              </div>

              <div className="space-y-4">
                <BlurText
                  text="Technical Skills"
                  variant="heading"
                  as="h3"
                  trigger="mount"
                  startDelay={delays.skillsHeading}
                  className="text-2xl font-bold"
                />
                <BlurText
                  text="I'm fluent in Python and currently expanding my skills in C++ for embedded systems and microcontroller applications while pursuing Cisco certification. Outside the classroom, I enjoy 3D printing, experimenting with Arduino and Raspberry Pi, and automating workflows with Make.com."
                  variant="body"
                  trigger="mount"
                  startDelay={delays.skillsBody}
                  className="text-lg text-grey-300 leading-relaxed"
                />
                <ScrollAnimation delay={delays.skillsBody * 1000 + 400}>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {[
                      'C++',
                      'Python',
                      'Electrical Engineering',
                      'CAD',
                      'Mechanical Engineering',
                      'Industrial Automation',
                      'Arduino',
                      'Raspberry Pi',
                      '3D Design',
                      '3D Printing',
                      'Soldering',
                      'Woodworking',
                    ].map((skill) => (
                      <span key={skill} className="px-4 py-2 glass-light rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </ScrollAnimation>
              </div>

              <div className="space-y-4">
                <BlurText
                  text="Creative Projects & DIY"
                  variant="heading"
                  as="h3"
                  trigger="mount"
                  startDelay={delays.creativeHeading}
                  className="text-2xl font-bold"
                />
                <BlurText
                  text="My passion for building extends far beyond the classroom. What started with simple DIY creations using paper, cardboard, and popsicle sticks has evolved into more advanced projects involving electronics, woodworking, 3D printing, soldering, and beyond."
                  variant="body"
                  trigger="mount"
                  startDelay={delays.creativeBody}
                  className="text-lg text-grey-300 leading-relaxed"
                />
              </div>

              <div className="space-y-4">
                <BlurText
                  text="Music & Digital Composition"
                  variant="heading"
                  as="h3"
                  trigger="mount"
                  startDelay={delays.musicHeading}
                  className="text-2xl font-bold"
                />
                <BlurText
                  text="Beyond engineering, I'm a lifelong musician, trained through the Royal Conservatory of Music and fluent on piano, drums, and digital composition."
                  variant="body"
                  trigger="mount"
                  startDelay={delays.musicBody}
                  className="text-lg text-grey-300 leading-relaxed"
                />
              </div>

              <div className="space-y-4">
                <BlurText
                  text="Photography"
                  variant="heading"
                  as="h3"
                  trigger="mount"
                  startDelay={delays.photoHeading}
                  className="text-2xl font-bold"
                />
                <BlurText
                  text="I am also a self-taught photographer. I love the outdoors and part of that reason is that I love to capture wildlife and nature in photos."
                  variant="body"
                  trigger="mount"
                  startDelay={delays.photoBody}
                  className="text-lg text-grey-300 leading-relaxed"
                />
              </div>

              <div className="space-y-4">
                <BlurText
                  text="Looking Forward"
                  variant="heading"
                  as="h3"
                  trigger="mount"
                  startDelay={delays.forwardHeading}
                  className="text-2xl font-bold"
                />
                <BlurText
                  text="My long-term goal is to develop technology that feels intuitive, human, and useful, blending technical precision with creativity to design systems that make everyday life smarter and more connected."
                  variant="body"
                  trigger="mount"
                  startDelay={delays.forwardBody}
                  className="text-lg text-grey-300 leading-relaxed"
                />
                <BlurText
                  text={RINCELL_INTERNSHIP}
                  variant="body"
                  trigger="mount"
                  startDelay={delays.forwardBody2}
                  className="text-lg text-grey-300 leading-relaxed"
                />
              </div>

              <ScrollAnimation delay={delays.end * 1000}>
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
            </div>
            </div>
          </FrostedPanel>
        </Container>
      </Section>
      <Footer />
    </>
  );
}
