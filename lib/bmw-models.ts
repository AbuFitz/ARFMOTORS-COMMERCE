// Centralized BMW model compatibility data for ARFMODS

export const BMW_MODELS = {
  "1-series": {
    name: "1 Series",
    generations: ["F20/F21", "F40"],
    displayName: "1 Series (F20/F21, F40)",
  },
  "2-series": {
    name: "2 Series",
    generations: ["F22/F23", "F44", "G42"],
    displayName: "2 Series (F22/F23, F44, G42)",
  },
  "3-series": {
    name: "3 Series",
    generations: ["F30/F31/F34", "G20/G21"],
    displayName: "3 Series (F30/F31/F34, G20/G21)",
  },
  "4-series": {
    name: "4 Series",
    generations: ["F32/F33/F36", "G22/G23/G26"],
    displayName: "4 Series (F32/F33/F36, G22/G23/G26)",
  },
  "5-series": {
    name: "5 Series",
    generations: ["F10/F11", "G30/G31", "G60/G61"],
    displayName: "5 Series (F10/F11, G30/G31, G60/G61)",
  },
  "x-models": {
    name: "X Models",
    generations: ["X1-X7", "F/G generations"],
    displayName: "X Models (X1-X7, F/G generations)",
  },
};

export const BMW_MODEL_GENERATIONS = [
  "1 Series (F20/F21, F40)",
  "2 Series (F22/F23, F44, G42)",
  "3 Series (F30/F31/F34, G20/G21)",
  "4 Series (F32/F33/F36, G22/G23/G26)",
  "5 Series (F10/F11, G30/G31, G60/G61)",
  "X Models (X1-X7, F/G generations)",
];

export const MODEL_CATEGORIES = [
  {
    id: "1-series",
    name: "1 Series",
    models: ["F20/F21", "F40"],
    image: "/model/1series.jpg",
  },
  {
    id: "2-series",
    name: "2 Series",
    models: ["F22/F23", "F44", "G42"],
    image: "/model/2series.jpg",
  },
  {
    id: "3-series",
    name: "3 Series",
    models: ["F30/F31/F34", "G20/G21"],
    image: "/model/3series.jpeg",
  },
  {
    id: "4-series",
    name: "4 Series",
    models: ["F32/F33/F36", "G22/G23/G26"],
    image: "/model/4series.jpg",
  },
  {
    id: "5-series",
    name: "5 Series",
    models: ["F10/F11", "G30/G31", "G60/G61"],
    image: "/model/5series.jpg",
  },
  {
    id: "x-models",
    name: "X Models",
    models: ["X1-X7 (F/G generations)"],
    image: "/model/xseries.jpg",
  },
];
