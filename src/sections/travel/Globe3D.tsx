import { useRef, useState, useCallback, useEffect } from 'react';
import Globe from 'react-globe.gl';
import type { GlobeMethods } from 'react-globe.gl';

export default function Globe3D() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleGlobeReady = useCallback(() => {
    setLoaded(true);
    const controls = globeRef.current?.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full relative"
      style={{ height: '55vh', minHeight: '400px' }}
    >
      {!loaded && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ backgroundColor: '#030712' }}
        >
          <div className="text-center">
            <div
              className="w-10 h-10 border-2 rounded-full animate-spin mx-auto mb-4"
              style={{
                borderColor: 'rgba(45,212,191,0.15)',
                borderTopColor: '#2DD4BF',
              }}
            />
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Loading Earth...
            </p>
          </div>
        </div>
      )}

      {dimensions.width > 0 && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="#030712"
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
          atmosphereColor="#2DD4BF"
          atmosphereAltitude={0.15}
          enablePointerInteraction={true}
          showAtmosphere={true}
          onGlobeReady={handleGlobeReady}
        />
      )}

      {loaded && (
        <div
          className="absolute bottom-3 left-3 z-20 px-3 py-1.5 rounded-lg text-xs"
          style={{
            backgroundColor: 'rgba(3,7,18,0.7)',
            color: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          Drag to rotate · Scroll to zoom
        </div>
      )}
    </div>
  );
}
