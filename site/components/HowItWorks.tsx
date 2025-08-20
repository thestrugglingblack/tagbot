'use client';

export default function HowItWorks() {
  const steps = [
    {
      step: '1',
      title: 'Invite Bot to Server',
      description: 'Add TagBot to your Discord server with a single click.',
      icon: 'ri-add-circle-line'
    },
    {
      step: '2',
      title: 'Players Add Their Tag',
      description: 'Each player saves their gamer tag with Tagbot — this step is key for everything to work.',
      icon: 'ri-user-add-line'
    },
    {
      step: '3',
      title: 'Call Bot For Player Tag',
      description: 'When it’s match time, call Tagbot and instantly grab your opponent’s tag. No delays, no scrolling.',
      icon: 'ri-robot-line'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get your players’ gamer tags in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${step.icon} text-white text-2xl`}></i>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}