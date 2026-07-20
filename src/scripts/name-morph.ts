import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const hero = document.querySelector<HTMLElement>('.hero');
const heroTitle = document.querySelector<HTMLElement>('#home-title');
const siteIdentity = document.querySelector<HTMLElement>('.site-identity');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (hero && heroTitle && siteIdentity) {
  if (reduceMotion.matches) {
    gsap.set(siteIdentity, { opacity: 1, y: 0 });
  } else {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.3,
      onUpdate: (self) => {
        gsap.set(heroTitle, { opacity: 1 - self.progress, scale: 1 - self.progress * 0.12 });
        gsap.set(siteIdentity, { opacity: self.progress, y: (1 - self.progress) * -0.4 * 16 });
      },
    });

    const handleMotionPreference = () => {
      if (reduceMotion.matches) {
        trigger.kill();
        gsap.set(heroTitle, { clearProps: 'opacity,scale' });
        gsap.set(siteIdentity, { opacity: 1, y: 0 });
      }
    };

    reduceMotion.addEventListener('change', handleMotionPreference);

    window.addEventListener(
      'pagehide',
      (event) => {
        if (!event.persisted) {
          reduceMotion.removeEventListener('change', handleMotionPreference);
          trigger.kill();
        }
      },
      { once: true },
    );
  }
}
