import {
  BufferAttribute,
  BufferGeometry,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';

const hero = document.querySelector<HTMLElement>('.hero');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const narrowViewport = window.matchMedia('(max-width: 45rem)');
const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

type NodeRole = 'endpoint' | 'service' | 'hub';
type SystemNode = { position: [number, number, number]; role: NodeRole };
type SystemTopology = { nodes: SystemNode[]; connections: Array<[number, number]> };

const desktopTopology: SystemTopology = {
  nodes: [
    { position: [-3.5, 1.65, -0.2], role: 'endpoint' },
    { position: [-3, 1.55, 0.15], role: 'service' },
    { position: [-2.5, 1.75, 0.35], role: 'hub' },
    { position: [-2.45, 2.15, -0.1], role: 'endpoint' },
    { position: [-1.5, 1.55, -0.25], role: 'service' },
    { position: [-0.5, 1.75, 0.2], role: 'hub' },
    { position: [0.6, 1.55, -0.15], role: 'service' },
    { position: [1.5, 1.8, 0.3], role: 'hub' },
    { position: [2, 2.15, -0.2], role: 'endpoint' },
    { position: [2.5, 1.55, 0.1], role: 'service' },
    { position: [3.35, 1.75, -0.25], role: 'endpoint' },
    { position: [-3.4, -1.8, 0.1], role: 'endpoint' },
    { position: [-2.8, -1.55, -0.2], role: 'service' },
    { position: [-2.2, -1.8, 0.3], role: 'hub' },
    { position: [-1.2, -1.6, -0.1], role: 'service' },
    { position: [0, -1.85, 0.25], role: 'hub' },
    { position: [1, -1.55, -0.2], role: 'service' },
    { position: [1.8, -1.75, 0.35], role: 'hub' },
    { position: [2.5, -1.5, -0.15], role: 'service' },
    { position: [3.4, -1.8, 0.15], role: 'endpoint' },
    { position: [1.9, -2.15, -0.2], role: 'endpoint' },
  ],
  connections: [
    [0, 1], [1, 2], [2, 3], [2, 4], [4, 5], [5, 6], [6, 7], [7, 8], [7, 9], [9, 10],
    [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 17], [17, 18], [17, 20], [18, 19],
    [0, 11], [10, 19],
  ],
};

const mobileTopology: SystemTopology = {
  nodes: [
    { position: [-1, 1.7, -0.15], role: 'endpoint' },
    { position: [-0.55, 1.55, 0.15], role: 'service' },
    { position: [0, 1.72, 0.3], role: 'hub' },
    { position: [0, 2.1, -0.2], role: 'endpoint' },
    { position: [0.55, 1.55, 0.1], role: 'service' },
    { position: [1, 1.72, -0.15], role: 'endpoint' },
    { position: [-1, -1.75, 0.1], role: 'endpoint' },
    { position: [-0.5, -1.58, -0.2], role: 'service' },
    { position: [0, -1.78, 0.3], role: 'hub' },
    { position: [0, -2.12, -0.15], role: 'endpoint' },
    { position: [0.5, -1.58, 0.1], role: 'service' },
    { position: [1, -1.75, -0.2], role: 'endpoint' },
  ],
  connections: [[0, 1], [1, 2], [2, 3], [2, 4], [4, 5], [6, 7], [7, 8], [8, 9], [8, 10], [10, 11]],
};

if (hero && !reduceMotion.matches && !connection?.saveData) {
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-canvas';
  canvas.setAttribute('aria-hidden', 'true');

  try {
    const renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !narrowViewport.matches,
      powerPreference: 'low-power',
    });

    hero.prepend(canvas);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, narrowViewport.matches ? 1.25 : 1.5));

    const scene = new Scene();
    const camera = new PerspectiveCamera(36, 1, 0.1, 30);
    camera.position.z = 7;

    const network = new Group();
    scene.add(network);

    const topology = narrowViewport.matches ? mobileTopology : desktopTopology;
    const nodeGeometry = new IcosahedronGeometry(narrowViewport.matches ? 0.032 : 0.042, 1);
    const nodeMaterials: Record<NodeRole, MeshBasicMaterial> = {
      endpoint: new MeshBasicMaterial({ transparent: true, opacity: 0.42 }),
      service: new MeshBasicMaterial({ transparent: true, opacity: 0.62 }),
      hub: new MeshBasicMaterial({ transparent: true, opacity: 0.86 }),
    };
    const lineMaterial = new LineBasicMaterial({ transparent: true, opacity: 0.24 });
    const nodes: Mesh[] = [];
    const targets: Vector3[] = [];
    const origins: Vector3[] = [];

    topology.nodes.forEach(({ position, role }, index) => {
      const target = new Vector3(...position);
      const origin = target.clone().multiplyScalar(1.25);
      origin.z += ((index % 3) - 1) * 1.25;

      const node = new Mesh(nodeGeometry, nodeMaterials[role]);
      node.position.copy(origin);
      node.scale.setScalar(role === 'hub' ? 1.25 : role === 'service' ? 0.95 : 0.72);
      nodes.push(node);
      targets.push(target);
      origins.push(origin);
      network.add(node);
    });

    const connectionPairs = topology.connections;

    const linePositions = new Float32Array(connectionPairs.length * 6);
    const lineGeometry = new BufferGeometry();
    lineGeometry.setAttribute('position', new BufferAttribute(linePositions, 3));
    const lines = new LineSegments(lineGeometry, lineMaterial);
    network.add(lines);

    const readThemeColour = (property: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(property).trim();

    const updatePalette = () => {
      Object.values(nodeMaterials).forEach((material) => material.color.set(readThemeColour('--color-accent')));
      lineMaterial.color.set(readThemeColour('--color-accent'));
    };

    const updateLines = () => {
      connectionPairs.forEach(([from, to], index) => {
        const offset = index * 6;
        linePositions[offset] = nodes[from].position.x;
        linePositions[offset + 1] = nodes[from].position.y;
        linePositions[offset + 2] = nodes[from].position.z;
        linePositions[offset + 3] = nodes[to].position.x;
        linePositions[offset + 4] = nodes[to].position.y;
        linePositions[offset + 5] = nodes[to].position.z;
      });
      lineGeometry.attributes.position.needsUpdate = true;
    };

    const resize = () => {
      const { width, height } = hero.getBoundingClientRect();
      renderer.setSize(Math.max(width, 1), Math.max(height, 1), false);
      camera.aspect = Math.max(width, 1) / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    const pointerTarget = new Vector2();
    const handlePointer = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      pointerTarget.set(
        ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.14,
        ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.1,
      );
    };

    const startedAt = performance.now();
    let lastFrame = 0;
    let active = true;
    let visible = !document.hidden;
    let motionAllowed = !reduceMotion.matches;
    let disposed = false;

    const render = (time: number) => {
      if (time - lastFrame < 32) return;
      lastFrame = time;

      const progress = Math.min((time - startedAt) / 1250, 1);
      const eased = 1 - (1 - progress) ** 3;
      nodes.forEach((node, index) => {
        node.position.lerpVectors(origins[index], targets[index], eased);
        if (progress === 1) node.position.z = targets[index].z + Math.sin(time * 0.00035 + index) * 0.045;
      });

      network.rotation.y += (pointerTarget.x - network.rotation.y) * 0.035;
      network.rotation.x += (-pointerTarget.y - network.rotation.x) * 0.035;
      updateLines();
      renderer.render(scene, camera);
      hero.dataset.threeReady = 'true';
    };

    const updateAnimation = () => renderer.setAnimationLoop(active && visible && motionAllowed ? render : null);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      updateAnimation();
    });
    const resizeObserver = new ResizeObserver(resize);
    const themeObserver = new MutationObserver(() => requestAnimationFrame(updatePalette));
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

    const handleVisibility = () => {
      visible = !document.hidden;
      updateAnimation();
    };

    const handleMotionPreference = () => {
      motionAllowed = !reduceMotion.matches;
      if (motionAllowed) hero.dataset.threeReady = 'true';
      else delete hero.dataset.threeReady;
      updateAnimation();
    };

    const handleContextLoss = (event: Event) => {
      event.preventDefault();
      motionAllowed = false;
      delete hero.dataset.threeReady;
      updateAnimation();
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (!event.persisted || disposed) return;
      visible = !document.hidden;
      resize();
      updatePalette();
      if (motionAllowed) hero.dataset.threeReady = 'true';
      updateAnimation();
    };

    const cleanup = () => {
      if (disposed) return;
      disposed = true;
      renderer.setAnimationLoop(null);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      systemTheme.removeEventListener('change', updatePalette);
      reduceMotion.removeEventListener('change', handleMotionPreference);
      hero.removeEventListener('pointermove', handlePointer);
      canvas.removeEventListener('webglcontextlost', handleContextLoss);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('pageshow', handlePageShow);
      nodeGeometry.dispose();
      Object.values(nodeMaterials).forEach((material) => material.dispose());
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      canvas.remove();
      delete hero.dataset.threeReady;
    };

    const handlePageHide = (event: PageTransitionEvent) => {
      if (!event.persisted) {
        cleanup();
        return;
      }

      visible = false;
      delete hero.dataset.threeReady;
      updateAnimation();
    };

    updatePalette();
    resize();
    updateLines();
    intersectionObserver.observe(hero);
    resizeObserver.observe(hero);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    systemTheme.addEventListener('change', updatePalette);
    reduceMotion.addEventListener('change', handleMotionPreference);
    hero.addEventListener('pointermove', handlePointer, { passive: true });
    canvas.addEventListener('webglcontextlost', handleContextLoss);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('pageshow', handlePageShow);
    updateAnimation();
  } catch {
    canvas.remove();
  }
}
