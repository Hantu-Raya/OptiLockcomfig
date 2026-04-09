export interface DeadlockPreset {
  id: string; name: string; description: string; author: string;
  tier: "performance" | "balanced" | "quality";
  files: { gameinfo: string; video?: string };
}
export interface DeadlockAddon {
  id: string; name: string; description: string; fileName: string; filePath: string;
  recommended: boolean; category: "visual" | "performance" | "fix";
}
export type VideoSettingType = "boolean" | "enum" | "number";
export interface VideoSettingOption { value: string; label: string }
export interface VideoSetting {
  key: string; label: string; type: VideoSettingType; defaultValue: string;
  options?: VideoSettingOption[]; min?: number; max?: number; step?: number;
  category: "display" | "shadows" | "effects" | "postprocessing" | "particles";
}
export const PRESETS = [
  { id: "default", name: "Default Settings", description: "Valve default Deadlock configuration.", author: "Valve", tier: "balanced" as const, files: { gameinfo: "/deadlock/configs/default/gameinfo.gi" } },
  { id: "boots-max-fps", name: "boot Max FPS", description: "Aggressive performance preset.", author: "boot", tier: "performance" as const, files: { gameinfo: "/deadlock/configs/boots-max-fps/gameinfo.gi" } },
  { id: "high-end", name: "High-End", description: "High-quality settings for powerful rigs.", author: "OptiLock", tier: "quality" as const, files: { gameinfo: "/deadlock/configs/high-end/gameinfo.gi", video: "/deadlock/configs/high-end/video.txt" } },
  { id: "kaiz-min-spec", name: "Kaiz Min Spec", description: "Minimum-spec preset for low-end hardware.", author: "Kaiz", tier: "performance" as const, files: { gameinfo: "/deadlock/configs/kaiz-min-spec/gameinfo.gi" } },
  { id: "optilock", name: "OptiLock", description: "The recommended balanced preset.", author: "OptiLock", tier: "balanced" as const, files: { gameinfo: "/deadlock/configs/optilock/gameinfo.gi" } },
];
export const ADDONS = [
  { id: "black-skybox", name: "Black Skybox Mod", description: "Replaces skybox with plain black.", fileName: "pak19_dir.vpk", filePath: "/deadlock/addons/black-skybox/pak19_dir.vpk", recommended: true, category: "performance" as const },
  { id: "optimized-soul", name: "Optimized Soul Container", description: "Optimises soul orb visual effects.", fileName: "pak01_dir.vpk", filePath: "/deadlock/addons/optimized-soul/pak01_dir.vpk", recommended: true, category: "performance" as const },
  { id: "sinner-light-fix", name: "Sinner Light Fix Mod", description: "Fixes distracting light effects on Sinclair model.", fileName: "pak26_dir.vpk", filePath: "/deadlock/addons/sinner-light-fix/pak26_dir.vpk", recommended: false, category: "fix" as const },
  { id: "vindicta-scope", name: "Vindicta Scope Downscale", description: "Downscales Vindicta scope overlay.", fileName: "pak89_dir.vpk", filePath: "/deadlock/addons/vindicta-scope/pak89_dir.vpk", recommended: false, category: "visual" as const },
];
export const VIDEO_SETTINGS: VideoSetting[] = [
  { key: "setting.defaultres", label: "Resolution Width", type: "number", defaultValue: "1920", min: 800, max: 7680, step: 1, category: "display" },
  { key: "setting.defaultresheight", label: "Resolution Height", type: "number", defaultValue: "1080", min: 600, max: 4320, step: 1, category: "display" },
  { key: "setting.refreshrate_numerator", label: "Refresh Rate Hz", type: "number", defaultValue: "144", min: 60, max: 360, step: 1, category: "display" },
  { key: "setting.fullscreen", label: "Fullscreen Mode", type: "enum", defaultValue: "1", options: [{ value: "0", label: "Borderless Windowed" }, { value: "1", label: "Exclusive Fullscreen" }], category: "display" },
  { key: "setting.mat_vsync", label: "V-Sync", type: "boolean", defaultValue: "0", category: "display" },
  { key: "setting.r_low_latency", label: "Low Latency Mode", type: "boolean", defaultValue: "1", category: "display" },
  { key: "setting.fps_max", label: "FPS Cap 0=unlimited", type: "number", defaultValue: "0", min: 0, max: 999, step: 1, category: "display" },
  { key: "setting.high_dpi", label: "High DPI", type: "boolean", defaultValue: "0", category: "display" },
  { key: "setting.r_citadel_antialiasing", label: "Anti-Aliasing", type: "enum", defaultValue: "0", options: [{ value: "0", label: "Off" }, { value: "1", label: "FXAA" }, { value: "2", label: "MSAA 2x" }, { value: "3", label: "MSAA 4x" }], category: "display" },
  { key: "setting.r_citadel_upscaling", label: "Upscaling", type: "enum", defaultValue: "0", options: [{ value: "0", label: "Off" }, { value: "1", label: "FSR2" }, { value: "2", label: "DLSS" }], category: "display" },
  { key: "setting.mat_viewportscale", label: "Render Scale", type: "number", defaultValue: "1", min: 0.5, max: 1, step: 0.05, category: "display" },
  { key: "setting.r_shadows", label: "Shadows", type: "boolean", defaultValue: "1", category: "shadows" },
  { key: "setting.r_citadel_shadow_quality", label: "Shadow Quality", type: "enum", defaultValue: "0", options: [{ value: "0", label: "Low" }, { value: "1", label: "Medium" }, { value: "2", label: "High" }], category: "shadows" },
  { key: "setting.csm_viewmodel_shadows", label: "Viewmodel Shadows", type: "boolean", defaultValue: "0", category: "shadows" },
  { key: "setting.lb_enable_shadow_casting", label: "Light Shadow Casting", type: "boolean", defaultValue: "false", category: "shadows" },
  { key: "setting.lb_dynamic_shadow_resolution", label: "Dynamic Shadow Resolution", type: "boolean", defaultValue: "false", category: "shadows" },
  { key: "setting.r_effects_bloom", label: "Bloom", type: "boolean", defaultValue: "false", category: "effects" },
  { key: "setting.r_post_bloom", label: "Post Bloom", type: "boolean", defaultValue: "false", category: "effects" },
  { key: "setting.r_depth_of_field", label: "Depth of Field", type: "boolean", defaultValue: "false", category: "effects" },
  { key: "setting.r_citadel_motion_blur", label: "Motion Blur", type: "boolean", defaultValue: "0", category: "effects" },
  { key: "setting.r_reduce_flash", label: "Reduce Flash", type: "boolean", defaultValue: "1", category: "effects" },
  { key: "setting.r_arealights", label: "Area Lights", type: "boolean", defaultValue: "true", category: "effects" },
  { key: "setting.r_citadel_ssao", label: "SSAO", type: "boolean", defaultValue: "0", category: "effects" },
  { key: "setting.r_citadel_fog_quality", label: "Fog Quality", type: "enum", defaultValue: "0", options: [{ value: "0", label: "Off" }, { value: "1", label: "Low" }, { value: "2", label: "High" }], category: "effects" },
  { key: "setting.r_distancefield_enable", label: "Distance Field", type: "boolean", defaultValue: "true", category: "effects" },
  { key: "setting.r_citadel_outlines", label: "Outlines", type: "boolean", defaultValue: "1", category: "effects" },
  { key: "setting.r_light_sensitivity_mode", label: "Light Sensitivity Mode", type: "boolean", defaultValue: "false", category: "effects" },
  { key: "setting.shaderquality", label: "Shader Quality", type: "enum", defaultValue: "1", options: [{ value: "0", label: "Low" }, { value: "1", label: "High" }], category: "postprocessing" },
  { key: "setting.r_displacement_mapping", label: "Displacement Mapping", type: "boolean", defaultValue: "0", category: "postprocessing" },
  { key: "setting.r_dashboard_render_quality", label: "Dashboard Render Quality", type: "enum", defaultValue: "1", options: [{ value: "0", label: "Low" }, { value: "1", label: "High" }], category: "postprocessing" },
  { key: "setting.r_fullscreen_gamma", label: "Gamma", type: "number", defaultValue: "2.2", min: 1.0, max: 3.0, step: 0.1, category: "postprocessing" },
  { key: "setting.cpu_level", label: "CPU Level", type: "enum", defaultValue: "2", options: [{ value: "0", label: "Low" }, { value: "1", label: "Medium" }, { value: "2", label: "High" }], category: "postprocessing" },
  { key: "setting.gpu_level", label: "GPU Level", type: "enum", defaultValue: "2", options: [{ value: "0", label: "Low" }, { value: "1", label: "Medium" }, { value: "2", label: "High" }], category: "postprocessing" },
  { key: "setting.gpu_mem_level", label: "GPU Memory Level", type: "enum", defaultValue: "2", options: [{ value: "0", label: "Low 4GB" }, { value: "1", label: "Medium 4-6GB" }, { value: "2", label: "High 6GB+" }], category: "postprocessing" },
  { key: "setting.r_particle_max_detail_level", label: "Particle Detail", type: "enum", defaultValue: "0", options: [{ value: "0", label: "Low" }, { value: "1", label: "Medium" }, { value: "2", label: "High" }], category: "particles" },
  { key: "setting.r_particle_shadows", label: "Particle Shadows", type: "boolean", defaultValue: "0", category: "particles" },
  { key: "setting.r_particle_cables_cast_shadows", label: "Particle Cable Shadows", type: "boolean", defaultValue: "0", category: "particles" },
  { key: "setting.r_particle_depth_feathering", label: "Particle Depth Feathering", type: "boolean", defaultValue: "false", category: "particles" },
  { key: "setting.r_citadel_half_res_noisy_effects", label: "Half-Res Noisy Effects", type: "boolean", defaultValue: "true", category: "particles" },
  { key: "setting.cl_particle_fallback_base", label: "Particle Fallback Base", type: "number", defaultValue: "6", min: 0, max: 10, step: 1, category: "particles" },
  { key: "setting.cl_particle_fallback_multiplier", label: "Particle Fallback Multiplier", type: "number", defaultValue: "4", min: 0, max: 10, step: 1, category: "particles" },
];