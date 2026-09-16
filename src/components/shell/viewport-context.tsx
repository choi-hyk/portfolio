"use client";

import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

type PortfolioViewportContextValue = {
  scrollLayout: boolean;
  occludedLeft: number;
  ready: boolean;
};

type PortfolioViewportProviderProps = {
  children: ReactNode;
};

const PortfolioViewportContext = createContext<PortfolioViewportContextValue>({
  scrollLayout: false,
  occludedLeft: 0,
  ready: false,
});

const EXPANDED_SIDEBAR_OCCLUSION = 232;
const touchLayoutQuery = "(hover: none) and (pointer: coarse)";

export function isScrollLayout() {
  return (
    window.innerWidth <= 768 ||
    window.matchMedia(touchLayoutQuery).matches ||
    window.innerWidth <= window.screen.availWidth / 2
  );
}

export function PortfolioViewportProvider({
  children,
}: PortfolioViewportProviderProps) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const updateSidebarVisibility = () => {
      setIsSidebarVisible(!isScrollLayout());
      setReady(true);
    };

    const touchLayout = window.matchMedia(touchLayoutQuery);
    updateSidebarVisibility();
    window.addEventListener("resize", updateSidebarVisibility);

    touchLayout.addEventListener("change", updateSidebarVisibility);
    return () => {
      window.removeEventListener("resize", updateSidebarVisibility);
      touchLayout.removeEventListener("change", updateSidebarVisibility);
    };
  }, []);

  return (
    <PortfolioViewportContext.Provider
      value={{
        scrollLayout: ready && !isSidebarVisible,
        occludedLeft: isSidebarVisible ? EXPANDED_SIDEBAR_OCCLUSION : 0,
        ready,
      }}
    >
      <div data-scroll-layout={ready && !isSidebarVisible}>{children}</div>
    </PortfolioViewportContext.Provider>
  );
}

export function usePortfolioViewport() {
  return useContext(PortfolioViewportContext);
}
