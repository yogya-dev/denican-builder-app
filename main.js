// ================= Veo 3 JSON Prompt Builder — MAIN.JS (FINAL MODE-BASED) =================
// Stabil, rapi, dan siap dikembangkan


// ================= IMPORTS =================
import { phraseDictionary } from "./dictionary/index.js";
import { presetRegistry } from "./presets/index.js";
import { contextInference } from "./context/inference.js";
import { visualStyleByMode } from "./visual/styleByMode.js";
import { actionEnhance } from "./dictionary/actionEnhance.js";

// ================= WORD DICTIONARY =================
const wordDictionary = {
  anak: "child",
  mewarnai: "coloring",
  belajar: "studying",
  dengan: "with",
  di: "at",
  yang: ""
};

// ================= TRANSLATE HELPERS =================
function translate(text) {
  if (!text) return "";
  let result = text.toLowerCase();

  Object.keys(phraseDictionary)
    .sort((a, b) => b.length - a.length)
    .forEach(p => {
      result = result.replace(
        new RegExp(`\\b${p}\\b`, "g"),
        phraseDictionary[p]
      );
    });

  result = result
    .split(/\s+/)
    .map(t => {
      const clean = t.replace(/[^a-z]/g, "");
      const suffix = t.replace(/[a-z]/g, "");
      return (wordDictionary[clean] ?? clean) + suffix;
    })
    .join(" ");

  return result.replace(/\s+/g, " ").trim();
}

// ================= SCENE HELPERS =================
function getSceneType(i, total) {
  if (i === 1) return "hook";
  if (i === total) return "cta";
  if (total > 4 && i === Math.ceil(total / 2)) return "detail";
  return "content";
}

function adaptiveAction(type, base) {
  const map = {
    hook: `preparing to ${base}`,
    content: `starting ${base}`,
    detail: `focusing while ${base}`,
    cta: `showing result after ${base}`
  };
  return map[type];
}

function adaptiveMood(type) {
  return {
    hook: "curious",
    content: "cheerful",
    detail: "focused",
    cta: "happy and proud"
  }[type];
}

// ================= CAMERA & FRAMING DEFAULT =================
function getCameraPreset(sceneType) {
  const presets = {
    hook: {
      shot: "close-up",
      movement: "dynamic zoom-in",
      background: "clean indoor background"
    },
    content: {
      shot: "medium shot",
      movement: "steady camera",
      background: "simple indoor background"
    },
    detail: {
      shot: "close-up",
      movement: "static framing",
      background: "minimal background"
    },
    cta: {
      shot: "wide shot",
      movement: "slow pull back",
      background: "clean contextual background"
    }
  };

  return presets[sceneType] || presets.content;
}

// ================= MODE-BASED CAMERA BEHAVIOR =================
function applyModeToCamera(camera, mode) {
  const modifiers = {
    softselling: {
      movementSuffix: "smooth cinematic motion"
    },
    edukasi: {
      movementSuffix: "stable educational framing"
    },
    story: {
      movementSuffix: "dynamic storytelling motion"
    }
  };

  if (!mode || !modifiers[mode]) return camera;

  return {
    ...camera,
    movement: `${camera.movement}, ${modifiers[mode].movementSuffix}`
  };
}

// ================= VISUAL STYLE HELPERS =================
function applyVisualStyleByMode(mode) {
  if (!mode || !visualStyleByMode[mode]) return "";

  const style = visualStyleByMode[mode];

  return [
    style.lighting,
    style.color,
    style.atmosphere,
    style.contrast
  ].join(", ");
}

// ================= SCENE PACING & RHYTHM =================
function getScenePacing(sceneType) {
  const pacing = {
    hook: "fast-paced and attention-grabbing",
    content: "smooth and comfortable pacing",
    detail: "slower pace with focused attention",
    cta: "short and impactful pacing"
  };

  return pacing[sceneType] || pacing.content;
}

// ================= OUTPUT POLISHER =================
function normalizeText(text) {
  if (!text) return "";

  return text
    .replace(/\s+/g, " ")        // spasi ganda
    .replace(/,\s*,+/g, ", ")    // koma ganda
    .replace(/\s+,/g, ",")       // spasi sebelum koma
    .replace(/,\s*$/g, "")       // koma di akhir
    .trim();
}

function removeDuplicatePhrases(text) {
  if (!text) return "";

  const parts = text.split(",").map(p => p.trim());
  const unique = [];

  parts.forEach(p => {
    if (!unique.includes(p)) {
      unique.push(p);
    }
  });

  return unique.join(", ");
}

function polishOutput(text) {
  return removeDuplicatePhrases(
    normalizeText(text)
  );
}

