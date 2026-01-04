export const softsellingShortPreset = {
  id: "softselling-short",
  label: "Soft Selling (Short)",
  project: {
    defaultName: "Project Soft Selling",
    language: "id"
  },
  dialog: {
    type: "soft_selling"
  },
  scenes: [
    {
      id: 1,
      duration: 2,
      mood: "curious",
      action: "introducing product"
    },
    {
      id: 2,
      duration: 3,
      mood: "cheerful",
      action: "showing benefits"
    },
    {
      id: 3,
      duration: 3,
      mood: "happy",
      action: "demonstrating usage"
    },
    {
      id: 4,
      duration: 2,
      mood: "confident",
      action: "inviting audience to try"
    }
  ]
};
