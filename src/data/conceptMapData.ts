// Concept Map Data - Separated for maintainability and reusability

export interface ConceptNode {
  id: string;
  title: string;
  shortTitle: string;
  status: "completed" | "current" | "locked" | "available";
  difficulty: "easy" | "medium" | "hard";
  hasHardSpot: boolean;
  prerequisites: string[];
  row: number;
  col: number;
}

export interface Connection {
  from: string;
  to: string;
}

// Define concepts with row/col for clean grid layout
export const concepts: ConceptNode[] = [
  {
    id: "motion-basics",
    title: "What is Motion?",
    shortTitle: "Motion Basics",
    status: "completed",
    difficulty: "easy",
    hasHardSpot: false,
    prerequisites: [],
    row: 0,
    col: 1,
  },
  {
    id: "speed-velocity",
    title: "Speed and Velocity",
    shortTitle: "Speed & Velocity",
    status: "completed",
    difficulty: "easy",
    hasHardSpot: false,
    prerequisites: ["motion-basics"],
    row: 1,
    col: 0,
  },
  {
    id: "acceleration",
    title: "Understanding Acceleration",
    shortTitle: "Acceleration",
    status: "completed",
    difficulty: "medium",
    hasHardSpot: false,
    prerequisites: ["motion-basics"],
    row: 1,
    col: 2,
  },
  {
    id: "first-law",
    title: "Newton's First Law (Inertia)",
    shortTitle: "First Law",
    status: "current",
    difficulty: "medium",
    hasHardSpot: true,
    prerequisites: ["speed-velocity", "acceleration"],
    row: 2,
    col: 1,
  },
  {
    id: "second-law",
    title: "Newton's Second Law (F=ma)",
    shortTitle: "Second Law",
    status: "available",
    difficulty: "hard",
    hasHardSpot: true,
    prerequisites: ["first-law"],
    row: 3,
    col: 0,
  },
  {
    id: "third-law",
    title: "Newton's Third Law (Action-Reaction)",
    shortTitle: "Third Law",
    status: "locked",
    difficulty: "medium",
    hasHardSpot: false,
    prerequisites: ["first-law"],
    row: 3,
    col: 2,
  },
  {
    id: "friction",
    title: "Friction and Its Types",
    shortTitle: "Friction",
    status: "locked",
    difficulty: "medium",
    hasHardSpot: true,
    prerequisites: ["second-law", "third-law"],
    row: 4,
    col: 1,
  },
];

// Connection definitions
export const connections: Connection[] = [
  { from: "motion-basics", to: "speed-velocity" },
  { from: "motion-basics", to: "acceleration" },
  { from: "speed-velocity", to: "first-law" },
  { from: "acceleration", to: "first-law" },
  { from: "first-law", to: "second-law" },
  { from: "first-law", to: "third-law" },
  { from: "second-law", to: "friction" },
  { from: "third-law", to: "friction" },
];

// Layout constants
export const MAP_CONSTANTS = {
  NODE_WIDTH: 160,
  NODE_HEIGHT: 56,
  ROW_GAP: 100,
  COL_WIDTH: 200,
  PADDING: 80,
} as const;
