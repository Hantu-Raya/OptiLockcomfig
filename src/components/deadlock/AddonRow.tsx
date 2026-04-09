import type { DeadlockAddon } from "@utils/deadlockData";

interface Props {
  addon: DeadlockAddon;
  enabled: boolean;
  onToggle: (id: string) => void;
}

const CATEGORY_LABEL: Record<string, string> = {
  performance: "Performance",
  fix: "Fix",
  visual: "Visual",
};

export default function AddonRow({ addon, enabled, onToggle }: Props) {
  return (
    <div className="dl-addon-row">
      <div className="dl-addon-info">
        <div className="dl-addon-name">{addon.name}</div>
        <div className="dl-addon-badges">
          {addon.recommended && <span className="badge dl-recommended">Recommended</span>}
          <span className="badge dl-category-badge">{CATEGORY_LABEL[addon.category]}</span>
        </div>
        <div className="dl-addon-desc">{addon.description}</div>
      </div>
      <div className="form-check form-switch mb-0">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id={"addon-" + addon.id}
          checked={enabled}
          onChange={() => onToggle(addon.id)}
        />
      </div>
    </div>
  );
}