// ================= CONTEXT INFERENCE HELPERS =================
function applyContextInference(text) {
  let additions = [];

  Object.keys(contextInference).forEach(key => {
    if (text.includes(key)) {
      const rule = contextInference[key];
      if (rule.environment) additions.push(rule.environment);
      if (rule.mood) additions.push(rule.mood);
    }
  });

  return additions.length ? `${text}, ${additions.join(", ")}` : text;
}

// ================= ACTION ENRICHMENT HELPERS =================
function applyActionEnrichment(actionText) {
  if (!actionText) return actionText;

  const lower = actionText.toLowerCase();

  for (const key in actionEnhance) {
    if (lower.includes(key)) {
      return actionEnhance[key];
    }
  }

  return actionText;
}

// ================= FALLBACK HELPERS =================
function fallback(value, defaultValue) {
  if (!value || value.trim() === "") return defaultValue;
  return value;
}

// ================= DIALOG MODE =================
function generateDialogByMode(mode, sceneType, tema) {
  const dialogs = {
    softselling: {
      hook: `Belajar ${tema} jadi lebih seru!`,
      content: `Dengan cara yang tepat, ${tema} jadi mudah dipahami.`,
      detail: `Anak jadi fokus dan menikmati proses belajar.`,
      cta: `Yuk mulai sekarang dan rasakan bedanya!`
    },
    edukasi: {
      hook: `Tahukah kamu apa itu ${tema}?`,
      content: `Mari kita pelajari ${tema} bersama-sama.`,
      detail: `Perhatikan dengan baik agar lebih paham.`,
      cta: `Hebat! Kamu sudah belajar ${tema}.`
    },
    story: {
      hook: `Suatu hari, ada anak yang ingin belajar ${tema}.`,
      content: `Ia mencoba dengan penuh semangat.`,
      detail: `Ia fokus dan tidak menyerah.`,
      cta: `Akhirnya, ia berhasil belajar ${tema}.`
    }
  };

  return dialogs[mode]?.[sceneType] || "";
}


// ================= PROJECT STORAGE =================
const STORAGE_KEY = "veo_projects";
const LAST_PROJECT_KEY = "veo_last_project";

function getProjects() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

function setLastProjectId(id) {
  localStorage.setItem(LAST_PROJECT_KEY, id);
}

function getLastProjectId() {
  return localStorage.getItem(LAST_PROJECT_KEY);
}

function renderProjectList() {
  const select = document.getElementById("projectList");
  const projects = getProjects();
  select.innerHTML = "";

  if (projects.length === 0) {
    const opt = document.createElement("option");
    opt.textContent = "-- Belum ada project --";
    opt.disabled = true;
    opt.selected = true;
    select.appendChild(opt);
    return;
  }

  projects.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = `${p.title} — ${p.meta.tema}`;
    select.appendChild(opt);
  });
}

// ================= SAVE PROJECT =================
function saveProject(result, dialogType) {
  const projects = getProjects();

  const baseTitle = result.project;
  const temaValue = tema.value;

  const same = projects.filter(
    p => p.title === baseTitle && p.meta.tema.startsWith(temaValue)
  );

  let finalTema = temaValue;

  if (same.length > 0) {
    let copyIndex = 1;
    same.forEach(p => {
      const m = p.meta.tema.match(/\(Copy\s*(\d+)?\)$/);
      if (m) {
        const n = m[1] ? parseInt(m[1]) : 1;
        if (n >= copyIndex) copyIndex = n + 1;
      }
    });

    finalTema =
      copyIndex === 1
        ? `${temaValue} (Copy)`
        : `${temaValue} (Copy ${copyIndex})`;
  }

  const newProject = {
    id: "p-" + Date.now(),
    title: baseTitle,
    meta: {
      tema: finalTema,
      totalScenes: result.total_scenes,
      visual_id: visual_id.value,
      action_id: action_id.value,
      autoTranslate: autoTranslate.checked
    },

    global_config: {
  platform: "veo-3",
  target: "video_short",
  aspect_ratio: "9:16",
  lighting: MODE_VISUAL_STYLE[dialogType]?.lighting || "",
  color_style: MODE_VISUAL_STYLE[dialogType]?.color || ""
},

  scenes: result.scenes,
  created_at: new Date().toISOString()
  };

  projects.unshift(newProject);
  saveProjects(projects);
  setLastProjectId(newProject.id);
  renderProjectList();
}

// ================= MODE VISUAL STYLE (GLOBAL) =================
const MODE_VISUAL_STYLE = {
  softselling: {
    lighting: "bright studio light",
    color: "vibrant colors"
  },
  edukasi: {
    lighting: "soft daylight",
    color: "soft pastel"
  },
  story: {
    lighting: "warm indoor light",
    color: "cinematic warm"
  }
};

