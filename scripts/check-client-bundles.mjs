import { readdir, stat } from 'node:fs/promises';

const outputDirectory = new URL('../dist/_astro/', import.meta.url);
const files = (await readdir(outputDirectory)).filter((file) => file.endsWith('.js'));
const sizes = await Promise.all(
  files.map(async (file) => ({ file, bytes: (await stat(new URL(file, outputDirectory))).size })),
);

const heroChunk = sizes.find(({ file }) => file.startsWith('hero-scene.'));
if (!heroChunk) throw new Error('The Three.js hero chunk was not generated.');

const heroBudget = 518_000;
const defaultBudget = 500_000;
const overBudget = sizes.filter(({ file, bytes }) =>
  file === heroChunk.file ? bytes > heroBudget : bytes > defaultBudget,
);

if (overBudget.length > 0) {
  const details = overBudget.map(({ file, bytes }) => `${file}: ${bytes} bytes`).join('\n');
  throw new Error(`Client bundle budget exceeded:\n${details}`);
}

console.log(`Client bundle budget passed (Three.js hero: ${heroChunk.bytes} / ${heroBudget} bytes).`);
