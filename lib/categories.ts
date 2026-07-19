import {
  AirVent,
  Droplets,
  Flame,
  Refrigerator,
  Tv,
  WashingMachine,
  Waves,
  Wind,
} from "lucide-react";
import { Reveal } from "@/components/reveal";

export const categories = [
  {
    id: "6a59cc526311465bc33e8f2a",
    label: "Washing Machines",
    icon: WashingMachine,
    from: "var(--brand-violet)",
    to: "var(--brand-indigo)",
  },
  {
    id: "6a5b1523a31b2935df6e53cb",
    label: "Air Conditioners",
    icon: AirVent,
    from: "var(--brand-blue)",
    to: "var(--brand-cyan)",
  },
  {
    id: "6a5b7583aaa67ac663e83e03",
    label: "Geysers",
    icon: Flame,
    from: "var(--brand-orange)",
    to: "var(--brand-rose)",
  },
  {
    id: "6a5b758aaaa67ac663e83e04",
    label: "RO Systems",
    icon: Droplets,
    from: "var(--brand-cyan)",
    to: "var(--brand-teal)",
  },
  {
    id: "6a5b758faaa67ac663e83e05",
    label: "Water Purifiers",
    icon: Waves,
    from: "var(--brand-teal)",
    to: "var(--brand-green)",
  },
  {
    id: "6a5b152fa31b2935df6e53cc",
    label: "Refrigerators",
    icon: Refrigerator,
    from: "var(--brand-indigo)",
    to: "var(--brand-blue)",
  },
  {
    id: "6a5b7595aaa67ac663e83e06",
    label: "LED TVs",
    icon: Tv,
    from: "var(--brand-pink)",
    to: "var(--brand-violet)",
  },
  {
    id: "6a5b759eaaa67ac663e83e07",
    label: "Floor Mill",
    icon: Wind,
    from: "var(--brand-amber)",
    to: "var(--brand-orange)",
  },
];
