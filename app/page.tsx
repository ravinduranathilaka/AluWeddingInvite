import Image from "next/image";
import { HeroSlideshow } from "./hero-slideshow";
import { RsvpForm } from "./rsvp-form";
import { event } from "@/lib/event";

export default function Home() {
  return <main>
    <a className="skip-link" href="#invitation">Skip to invitation details</a>
    <HeroSlideshow />

    <section className="opening" id="invitation">
      <div className="opening-image"><Image src="/images/arch-kiss.jpeg" alt="Imaya and Shehan kissing beneath their flower arch" fill sizes="(max-width: 760px) 100vw, 48vw" /></div>
      <div className="opening-copy">
        <p className="intro-line">Together with their families</p>
        <h2>Join us as<br />we say <i>always.</i></h2>
        <p>We would be delighted to celebrate this moment with the people who mean the most to us.</p>
        <div className="placeholder-seal" aria-label="Placeholder insignia">I <i>&amp;</i> S</div>
      </div>
    </section>

    <section className="day" id="the-day">
      <div className="day-intro"><p className="day-date">Friday, 16 July 2027</p><h2>From 6:00 PM <i>onwards</i></h2></div>
      <ol>
        {event.timeline.map(([time, title, description]) => <li key={time}><time>{time}</time><div><h3>{title}</h3><p>{description}</p></div></li>)}
      </ol>
    </section>

    <section className="venue" id="venue">
      <div className="venue-copy"><p className="venue-name">Cinnamon Life at City of Dreams</p><h2>An evening in the <i>heart of Colombo.</i></h2><address>{event.city}</address><a className="text-link" href={event.mapUrl} target="_blank" rel="noreferrer">Open Google Maps</a></div>
      <div className="map-frame"><iframe src={event.mapEmbedUrl} title="Map showing Cinnamon Life at City of Dreams in Colombo" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
    </section>

    <section className="rsvp" id="rsvp">
      <div className="rsvp-heading"><h2>Your reply will mean <i>so much.</i></h2><p>RSVPs are not open yet. The form below will become available when the guest list is ready.</p></div>
      <RsvpForm />
    </section>

    <footer><div className="monogram" aria-hidden="true">I <i>&amp;</i> S</div><p>Imaya Kehelkaduwa &amp; Shehan Aluwihare</p><p>{event.date}</p></footer>
  </main>;
}
