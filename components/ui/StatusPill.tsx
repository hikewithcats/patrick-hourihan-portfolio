import type { ProjectStatus } from "@/lib/projects";

/**
 * Status indicator. Color encodes meaning but is paired with a text label and
 * a shape, so it never relies on color alone.
 */
const TONE: Record<ProjectStatus, { dot: string; text: string; ring: string }> = {
  "Live in production": {
    dot: "bg-moss",
    text: "text-moss",
    ring: "ring-moss/30",
  },
  "In development": {
    dot: "bg-ember",
    text: "text-ember-soft",
    ring: "ring-ember/30",
  },
  "In development — working prototype": {
    dot: "bg-ember",
    text: "text-ember-soft",
    ring: "ring-ember/30",
  },
  "Draft — awaiting verified URL": {
    dot: "bg-cream-faint",
    text: "text-cream-dim",
    ring: "ring-line",
  },
};

export default function StatusPill({ status }: { status: ProjectStatus }) {
  const tone = TONE[status];
  const live = status === "Live in production";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-ink-2/70 px-3 py-1 text-xs font-medium ring-1 ${tone.ring} ${tone.text}`}
    >
      <span className="relative flex h-2 w-2">
        {live && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-moss/50 motion-reduce:hidden" />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${tone.dot}`} />
      </span>
      {status}
    </span>
  );
}
