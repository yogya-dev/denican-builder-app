export const edukasiShortPreset = {
  id: "edukasi-short",
  label: "Edukasi (Short)",
  project: {
    defaultName: "Project Edukasi Anak",
    language: "id"
  },
  dialog: {
    type: "edukasi"
  },
  scenes: [
    {
      id: 1,
      duration: 2,
      mood: "curious",
      action: "introducing learning topic"
    },
    {
      id: 2,
      duration: 3,
      mood: "cheerful",
      action: "explaining with simple example"
    },
    {
      id: 3,
      duration: 3,
      mood: "focused",
      action: "showing learning activity"
    },
    {
      id: 4,
      duration: 2,
      mood: "happy",
      action: "summarizing what was learned"
    }
  ]
};
