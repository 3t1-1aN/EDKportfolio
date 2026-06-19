'use client';

import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollAnimation from './ScrollAnimation';
import { useEffect, useState } from 'react';
import { stats } from '@/lib/data';

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

const AnimatedStat = ({ value, suffix = '', label, delay = 0 }: StatProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`stat-${label}`);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [value, label, isVisible]);

  return (
    <div id={`stat-${label}`} className="text-center glass-card rounded-lg p-6">
      <div className="text-5xl sm:text-6xl md:text-7xl font-bold mb-2 text-white">
        {count}{suffix}
      </div>
      <p className="text-sm text-gray-300">{label}</p>
    </div>
  );
};

const Stats = () => {
  return (
    <Section id="social-proof" variant="default">
      <Container>
        <ScrollAnimation>
          <SectionHeader
            label="IMPACT BY THE NUMBERS"
            title="Every number tells a story of creative impact."
          />
        </ScrollAnimation>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <ScrollAnimation delay={0}>
            <AnimatedStat value={stats.mobileApps} label="Mobile App Design" />
          </ScrollAnimation>
          <ScrollAnimation delay={100}>
            <AnimatedStat value={stats.webDesigns} label="Responsive Web Design" />
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <AnimatedStat value={stats.dashboards} label="Admin Dashboard" />
          </ScrollAnimation>
          <ScrollAnimation delay={300}>
            <AnimatedStat value={stats.consultations} label="Consultation Services" />
          </ScrollAnimation>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <ScrollAnimation delay={400}>
            <div className="text-center glass-card rounded-lg p-6">
              <p className="text-sm text-gray-300 mb-2">Projects Completed</p>
              <AnimatedStat value={stats.projectsCompleted} suffix="+" label="" />
            </div>
          </ScrollAnimation>
          <ScrollAnimation delay={500}>
            <div className="text-center glass-card rounded-lg p-6">
              <p className="text-sm text-gray-300 mb-2">Campaigns Launched</p>
              <AnimatedStat value={stats.campaignsLaunched} label="" />
            </div>
          </ScrollAnimation>
          <ScrollAnimation delay={600}>
            <div className="text-center glass-card rounded-lg p-6">
              <p className="text-sm text-gray-300 mb-2">Clients Served Worldwide</p>
              <AnimatedStat value={stats.clientsServed} suffix="+" label="" />
            </div>
          </ScrollAnimation>
          <ScrollAnimation delay={700}>
            <div className="text-center glass-card rounded-lg p-6">
              <p className="text-sm text-gray-300 mb-2">Client Satisfaction Rate</p>
              <AnimatedStat value={stats.satisfactionRate} suffix="%" label="" />
            </div>
          </ScrollAnimation>
        </div>
      </Container>
    </Section>
  );
};

export default Stats;

