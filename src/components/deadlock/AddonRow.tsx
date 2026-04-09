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
    <div className="col">
      <a
        className={"card text-start addon-card h-100" + (enabled ? " active" : "")}
        href="#"
        role="checkbox"
        aria-checked={enabled}
        onClick={(e) => {
          e.preventDefault();
          onToggle(addon.id);
        }}
      >
        <div className="card-body">
          <h5 className="card-title">{addon.name}</h5>
          <div className="mb-2">
            {addon.recommended && (
              <span className="badge dl-recommended me-1">Recommended</span>
            )}
            <span className="badge dl-category-badge">
              {CATEGORY_LABEL[addon.category]}
            </span>
          </div>
          <p className="card-text">{addon.description}</p>
        </div>
      </a>
    </div>
  );
}
