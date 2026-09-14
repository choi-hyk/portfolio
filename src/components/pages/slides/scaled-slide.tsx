"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

export function ScaledSlide({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / 1200);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="scaled-slide">
      <div className="scaled-slide-stage" style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
