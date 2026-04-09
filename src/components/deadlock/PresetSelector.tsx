import { PRESETS } from "@utils/deadlockData";
import { useDeadlockStore } from "@store/deadlock";

const TIER_LABEL: Record<string, string> = {
  performance: "Performance",
  balanced: "Balanced",
  quality: "Quality",
};

export default function PresetSelector() {
  const { selectedPreset, setSelectedPreset } = useDeadlockStore();
  const preset = PRESETS.find((entry) => entry.id === selectedPreset) ?? PRESETS[0];

  return (
    <section className="dl-section">
      <h2 className="fw-semibold mb-4">
        <span className="fas fa-box-open fa-fw" aria-hidden="true"></span>
        Choose a preset
      </h2>
      <ul className="nav nav-pills bg-teal-nav dl-preset-nav" role="tablist" aria-label="Deadlock presets">
        {PRESETS.map((entry) => (
          <li key={entry.id} className="nav-item" role="presentation">
            <button
              className={"nav-link" + (selectedPreset === entry.id ? " active" : "")}
              type="button"
              role="tab"
              aria-selected={selectedPreset === entry.id}
              onClick={() => setSelectedPreset(entry.id)}
            >
              {entry.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="dl-panel dl-preset-detail">
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">
          <div>
            <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
              <h3 className="h4 mb-0">{preset.name}</h3>
              <span className={"dl-tier-badge " + preset.tier}>{TIER_LABEL[preset.tier]}</span>
            </div>
            <p className="dl-preset-meta mb-2">by {preset.author}</p>
            <p className="mb-0">{preset.description}</p>
          </div>
          <div className="dl-preset-tip">
            {preset.id === "high-end"
              ? "High-End unlocks the detailed video settings editor below."
              : "Pick a preset, toggle the addons you want, then generate your package."}
          </div>
        </div>
      </div>
    </section>
  );
}
