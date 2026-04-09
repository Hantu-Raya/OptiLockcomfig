import { useDeadlockStore } from "@store/deadlock";
import { installDeadlockConfig } from "@utils/deadlock";

export default function InstallFlow() {
  const { installStatus, installError, setInstallStatus } = useDeadlockStore();

  async function handleInstall() {
    setInstallStatus("installing");
    try {
      await installDeadlockConfig();
      setInstallStatus("success");
    } catch (e: any) {
      setInstallStatus("error", e?.message ?? "Unknown error");
    }
  }

  return (
    <section className="dl-section">
      <h2 className="fw-semibold mb-4">
        <span className="fas fa-cloud-download fa-fw" aria-hidden="true"></span>
        Download your files
      </h2>
      <div className="dl-panel dl-install-panel">
        <>
          <p className="lead mb-2">
            <button className="btn btn-primary" onClick={handleInstall} disabled={installStatus === "installing"}>
              {installStatus === "installing" ? "Preparing..." : "Download ZIP"}
            </button>
          </p>
          <p className="dl-helper-copy mb-0">
            Download your selected config as a ZIP file, then extract it into your Deadlock game folder.
          </p>
        </>
        {installStatus === "success" && <div className="alert alert-success mt-3 py-2">Config installed successfully!</div>}
        {installStatus === "error" && <div className="alert alert-danger mt-3 py-2">Error: {installError}</div>}
      </div>
    </section>
  );
}
