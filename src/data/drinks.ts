import { StaticImageData } from "next/image";
import sunrisemango from "../../assets/sunrisemango.png";
import midnightberry from "../../assets/midnightberry.png";
import citrusgrove from "../../assets/citrusgrove.png";
import emeraldmatcha from "../../assets/emeraldmatcha.png";
import oceanmist from "../../assets/oceanmist.png";
import avocadomilkshake from "../../assets/avocadomilkshake.png";
import bananamilkshake from "../../assets/bananamilkshake.png";
import lemonmist from "../../assets/lemonmist.png";
import strawberry from "../../assets/strawberry.png";

export interface Drink {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  color: string;
  accent: string;
  image: string | StaticImageData;
  ingredients: string[];
}

export const drinks: Drink[] = [
  {
    id: "sunrise-mango",
    name: "Sunrise Mango",
    tagline: "Tropical burst in every sip",
    description:
      "A vibrant blend of ripe Alphonso mango, passion fruit, and a hint of ginger. Cold-pressed and never from concentrate.",
    price: 4.99,
    color: "#FF6B35",
    accent: "#FFB347",
    image: sunrisemango,
    ingredients: ["Alphonso Mango", "Passion Fruit", "Ginger", "Sparkling Water"],
  },
  {
    id: "midnight-berry",
    name: "Midnight Berry",
    tagline: "Deep, dark, delicious",
    description:
      "Blackberry, acai, and blueberry unite in this antioxidant-rich elixir. Smooth, bold, and refreshingly tart.",
    price: 5.49,
    color: "#4A1942",
    accent: "#9B59B6",
    image: midnightberry,
    ingredients: ["Blackberry", "Acai", "Blueberry", "Elderflower"],
  },
  {
    id: "citrus-grove",
    name: "Citrus Grove",
    tagline: "Sun-kissed and sharp",
    description:
      "Blood orange, yuzu, and Meyer lemon create a bright, zesty profile. Perfect for golden hour refreshment.",
    price: 4.79,
    color: "#E67E22",
    accent: "#F1C40F",
    image: citrusgrove,
    ingredients: ["Blood Orange", "Yuzu", "Meyer Lemon", "Mint"],
  },
  {
    id: "emerald-matcha",
    name: "Emerald Matcha",
    tagline: "Calm energy, clean taste",
    description:
      "Ceremonial-grade matcha whisked with oat milk and a touch of vanilla. Smooth, earthy, and gently energizing.",
    price: 5.99,
    color: "#1B4332",
    accent: "#52B788",
    image: emeraldmatcha,
    ingredients: ["Ceremonial Matcha", "Oat Milk", "Vanilla", "Honey"],
  },
  {
    id: "ocean-mist",
    name: "Ocean Mist",
    tagline: "Coastal cool, bottled",
    description:
      "Coconut water, cucumber, and sea salt electrolytes. Hydration reimagined for active days and lazy afternoons.",
    price: 4.49,
    color: "#0077B6",
    accent: "#90E0EF",
    image: oceanmist,
    ingredients: ["Coconut Water", "Cucumber", "Sea Salt", "Lime"],
  },
  {
    id: "avocado-milkshake",
    name: "Avocado Milkshake",
    tagline: "Silky green indulgence",
    description:
      "Creamy avocado blended with vanilla ice cream and a touch of lime for a velvety treat.",
    price: 5.49,
    color: "#7FB069",
    accent: "#A8E6CF",
    image: avocadomilkshake,
    ingredients: ["Avocado", "Vanilla Ice Cream", "Lime", "Oat Milk"],
  },
  {
    id: "banana-milkshake",
    name: "Banana Milkshake",
    tagline: "Classic, nostalgic, rich",
    description:
      "Ripe bananas whisked with caramel and milk for a timeless creamy shake.",
    price: 4.99,
    color: "#F2C94C",
    accent: "#F7E6A8",
    image: bananamilkshake,
    ingredients: ["Banana", "Milk", "Caramel", "Vanilla"],
  },
  {
    id: "lemon-mist",
    name: "Lemon Mist",
    tagline: "Bright and breezy",
    description:
      "Lemon, honey, and sparkling water with a rosemary sprig — a refreshing lift.",
    price: 4.29,
    color: "#F6E05E",
    accent: "#FFF7C2",
    image: lemonmist,
    ingredients: ["Lemon", "Honey", "Sparkling Water", "Rosemary"],
  },
  {
    id: "strawberry-bliss",
    name: "Strawberry Bliss",
    tagline: "Sweet summer in a glass",
    description:
      "Strawberries, cream, and a hint of basil — vivid, sweet, and aromatic.",
    price: 5.29,
    color: "#FF6B81",
    accent: "#FFB6C1",
    image: strawberry,
    ingredients: ["Strawberry", "Cream", "Basil", "Sugar"],
  },
];