// ================= COPY & DOWNLOAD =================
function renderSceneButtons(scenes) {
  const container = document.getElementById("sceneButtons");
  container.innerHTML = "";

  scenes.forEach(scene => {
    const wrap = document.createElement("div");
    wrap.style.marginTop = "6px";

    const btnPrompt = document.createElement("button");
    btnPrompt.textContent = `Copy Scene ${scene.scene} Prompt`;
    btnPrompt.addEventListener("click", () => {
    const promptText = JSON.stringify(scene, null, 2);
    navigator.clipboard.writeText(promptText);

    outputEl.textContent =
      `✔️ Scene ${scene.scene} prompt copied`;
      setTimeout(() => {
      outputEl.textContent = "";
      }, 1500);
});


    const btnDialog = document.createElement("button");
    btnDialog.textContent = `Copy Scene ${scene.scene} Dialog`;
    btnDialog.addEventListener("click", () => {
    navigator.clipboard.writeText(scene.dialog || "");

    outputEl.textContent =
      `✔️ Scene ${scene.scene} dialog copied`;
});


    wrap.appendChild(btnPrompt);
    wrap.appendChild(btnDialog);
    container.appendChild(wrap);
  });
}

// ================= MAIN / INIT =================
 document.addEventListener("DOMContentLoaded", () => {

  // ================= STATE =================
  let lastGeneratedResult = null;
  let activeMode = null;
  let activeDialogType = null;

  const MODE_TO_PRESET = {
    softselling: "softselling-short",
    edukasi: "edukasi-short",
    story: "story-short"
  };

  // ================= DOM ELEMENTS =================
  const generateBtn = document.getElementById("generateBtn");
  const projectList = document.getElementById("projectList");
  const loadProjectBtn = document.getElementById("loadProjectBtn");
  const duplicateProjectBtn = document.getElementById("duplicateProjectBtn");
  const outputEl = document.getElementById("output");
  const downloadAllBtn = document.getElementById("downloadAllBtn");
  const modeButtons = document.querySelectorAll(".mode-btn");
  const modeIndicator = document.getElementById("modeIndicator");
  const modeHint = document.getElementById("modeHint");
  const resetProjectsBtn = document.getElementById("resetProjectsBtn");


   // ================= DEFAULT UI STATE =================
  if (modeIndicator) {
  modeIndicator.textContent = "Mode aktif: - (pilih mode terlebih dahulu)";
  }
  generateBtn.disabled = true;
  generateBtn.style.opacity = "0.5";
  modeHint.style.display = "block";

  // ================= APPLY MODE / PRESET =================
  function applyPreset(preset) {
  // JANGAN set activeDialogType dari preset
  projectTitle.value = preset.project.defaultName;
}

// ================= HELPER =================
function setInputsDisabled(disabled) {
  projectTitle.disabled = disabled;
  tema.disabled = disabled;
  totalScenes.disabled = disabled;
  visual_id.disabled = disabled;
  action_id.disabled = disabled;
}

   // Helper MarkDirty
function markDirty() {
  if (!activeDialogType) return; // belum pilih mode
  generateBtn.disabled = false;
  generateBtn.style.opacity = "1";
}
  [
    projectTitle,
    tema,
    totalScenes,
    visual_id,
    action_id
  ].forEach(input => {
    input.addEventListener("input", markDirty);
});

  // ================= UI EVENTS =================
    // == MODE BUTTONS ==
  modeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
  const mode = btn.dataset.mode;
  const style = MODE_VISUAL_STYLE[mode];

  // 🔒 CEK DULU
  if (activeMode === mode) return;

  // ✅ BARU SET STATE
  activeMode = mode;
  activeDialogType = mode;

  const presetKey = MODE_TO_PRESET[mode];
  const preset = presetRegistry[presetKey];

  if (!preset) {
    alert("Preset belum tersedia");
    return;
  }

  applyPreset(preset);

  // UPDATE UI
    modeButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    if (modeIndicator) {
  modeIndicator.textContent = `Mode aktif: ${btn.textContent}`;
  }

if (modeHint) {
  modeHint.style.display = "none";
  }

    modeHint.style.display = "none";

    generateBtn.disabled = false;
    generateBtn.style.opacity = "1";
    setInputsDisabled(false);
  });
});

   // == GENERATE ==
