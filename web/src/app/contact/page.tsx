
import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';

export default function Contact() {
  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      description: 'Send me a message anytime',
      action: '3lizabeth3vans@gmail.com',
      href: 'mailto:3lizabeth3vans@gmail.com'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      description: 'Connect with me professionally',
      action: 'View LinkedIn Profile',
      href: 'https://linkedin.com/in/elizabeth-darlene-evans'
    },
    {
      icon: '💻',
      title: 'GitHub',
      description: 'Check out my code',
      action: 'View GitHub Profile',
      href: 'https://github.com/darleneevans'
    }
  ];

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Get In Touch" 
        subtitle="I&apos;m actively looking for new opportunities. Let's discuss how I can contribute to your team!"
      />

      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Send me a message</h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Other ways to reach me</h2>
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block p-6 bg-slate-800/50 rounded-xl border border-blue-800/30 hover:border-blue-600/50 transition-all hover:transform hover:scale-105"
                  >
                    <div className="flex items-center">
                      <div className="text-4xl mr-4">{method.icon}</div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
                        <p className="text-slate-300 mb-2">{method.description}</p>
                        <span className="text-blue-400 font-medium">{method.action}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-12 p-6 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 rounded-xl border border-blue-800/30">
                <h3 className="text-xl font-semibold text-white mb-4">Let&apos;s build something amazing together</h3>
                <p className="text-slate-300 leading-relaxed">
                  I&apos;m particularly interested in full-stack development roles where I can work with modern technologies 
                  and contribute to meaningful projects. Whether you&apos;re a startup looking to build something new or an 
                  established company seeking fresh perspectives, I&apos;d love to hear from you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}