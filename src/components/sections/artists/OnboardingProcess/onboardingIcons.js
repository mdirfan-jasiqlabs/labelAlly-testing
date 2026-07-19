import {
  ArrowDown,
  ArrowRight,
  ChartNoAxesCombined,
  FileCheck2,
  FileChartColumn,
  FileUp,
  Globe2,
  Headphones,
  MessageCircle,
  Music2,
  Rocket,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from 'lucide-react';

const iconMap = {
  rocket: Rocket,
  fileUpload: FileUp,
  fileCheck: FileCheck2,
  music: Music2,
  globe: Globe2,
  chartGrowth: ChartNoAxesCombined,
  spark: Sparkles,
  shieldCheck: ShieldCheck,
  fileChart: FileChartColumn,
  users: UsersRound,
  headphones: Headphones,
  arrowRight: ArrowRight,
  arrowDown: ArrowDown,
  messageCircle: MessageCircle,
};

/**
 * Resolve serializable icon keys from JSON to Lucide components.
 */
export function getOnboardingIcon(name) {
  return iconMap[name] ?? Rocket;
}