generateBtn?.addEventListener("click", () => {
  if (!activeDialogType) {
    alert("Pilih mode konten terlebih dahulu");
    return;
  }
  // === FALLBACK MODE ===
  if (!activeDialogType) {
    activeDialogType = "edukasi";
  }
  // === FALLBACK TEMA ===
  const temaText = tema.value && tema.value.trim()
    ? tema.value
    : "aktivitas belajar";
  
  const title = projectTitle.value || "Untitled Project";
  const visualWithContext = applyContextInference(visualEN);

  // === FALLBACK TOTAL SCENE ===
  const total = Math.max(
    3,
    parseInt(totalScenes.value, 10) || 3
);

  const rawVisual = fallback(
  visual_id.value,
  "a child in a learning environment"
);

  const rawAction = fallback(
  action_id.value,
  "learning calmly"
);

  const visualEN = autoTranslate.checked
    ? translate(rawVisual)
    : rawVisual;

  const actionEN = autoTranslate.checked
    ? translate(rawAction)
    : rawAction;

  const actionFinal = applyActionEnrichment(actionEN);


  // ✅ ambil visual style dari mode
  const visualStyle = MODE_VISUAL_STYLE[activeDialogType];

  // ✅ deklarasi scenes DI ATAS
  const scenes = [];

  // ✅ loop baru push
  for (let i = 1; i <= total; i++) {
  const type = getSceneType(i, total);
  const baseCamera = getCameraPreset(type);
  const camera = applyModeToCamera(baseCamera, activeMode);


  const visualStyle = applyVisualStyleByMode(activeMode);
  const pacing = getScenePacing(type);
  const visualFinal = `${visualWithContext}, ${camera.shot}, ${camera.movement}, ${camera.background}, ${visualStyle}, ${pacing}`;



  scenes.push({
    scene: i,
    type,
    visual: polishOutput(visualFinal),
    action: polishOutput(adaptiveAction(type, actionFinal)
  ),
    mood: adaptiveMood(type),
    dialog: generateDialogByMode(activeDialogType, type, temaText)
  });
}


  const result = {
    project: title,
    total_scenes: total,
    scenes: scenes
  };

  lastGeneratedResult = result;
  saveProject(result);
  renderSceneButtons(scenes);
  outputEl.textContent = JSON.stringify(result, null, 2);
  const info = document.createElement("div");
    info.textContent = "✔ Prompt berhasil dibuat. Kamu bisa copy atau download.";
    info.style.fontSize = "12px";
    info.style.color = "#16a34a";
    info.style.marginBottom = "6px";

outputEl.parentNode.insertBefore(info, outputEl);


  // kunci generate sampai dirty state aktif lagi
  generateBtn.disabled = true;
  generateBtn.style.opacity = "0.5";
});

    // == LOAD PROJECT ==
  loadProjectBtn?.addEventListener("click", () => {
    const p = getProjects().find(x => x.id === projectList.value);
    if (!p) return;
  document.getElementById("visualStyleInfo").textContent =
  "Visual Style: -";

    projectTitle.value = p.title;
    tema.value = p.meta.tema;
    totalScenes.value = p.meta.totalScenes;
    visual_id.value = p.meta.visual_id;
    action_id.value = p.meta.action_id;
    autoTranslate.checked = p.meta.autoTranslate;

    outputEl.textContent = JSON.stringify(p, null, 2);

    setInputsDisabled(true);

    activeMode = null;
    activeDialogType = null;

    modeButtons.forEach(b => b.classList.remove("active"));
    if (modeIndicator) {
    modeIndicator.textContent = "Mode aktif: -";
    }

    if (modeHint) {
    modeHint.style.display = "block";
    }

    generateBtn.disabled = true;
    generateBtn.style.opacity = "0.5";



  });

    // == DUPLICATE ==
  duplicateProjectBtn?.addEventListener("click", () => {
    const p = getProjects().find(x => x.id === projectList.value);
    if (!p) return;

    const copy = JSON.parse(JSON.stringify(p));
    copy.id = "p-" + Date.now();
    copy.created_at = new Date().toISOString();
    getProjects().unshift(copy);
    saveProjects(getProjects());
    renderProjectList();
  });

    // == RESET ==
    resetProjectsBtn?.addEventListener("click", () => {
  const ok = confirm(
    "Semua project akan dihapus.\nTindakan ini tidak bisa dibatalkan.\n\nLanjutkan?"
  );
  if (!ok) return;

  // hapus data project
  localStorage.removeItem("veo_projects");
  localStorage.removeItem("veo_last_project");

  // reload UI
  location.reload();
});

    // == DOWNLOAD ==
  downloadAllBtn?.addEventListener("click", () => {
    if (!lastGeneratedResult) {
      alert("Generate dulu sebelum download");
      return;
    }
    downloadAllScenes(
      lastGeneratedResult.project,
      lastGeneratedResult.scenes
    );
  });

  // ================= FIRST LOAD =================
  renderProjectList();
  setInputsDisabled(true);

});
