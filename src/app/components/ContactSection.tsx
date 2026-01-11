import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-block px-6 py-2 rounded-full mb-4"
            style={{ backgroundColor: 'rgba(255, 87, 34, 0.1)' }}
          >
            <span className="text-sm font-semibold tracking-wide" style={{ color: 'var(--mlf-saffron)' }}>
              GET IN TOUCH
            </span>
          </div>
          <h2 
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ color: 'var(--mlf-indigo)' }}
          >
            Contact <span style={{ color: 'var(--mlf-saffron)' }}>Us</span>
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--mlf-text-secondary)' }}
          >
            Have questions? Want to get involved? Reach out to us
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div 
            className="p-8 rounded-3xl"
            style={{ backgroundColor: 'white' }}
          >
            <h3 
              className="text-2xl font-bold mb-6"
              style={{ color: 'var(--mlf-indigo)' }}
            >
              Send us a message
            </h3>

            <form className="space-y-6">
              <div>
                <label 
                  className="block mb-2 font-medium"
                  style={{ color: 'var(--mlf-text-primary)' }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-lg outline-none border-2 transition-all focus:border-[var(--mlf-saffron)]"
                  style={{ 
                    backgroundColor: 'var(--mlf-warm-beige)',
                    borderColor: 'transparent'
                  }}
                />
              </div>

              <div>
                <label 
                  className="block mb-2 font-medium"
                  style={{ color: 'var(--mlf-text-primary)' }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg outline-none border-2 transition-all focus:border-[var(--mlf-saffron)]"
                  style={{ 
                    backgroundColor: 'var(--mlf-warm-beige)',
                    borderColor: 'transparent'
                  }}
                />
              </div>

              <div>
                <label 
                  className="block mb-2 font-medium"
                  style={{ color: 'var(--mlf-text-primary)' }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="What is this regarding?"
                  className="w-full px-4 py-3 rounded-lg outline-none border-2 transition-all focus:border-[var(--mlf-saffron)]"
                  style={{ 
                    backgroundColor: 'var(--mlf-warm-beige)',
                    borderColor: 'transparent'
                  }}
                />
              </div>

              <div>
                <label 
                  className="block mb-2 font-medium"
                  style={{ color: 'var(--mlf-text-primary)' }}
                >
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-lg outline-none border-2 transition-all focus:border-[var(--mlf-saffron)] resize-none"
                  style={{ 
                    backgroundColor: 'var(--mlf-warm-beige)',
                    borderColor: 'transparent'
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                style={{ 
                  backgroundColor: 'var(--mlf-saffron)',
                  color: 'white'
                }}
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              <div 
                className="p-6 rounded-2xl flex items-start space-x-4"
                style={{ backgroundColor: 'white' }}
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(255, 87, 34, 0.1)' }}
                >
                  <MapPin size={24} style={{ color: 'var(--mlf-saffron)' }} />
                </div>
                <div>
                  <h4 
                    className="font-bold mb-1"
                    style={{ color: 'var(--mlf-indigo)' }}
                  >
                    Location
                  </h4>
                  <p style={{ color: 'var(--mlf-text-secondary)' }}>
                    Birgunj, Madhesh Province<br />
                    Nepal
                  </p>
                </div>
              </div>

              <div 
                className="p-6 rounded-2xl flex items-start space-x-4"
                style={{ backgroundColor: 'white' }}
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(63, 81, 181, 0.1)' }}
                >
                  <Mail size={24} style={{ color: 'var(--mlf-indigo)' }} />
                </div>
                <div>
                  <h4 
                    className="font-bold mb-1"
                    style={{ color: 'var(--mlf-indigo)' }}
                  >
                    Email
                  </h4>
                  <p style={{ color: 'var(--mlf-text-secondary)' }}>
                    info@madheshfest.org<br />
                    contact@madheshfest.org
                  </p>
                </div>
              </div>

              <div 
                className="p-6 rounded-2xl flex items-start space-x-4"
                style={{ backgroundColor: 'white' }}
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(76, 175, 80, 0.1)' }}
                >
                  <Phone size={24} style={{ color: 'var(--mlf-leaf-green)' }} />
                </div>
                <div>
                  <h4 
                    className="font-bold mb-1"
                    style={{ color: 'var(--mlf-indigo)' }}
                  >
                    Phone
                  </h4>
                  <p style={{ color: 'var(--mlf-text-secondary)' }}>
                    +977-XXX-XXXXX<br />
                    +977-XXX-XXXXX
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div 
              className="h-64 rounded-2xl flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: 'var(--mlf-warm-beige)' }}
            >
              <div className="text-center">
                <MapPin size={48} style={{ color: 'var(--mlf-saffron)', margin: '0 auto 16px' }} />
                <p 
                  className="font-bold text-lg"
                  style={{ color: 'var(--mlf-indigo)' }}
                >
                  Birgunj, Madhesh
                </p>
                <p style={{ color: 'var(--mlf-text-muted)' }}>
                  Interactive map coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;