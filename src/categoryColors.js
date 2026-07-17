// Fixed hue per category, assigned by the category's position in the master
// `categories` list (not by rank in any chart) so a color always means the
// same category everywhere it appears — chart bars and register badges alike.
export const CATEGORY_COLORS = {
  food: "var(--cat-food)",
  housing: "var(--cat-housing)",
  utilities: "var(--cat-utilities)",
  transport: "var(--cat-transport)",
  entertainment: "var(--cat-entertainment)",
  salary: "var(--cat-salary)",
  other: "var(--cat-other)",
};

export const FALLBACK_COLOR = "var(--cat-other)";
