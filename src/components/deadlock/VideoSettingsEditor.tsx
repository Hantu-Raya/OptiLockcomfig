import { VIDEO_SETTINGS } from "@utils/deadlockData";
import { useDeadlockStore } from "@store/deadlock";
import VideoSettingControl from "./VideoSettingControl";

const CATEGORIES = [
  { key: "display", label: "Display" },
  { key: "shadows", label: "Shadows" },
  { key: "effects", label: "Effects" },
  { key: "postprocessing", label: "Post-Processing" },
  { key: "particles", label: "Particles" },
] as const;

export default function VideoSettingsEditor() {
  const { videoOverrides, setVideoOverride, selectedPreset } = useDeadlockStore();
  if (selectedPreset !== "high-end") return null;
  return (
    <section className="dl-section">
      <h2 className="fw-semibold mb-3">
        <span className="fas fa-sliders fa-fw" aria-hidden="true"></span>
        Customize
      </h2>
      <p className="dl-helper-copy">
        Fine tune the High-End preset with the same compact control rhythm used in the main configurator.
      </p>
      <div className="accordion" id="videoAccordion">
        {CATEGORIES.map((cat, i) => {
          const settings = VIDEO_SETTINGS.filter((s) => s.category === cat.key);
          return (
            <div key={cat.key} className="accordion-item">
              <h2 className="accordion-header">
                <button className={"accordion-button" + (i > 0 ? " collapsed" : "")}
                  type="button" data-bs-toggle="collapse"
                  data-bs-target={"#cat-" + cat.key}>
                  {cat.label}
                </button>
              </h2>
              <div id={"cat-" + cat.key} className={"accordion-collapse collapse" + (i === 0 ? " show" : "")}
                data-bs-parent="#videoAccordion">
                <div className="accordion-body">
                  {settings.map((s) => (
                    <VideoSettingControl key={s.key} setting={s}
                      value={videoOverrides[s.key] ?? s.defaultValue}
                      onChange={setVideoOverride} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
