import { ArrowRight, BarChart3, Globe, Headphones, Music2, ShieldCheck, Star } from 'lucide-react';
import { WhatsAppIcon } from '../../../common/WhatsAppIcon';

const iconMap = {
  star: Star,
  arrowRight: ArrowRight,
  globe: Globe,
  shieldCheck: ShieldCheck,
  barChart: BarChart3,
  headphones: Headphones,
  music: Music2,
};

export function getHomeHeroIcon(name) {
  return iconMap[name] ?? Globe;
}

export { WhatsAppIcon };
