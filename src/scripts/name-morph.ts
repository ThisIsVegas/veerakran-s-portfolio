import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

let activeTrigger: ScrollTrigger | undefined;
let activeMotionListener: (() => void) | undefined;

export function initNameMorph() {
  activeTrigger?.kill();
  if (activeMotionListener) reduceMotion.removeEventListener('change', activeMotionListener);
  activeTrigger = undefined;
  activeMotionListener = undefined;

  const hero = document.querySelector<HTMLElement>('.hero');
  const heroTitle = document.querySelector<HTMLElement>('#home-title');

  if (!hero || !heroTitle || reduceMotion.matches) return;

  gsap.registerPlugin(ScrollTrigger);

  const trigger = ScrollTrigger.create({
    trigger: hero,
    start: 'top top',
    end: 'bottom top',
    scrub: 0.3,
    onUpdate: (self) => {
      gsap.set(heroTitle, { opacity: 1 - self.progress, scale: 1 - self.progress * 0.12 });
    },
  });
  activeTrigger = trigger;

  const handleMotionPreference = () => {
    if (reduceMotion.matches) {
      trigger.kill();
      gsap.set(heroTitle, { clearProps: 'opacity,scale' });
    }
  };
  activeMotionListener = handleMotionPreference;

  reduceMotion.addEventListener('change', handleMotionPreference);
}

document.addEventListener('astro:before-swap', () => {
  activeTrigger?.kill();
  if (activeMotionListener) reduceMotion.removeEventListener('change', activeMotionListener);
  activeTrigger = undefined;
  activeMotionListener = undefined;
});
