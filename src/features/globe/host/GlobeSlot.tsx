import { useEffect, useId, useRef, useState } from "react";
import { globeActions } from "../store";
import type { GlobeVariant } from "../types";
import { hasWebGL } from "../performance";
import { SVGGlobe } from "../fallback/SVGGlobe";
import { GlobeTooltip } from "../ui/GlobeTooltip";
import { GlobeSearch } from "../ui/GlobeSearch";
import { GlobeControls } from "../ui/GlobeControls";

type Props = {
  variant: GlobeVariant;
  interactive?: boolean;
  showControls?: boolean;
  showSearch?: boolean;
  autoRotate?: boolean;
  className?: string;
};

export function GlobeSlot({
  variant,
  interactive = true,
  showControls = true,
  showSearch = true,
  autoRotate = true,
  className,
}: Props) {
  const id = useId();
  const hostRef = useRef<HTMLDivElement>(null);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    setWebgl(hasWebGL());
  }, []);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const publish = () => {
      const r = el.getBoundingClientRect();
      globeActions.setActiveSlot({
        id,
        variant,
        rect: { x: r.left, y: r.top, width: r.width, height: r.height },
        interactive,
        showControls,
        showSearch,
        autoRotate,
      });
    };
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    window.addEventListener("scroll", publish, { passive: true });
    window.addEventListener("resize", publish);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", publish);
      window.removeEventListener("resize", publish);
      globeActions.setActiveSlot(null);
    };
  }, [id, variant, interactive, showControls, showSearch, autoRotate]);

  return (
    <div
      ref={hostRef}
      className={className}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {/* Layout placeholder — the WebGL canvas is portalled from GlobeHost */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, oklch(0.94 0.03 235 / 0.7), transparent 65%)",
        }}
        aria-hidden
      />
      {!webgl && (
        <div className="absolute inset-0">
          <SVGGlobe />
        </div>
      )}
      {webgl && showSearch && (
        <div className="pointer-events-auto absolute left-4 top-4 z-10 w-full max-w-xs sm:max-w-sm">
          <GlobeSearch />
        </div>
      )}
      {webgl && showControls && (
        <div className="pointer-events-auto absolute right-4 top-4 z-10">
          <GlobeControls />
        </div>
      )}
      {webgl && <GlobeTooltip />}
    </div>
  );
}
