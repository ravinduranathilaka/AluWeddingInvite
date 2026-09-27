"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    src: "/images/arch-kiss.jpeg",
    alt: "Imaya and Shehan kissing beneath their flower arch",
    caption: "A quiet promise, in bloom",
    position: "center 57%",
  },
  {
    src: "/images/embrace-closeup.jpeg",
    alt: "Imaya and Shehan sharing an embrace",
    caption: "Held close",
    position: "center center",
  },
  {
    src: "/images/chandelier-portrait.jpeg",
    alt: "Imaya and Shehan beneath a chandelier",
    caption: "An evening to remember",
    position: "center 42%",
  },
  {
    src: "/images/ring-closeup.jpeg",
    alt: "Imaya's sapphire engagement ring as the couple hold hands",
    caption: "The beginning of always",
    position: "center center",
  },
] as const;

export function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const music = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    const startMusic = () => {
      const audio = music.current;
      if (!audio || !audio.paused) return;
      audio.volume = 0.3;
      audio.play().catch(() => undefined);
    };
    window.addEventListener("pointerdown", startMusic, { once: true });
    window.addEventListener("keydown", startMusic, { once: true });
    return () => {
      window.removeEventListener("pointerdown", startMusic);
      window.removeEventListener("keydown", startMusic);
    };
  }, []);

  const show = (index: number) => {
    setActive((index + slides.length) % slides.length);
  };

  const toggleMusic = () => {
    const audio = music.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 0.3;
      audio.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false));
    }
    else {
      audio.pause();
      setMusicPlaying(false);
    }
  };

  return <section className="hero" id="top" aria-label="Imaya and Shehan wedding invitation">
    <audio ref={music} src="/bgm/alubgm.mp3" loop preload="auto" onPlay={() => setMusicPlaying(true)} onPause={() => setMusicPlaying(false)} />
    <div className="hero-slides" aria-live="polite">
      {slides.map((slide, index) => <div className={`hero-slide${index === active ? " is-active" : ""}`} key={slide.src} aria-hidden={index !== active}>
        <Image src={slide.src} alt={index === active ? slide.alt : ""} fill priority={index === 0} sizes="100vw" style={{ objectPosition: slide.position }} />
      </div>)}
    </div>
    <div className="hero-wash" aria-hidden="true" />

    <header className="site-nav">
      <a className="monogram" href="#top" aria-label="Imaya and Shehan wedding invitation">I <i>&amp;</i> S</a>
      <nav aria-label="Invitation navigation"><a href="#the-day">The day</a><a href="#venue">Venue</a><a href="#rsvp">RSVP</a></nav>
    </header>

    <div className="hero-copy">
      <p className="hero-date">Friday · 16 July 2027</p>
      <h1><span>Imaya</span><span><i>&amp;</i> Shehan</span></h1>
      <p className="hero-summary">Request the pleasure of your company for an evening of celebration in Colombo.</p>
      <a className="hero-link" href="#invitation">Discover the day <span aria-hidden="true">↓</span></a>
    </div>

    <div className="hero-controls">
      <p>{slides[active].caption}</p>
      <div className="hero-buttons">
        <button type="button" onClick={() => show(active - 1)} aria-label="Show previous photograph">←</button>
        <span aria-label={`Photograph ${active + 1} of ${slides.length}`}>{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
        <button type="button" onClick={() => show(active + 1)} aria-label="Show next photograph">→</button>
        <button className="hero-pause" type="button" onClick={() => setPaused((current) => !current)}>{paused ? "Play" : "Pause"}</button>
        <button className="hero-pause" type="button" onClick={toggleMusic} aria-label={musicPlaying ? "Pause music" : "Play music"}>{musicPlaying ? "Pause music" : "Play music"}</button>
      </div>
    </div>
  </section>;
}
