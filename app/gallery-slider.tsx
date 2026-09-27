"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const photos = [
  ["/images/arch-kiss.jpeg", "Imaya and Shehan beneath their flower arch"],
  ["/images/embrace-closeup.jpeg", "A quiet embrace with Imaya's engagement ring in view"],
  ["/images/chandelier-portrait.jpeg", "Imaya and Shehan beneath a chandelier"],
] as const;

export function GallerySlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % photos.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const show = (index: number) => {
    setPaused(true);
    setActive((index + photos.length) % photos.length);
  };

  return <section className="gallery" aria-label="Photographs of Imaya and Shehan">
    <div className="gallery-stage">
      {photos.map(([src, alt], index) => <Image key={src} className={`gallery-image${index === active ? " is-active" : ""}`} src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 82vw" priority={index === 0} />)}
    </div>
    <div className="gallery-caption"><p>Imaya &amp; Shehan</p><span>{active + 1} / {photos.length}</span></div>
    <div className="gallery-controls">
      <button type="button" onClick={() => show(active - 1)}>Previous photo</button>
      <div className="gallery-thumbnails" aria-label="Select a photo">
        {photos.map(([src, alt], index) => <button key={src} className={index === active ? "is-active" : ""} type="button" onClick={() => show(index)} aria-label={`Show ${alt}`} aria-current={index === active}><Image src={src} alt="" fill sizes="64px" /></button>)}
      </div>
      <button type="button" onClick={() => show(active + 1)}>Next photo</button>
      <button type="button" className="gallery-pause" onClick={() => setPaused((current) => !current)}>{paused ? "Play slideshow" : "Pause slideshow"}</button>
    </div>
  </section>;
}
