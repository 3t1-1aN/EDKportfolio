'use client';

import ScrollAnimation from './ScrollAnimation';

const steps = [
  {
    number: '01',
    title: 'Brief',
    subtitle: '_',
    description: 'Every collaboration begins with alignment — understanding your brand, business goals, and the challenge ahead. This stage sets the direction for strategic and creative focus.',
    services: ['Strategic Planning', 'Brand Strategy', 'Project Goals'],
  },
  {
    number: '02',
    title: 'Research',
    subtitle: '_',
    description: 'I explore the landscape — diving into competitors, user behavior, and industry benchmarks. Research fuels creativity, ensuring every decision is rooted in relevance and opportunity.',
    services: ['Market Analysis', 'User Research', 'Analytics and Insights'],
  },
  {
    number: '03',
    title: 'Brainstorm & Sketch',
    subtitle: '_',
    description: 'With a direction in mind, I sketch, scribble, and explore. This is where ideas breathe — shaping early concepts, layouts, and potential creative directions through iterative thinking.',
    services: ['Wireframing & Prototyping', 'Moodboards', 'Art Direction', 'Campaign Development'],
  },
  {
    number: '04',
    title: 'Build Concepts',
    subtitle: '_',
    description: 'Selected directions evolve into fully formed visual concepts. I refine composition, color, type, and flow — balancing function with emotion to bring your brand to life in every pixel.',
    services: ['Logo Design', 'Brand Guidelines', 'Product Design', 'Motion Design', 'Design Systems'],
  },
  {
    number: '05',
    title: 'Development',
    subtitle: '_',
    description: 'With strong design senses, I build responsive, production-ready experiences — complete with animations, forms, and logic. No handoff hassles, just seamless transition from design to launch.',
    services: ['Responsive Design', 'No-code Development', 'Advanced Custom Animation', 'Performance Optimization'],
  },
  {
    number: '06',
    title: 'Present',
    subtitle: '_',
    description: 'The final step is about alignment and excitement. I walk you through the finished product, gather feedback, and polish every detail. Together, we launch work that\'s ready to make an impact.',
    services: ['Final Presentation', 'Feedback Rounds', 'Launch Support', 'Handover Package'],
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <ScrollAnimation>
          <div className="mb-16">
            <p className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-4">
              HOW IT WORKS
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
              A flexible approach that transforms ideas into great digital experiences.
            </h2>
          </div>
        </ScrollAnimation>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <ScrollAnimation key={step.number} delay={index * 100}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-2">
                  <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-200 dark:text-gray-800">
                    {step.number}
                  </h1>
                </div>
                <div className="lg:col-span-10">
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl sm:text-3xl font-bold">{step.title}</h3>
                      <span className="text-2xl sm:text-3xl font-bold text-gray-400 dark:text-gray-600">
                        {step.subtitle}
                      </span>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                      {step.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {step.services.map((service) => (
                      <span
                        key={service}
                        className="px-4 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

