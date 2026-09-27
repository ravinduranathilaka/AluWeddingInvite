"use client";

import Image from "next/image";
import { useState } from "react";
import { event } from "@/lib/event";

const gallery = [
  ["/images/hero-couple.jpeg", "Imaya and Shehan beneath a flower arch"],
  ["/images/hero-arch.jpeg", "A pink and lavender floral ceremony arch"],
  ["/images/hero-flowers.jpeg", "Pink flowers arranged in a garden"],
] as const;

function Mark({ children }: { children: React.ReactNode }) {
  return <span className="mark" aria-hidden="true">{children}</span>;
}

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [rsvpOpen, setRsvpOpen] = useState(false);

  return (
    <main>
      <section className="hero" id="top">
        <div className="hero-image" aria-hidden="true">
          <Image src="/images/hero-couple.jpeg" alt="" fill priority sizes="100vw" />
        </div>
        <div className="hero-wash" />
        <header className="hero-nav">
          <a className="wordmark" href="#top" aria-label="Back to the beginning">I <i>&amp;</i> S</a>
          <a href="#rsvp">RSVP <span aria-hidden="true">↘</span></a>
        </header>
        <div className="hero-copy">
          <p className="eyebrow">Together with their families</p>
          <h1><span>Imaya</span><em>&amp;</em><span>Shehan</span></h1>
          <div className="date-lockup"><span>Friday</span><strong>16</strong><span>July<br />2027</span></div>
          <a className="hero-scroll" href="#story">Celebrate with us <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="story section" id="story">
        <div className="story-photo"><Image src="/images/hero-arch.jpeg" alt="A flower-filled arch ready for a wedding ceremony" fill sizes="(max-width: 760px) 100vw, 45vw" /></div>
        <div className="story-copy">
          <p className="eyebrow">A garden beginning</p>
          <h2>One beautiful day,<br /><i>shared together.</i></h2>
          <p>We would be delighted to have you with us as we make our promises and begin the next chapter of our story.</p>
          <div className="initial-seal" aria-label="Placeholder insignia">I <i>&amp;</i> S</div>
        </div>
      </section>

      <section className="people section" aria-label="The couple">
        <article className="person-card bride-card">
          <Image src="/images/bride.jpeg" alt="Imaya in the garden" fill sizes="(max-width: 720px) 100vw, 50vw" />
          <div><p>The bride</p><h2>Imaya</h2></div>
        </article>
        <article className="person-card groom-card">
          <Image src="/images/hero-embrace.jpeg" alt="Shehan with Imaya in the garden" fill sizes="(max-width: 720px) 100vw, 50vw" />
          <div><p>The groom</p><h2>Shehan</h2></div>
        </article>
      </section>

      <section className="venue section" id="venue">
        <p className="eyebrow">Save the evening</p>
        <h2>At <i>Cinnamon Life</i><br />at City of Dreams</h2>
        <p className="venue-city">Colombo, Sri Lanka · 6:00 PM onwards</p>
        <div className="venue-actions">
          <a className="button button-solid" href={event.mapUrl} target="_blank" rel="noreferrer">Open in maps <span aria-hidden="true">↗</span></a>
          <a className="button button-quiet" href={event.calendarUrl} target="_blank" rel="noreferrer">Add to calendar <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="gallery section" aria-label="Garden details">
        <div className="gallery-frame">
          <Image src={gallery[activeSlide][0]} alt={gallery[activeSlide][1]} fill sizes="(max-width: 900px) 100vw, 72vw" />
        </div>
        <div className="gallery-controls" aria-label="Choose a photo">
          {gallery.map(([, alt], index) => <button key={alt} className={index === activeSlide ? "active" : ""} type="button" onClick={() => setActiveSlide(index)} aria-label={`Show photo ${index + 1}`} aria-current={index === activeSlide}>{String(index + 1).padStart(2, "0")}</button>)}
        </div>
      </section>

      <section className="schedule section" id="schedule">
        <div className="section-heading"><p className="eyebrow">The evening</p><h2>From six <i>onwards</i></h2></div>
        <ol>
          {event.timeline.map(([time, title, description]) => <li key={time}><time>{time}</time><div><h3>{title}</h3><p>{description}</p></div><Mark>✦</Mark></li>)}
        </ol>
      </section>

      <section className="rsvp section" id="rsvp">
        <div className="rsvp-photo"><Image src="/images/hero-flowers.jpeg" alt="Pink garden flowers" fill sizes="(max-width: 760px) 100vw, 42vw" /></div>
        <div className="rsvp-copy">
          <p className="eyebrow">Will you join us?</p>
          <h2>RSVP</h2>
          <p>We are preparing the guest list now. Please return here soon to send your response.</p>
          {!rsvpOpen ? <button className="button button-solid" type="button" onClick={() => setRsvpOpen(true)}>Notify me when RSVPs open</button> : <p className="rsvp-notice" role="status">RSVP submissions are being prepared. We look forward to celebrating with you.</p>}
        </div>
      </section>

      <footer>
        <div className="footer-seal" aria-hidden="true">I <i>&amp;</i> S</div>
        <p>{event.date} · {event.venue}</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
