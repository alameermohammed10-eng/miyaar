import React, { useEffect, useRef } from 'react';

export const HeroCanvas3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates for interactive perspective tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      targetX = x * 0.0008;
      targetY = y * 0.0008;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Geometric 3D Prism Nodes (representing Miyaar precision standard)
    // Vertices of an octahedron / faceted standard prism
    const nodes = [
      { x: 0, y: -130, z: 0 },   // Top apex
      { x: 100, y: 0, z: 70 },   // Front right
      { x: -100, y: 0, z: 70 },  // Front left
      { x: 0, y: 0, z: -110 },   // Back apex
      { x: 0, y: 130, z: 0 },    // Bottom apex
    ];

    // Edges connecting vertices
    const edges = [
      [0, 1], [0, 2], [0, 3],
      [4, 1], [4, 2], [4, 3],
      [1, 2], [2, 3], [3, 1],
    ];

    // Ambient floating particles
    const particles: { x: number; y: number; z: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 500,
        y: (Math.random() - 0.5) * 400,
        z: (Math.random() - 0.5) * 300,
        size: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    let angleY = 0;
    let angleX = 0.2;

    const render = () => {
      // Smooth mouse interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      angleY += 0.004 + mouseX * 0.02;
      angleX = 0.15 + mouseY * 0.05;

      ctx.clearRect(0, 0, width, height);

      const fov = 380;
      const cx = width / 2;
      const cy = height / 2;

      // Draw subtle ambient particles
      particles.forEach((p) => {
        // Rotate around Y
        const cosY = Math.cos(angleY * 0.4);
        const sinY = Math.sin(angleY * 0.4);
        const px = p.x * cosY - p.z * sinY;
        const pz = p.z * cosY + p.x * sinY + 300;

        if (pz > 10) {
          const scale = fov / pz;
          const sx = cx + px * scale;
          const sy = cy + p.y * scale;

          ctx.beginPath();
          ctx.arc(sx, sy, p.size * scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha * 0.4})`;
          ctx.fill();
        }
      });

      // Transform 3D prism nodes
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const projected = nodes.map((node) => {
        // Rotate Y
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;

        // Rotate X
        let y2 = node.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y * sinX + 340; // Perspective depth

        const scale = fov / z2;
        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          scale,
          z: z2,
        };
      });

      // Draw Edges
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];

        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.15, Math.min(0.85, 1 - (avgZ - 200) / 300));

        // Outer glow stroke
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(212, 175, 55, ${alpha * 0.25})`;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Inner crisp stroke
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(229, 197, 104, ${alpha * 0.8})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Draw Nodes / Corner Anchors
      projected.forEach((p, idx) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, idx === 0 || idx === 4 ? 4.5 * p.scale : 3.5 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#E5C568';
        ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    />
  );
};
