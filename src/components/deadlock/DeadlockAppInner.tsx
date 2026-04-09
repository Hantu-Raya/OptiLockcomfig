import { useDeadlockStore } from "@store/deadlock";
import PresetSelector from "./PresetSelector";
import AddonToggle from "./AddonToggle";
import VideoSettingsEditor from "./VideoSettingsEditor";
import InstallFlow from "./InstallFlow";

export default function DeadlockAppInner() {
  const selectedPreset = useDeadlockStore((state) => state.selectedPreset);

  return (
    <div className="deadlock-app">
      <section className="row text-light dl-content-shell">
        <div className="col-12 col-xxl-2"></div>
        <div className="col">
          <div className="card card-container text-light dl-main-card">
            <div className="dl-banner">
              <img src="/deadlock/backgrounds/bg1.jpg" alt="Deadlock" />
              <div className="dl-banner-content">
                <h1>OptiLock</h1>
                <p>Deadlock Performance Configurator</p>
              </div>
            </div>
            <PresetSelector />
            <hr />
            <AddonToggle />
            {selectedPreset === "high-end" && (
              <>
                <hr />
                <VideoSettingsEditor />
              </>
            )}
            <hr />
            <InstallFlow />
          </div>
        </div>
        <div className="col-12 col-xxl-2"></div>
      </section>
    </div>
  );
}
