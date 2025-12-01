import { siteContent } from './content.js';

const Section = ({ id, title, eyebrow, children, tone = 'default' }) => (
  <section id={id} className={`section section-${tone}`}>
    <div className="shell">
      <div className="section-header">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      <div className="section-body">{children}</div>
    </div>
  </section>i
);

const ServicesList = ({ items }) => (
  <div className="card-grid">
    {items.map((service) => (
      <article key={service.name} className="card">
        <h3>{service.name}</h3>
        <p>{service.description}</p>
      </article>
    ))}
  </div>
);

const Highlights = ({ cards }) => (
  <div className="highlight-grid">
    {cards.map((card) => (
      <article key={card.title} className="highlight-card">
        <h3>{card.title}</h3>
        <p>{card.description}</p>
      </article>
    ))}
  </div>
);

const StatsStrip = ({ stats }) => (
  <div className="stats-strip">
    {stats.map((item) => (
      <div key={item.label} className="stat">
        <span className="stat-value">{item.value}</span>
        <span className="stat-label">{item.label}</span>
      </div>
    ))}
  </div>
);

const ApproachTimeline = ({ steps }) => (
  <ol className="approach">
    {steps.map((step, index) => (
      <li key={step.title}>
        <span className="step-index">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
      </li>
    ))}
  </ol>
);

const Testimonials = ({ quotes }) => (
  <div className="testimonial-grid">
    {quotes.map((quote) => (
      <blockquote key={quote.name} className="testimonial">
        <p>{quote.quote}</p>
        <footer>
          <strong>{quote.name}</strong>
          <span>{quote.detail}</span>
        </footer>
      </blockquote>
    ))}
  </div>
);

const ContactDetails = ({ details }) => (
  <dl className="contact-details">
    {details.map((item) => (
      <div key={item.label} className="detail-row">
        <dt>{item.label}</dt>
        <dd>{item.value}</dd>
      </div>
    ))}
  </dl>
);

const buildWhatsAppLink = (number, message) => {
  const sanitizedNumber = number.replace(/[^\d]/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${sanitizedNumber}?text=${encodedMessage}`;
};

function App() {
  const { brand, hero, highlights, stats, about, services, approach, testimonials, contact } = siteContent;
  const whatsappLink = buildWhatsAppLink(contact.whatsappNumber, contact.whatsappMessage);

  return (
    <div className="page">
      <header className="hero" id="home">
        <div className="hero-ornament hero-ornament-1" />
        <div className="hero-ornament hero-ornament-2" />
        <nav className="nav shell">
          <div className="brand">
            <p className="eyebrow">{brand.tagline}</p>
            <h1>{brand.name}</h1>
          </div>
          <div className="nav-links">
            {['home', 'about', 'services', 'approach', 'contact'].map((link) => (
              <a key={link} href={`#${link}`}>
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            ))}
          </div>
        </nav>

        <div className="hero-shell shell">
          <div className="hero-copy">
            <span className="badge">{hero.badge}</span>
            <h2>{hero.headline}</h2>
            <p>{hero.subheading}</p>
            <ul className="hero-points">
              {hero.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="cta-row">
              <a className="primary" href="#contact">
                {hero.primaryCta}
              </a>
              <a className="secondary" href={whatsappLink} target="_blank" rel="noreferrer">
                {hero.secondaryCta}
              </a>
            </div>
          </div>

          <div className="hero-panel">
            <p>Guiding students to steady math confidence with structured practice, calm coaching, and transparent updates.</p>
            <StatsStrip stats={stats} />
          </div>
        </div>
      </header>

      <Section id="about" title={about.title} eyebrow="Story & focus">
        <Highlights cards={highlights} />
        <div className="copy-stack">
          {about.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section id="services" title={services.title} eyebrow="What we cover" tone="muted">
        <ServicesList items={services.list} />
      </Section>

      <Section id="approach" title={approach.title} eyebrow="Session cadence">
        <ApproachTimeline steps={approach.steps} />
      </Section>

      <Section id="testimonials" title={testimonials.title} eyebrow="Proof of progress" tone="muted">
        <Testimonials quotes={testimonials.quotes} />
      </Section>

      <Section id="contact" title={contact.title} eyebrow="Let's connect">
        <div className="contact-shell">
          <ContactDetails details={contact.details} />
          <div className="cta-panel">
            <div>
              <p>{contact.ctaCopy}</p>
              <p className="muted">Share goals, timelines, and we will map the first few sessions together.</p>
            </div>
            <div className="cta-row">
              <a className="primary" href={whatsappLink} target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </a>
              <a className="secondary" href="mailto:hello@themathiq.com">
                Email us
              </a>
            </div>
          </div>
        </div>
      </Section>

      <footer className="footer">
        <div className="shell footer-shell">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <a href="#home">Back to top</a>
        </div>
      </footer>
    </div>
  );
}

export default App;

