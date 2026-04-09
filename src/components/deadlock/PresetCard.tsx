import type { DeadlockPreset } from "@utils/deadlockData";

interface Props {
  preset: DeadlockPreset;
  active: boolean;
  onSelect: (id: string) => void;
}

const TIER_LABEL: Record<string, string> = {
  performance: "Performance",
  balanced: "Balanced",
  quality: "Quality",
};

export default function PresetCard({ preset, active, onSelect }: Props) {
  return (
    <div
      className={"dl-card" + (active ? " dl-card--active" : "")}
      onClick={() => onSelect(preset.id)}
      role="radio"
      aria-checked={active}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect(preset.id)}
    >
      <div className="dl-card-body">
        <div className={"dl-tier-badge " + preset.tier}>{TIER_LABEL[preset.tier]}</div>
        <div className="dl-card-name">{preset.name}</div>
        <div className="dl-card-author">by {preset.author}</div>
        <div className="dl-card-desc">{preset.description}</div>
      </div>
    </div>
  );
}