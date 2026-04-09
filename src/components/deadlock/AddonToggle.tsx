import { ADDONS } from "@utils/deadlockData";
import { useDeadlockStore } from "@store/deadlock";
import AddonRow from "./AddonRow";

export default function AddonToggle() {
  const { enabledAddons, toggleAddon } = useDeadlockStore();
  return (
    <section className="dl-section">
      <h2 className="fw-semibold mb-4">
        <span className="fas fa-circle-plus fa-fw" aria-hidden="true"></span>
        Select addons
      </h2>
      <div className="dl-panel dl-addon-list">
        <div className="p-0">
          {ADDONS.map((addon) => (
            <AddonRow
              key={addon.id}
              addon={addon}
              enabled={enabledAddons.includes(addon.id)}
              onToggle={toggleAddon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
