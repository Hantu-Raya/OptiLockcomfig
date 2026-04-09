import type { VideoSetting } from "@utils/deadlockData";

interface Props {
  setting: VideoSetting;
  value: string;
  onChange: (key: string, value: string) => void;
}

export default function VideoSettingControl({ setting, value, onChange }: Props) {
  const id = "vset-" + setting.key.replace(/./g, "-");
  if (setting.type === "boolean") {
    const checked = value === "1" || value === "true";
    return (
      <div className="d-flex justify-content-between align-items-center mb-2">
        <label htmlFor={id} className="form-label mb-0 small">{setting.label}</label>
        <div className="form-check form-switch mb-0">
          <input className="form-check-input" type="checkbox" role="switch" id={id}
            checked={checked} onChange={(e) => onChange(setting.key, e.target.checked ? "true" : "false")} />
        </div>
      </div>
    );
  }
  if (setting.type === "enum") {
    return (
      <div className="mb-2">
        <label htmlFor={id} className="form-label small">{setting.label}</label>
        <select id={id} className="form-select form-select-sm"
          value={value} onChange={(e) => onChange(setting.key, e.target.value)}>
          {(setting.options ?? []).map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <div className="mb-2">
      <label htmlFor={id} className="form-label small">
        {setting.label}: <strong>{value}</strong>
      </label>
      <input id={id} type="range" className="form-range"
        min={setting.min} max={setting.max} step={setting.step}
        value={value} onChange={(e) => onChange(setting.key, e.target.value)} />
    </div>
  );
}
