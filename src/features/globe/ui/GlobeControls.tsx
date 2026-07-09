import { RotateCcw } from "lucide-react";
import { globeActions } from "../store";

export function GlobeControls() {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => globeActions.resetView()}
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-card backdrop-blur transition-colors hover:bg-surface"
        aria-label="Reset globe view"
      >
        <RotateCcw className="size-3.5" />
        Reset view
      </button>
    </div>
  );
}
