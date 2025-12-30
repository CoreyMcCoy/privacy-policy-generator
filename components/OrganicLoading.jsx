"use client";

import React, { useState, useEffect } from "react";

export default function OrganicLoading() {
  const [particles, setParticles] = useState([]);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.5 + 0.2,
      direction: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.6 + 0.3,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x:
            (particle.x + Math.cos(particle.direction) * particle.speed + 100) %
            100,
          y:
            (particle.y + Math.sin(particle.direction) * particle.speed + 100) %
            100,
          direction: particle.direction + (Math.random() - 0.5) * 0.1,
        }))
      );

      // Update connections
      setConnections((prev) => {
        const newConnections = [];
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i]?.x - particles[j]?.x;
            const dy = particles[i]?.y - particles[j]?.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 25 && Math.random() > 0.7) {
              newConnections.push({
                id: `${i}-${j}`,
                x1: particles[i]?.x,
                y1: particles[i]?.y,
                x2: particles[j]?.x,
                y2: particles[j]?.y,
                opacity: Math.max(0, (25 - distance) / 25) * 0.3,
              });
            }
          }
        }
        return newConnections;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [particles]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-slate-50 to-slate-100 flex flex-col items-center justify-start pt-[30vh] relative overflow-hidden">
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            transform: "translate(-50%, -50%)",
            transition: "all 0.1s ease-out",
          }}
        />
      ))}

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map((connection) => (
          <line
            key={connection.id}
            x1={`${connection.x1}%`}
            y1={`${connection.y1}%`}
            x2={`${connection.x2}%`}
            y2={`${connection.y2}%`}
            stroke="rgba(99, 102, 241, 0.4)"
            strokeWidth="1"
            opacity={connection.opacity}
            className="animate-pulse"
          />
        ))}
      </svg>

      {/* Central breathing element */}
      <div className="relative z-10">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-300 via-slate-500 to-gry-400 shadow-2xl animate-pulse relative">
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 animate-ping opacity-75" />

          {/* Core */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100 shadow-inner" />
        </div>

        {/* Ripple effects */}
        <div className="absolute inset-0 rounded-full border-2 border-slate-300 animate-ping opacity-30" />
        <div
          className="absolute inset-[-8px] rounded-full border border-slate-200 animate-ping opacity-20"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute inset-[-16px] rounded-full border border-slate-200 animate-ping opacity-10"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Loading text */}
      <div className="mt-12 z-10">
        <p className="text-slate-600 font-light text-lg tracking-wide animate-pulse">
          Loading
        </p>
      </div>
    </div>
  );
}
