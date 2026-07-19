import {
  BarChart3,
  CircleDollarSign,
  Globe,
  Headphones,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Users,
} from 'lucide-react';

/** Map JSON icon keys to Lucide components */
export const HERO_ICON_MAP = {
  Users,
  Rocket,
  MessageCircle,
  ShieldCheck,
  CircleDollarSign,
  BarChart3,
  Headphones,
  Globe,
};

export function getHeroIcon(name) {
  return HERO_ICON_MAP[name] ?? Globe;
}
