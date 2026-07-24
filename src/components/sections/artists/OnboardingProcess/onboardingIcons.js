import {
  ArrowDown,
  ArrowRight,
  ChartNoAxesCombined,
  CloudUpload,
  FileCheck2,
  FileChartColumn,
  FileUp,
  Globe2,
  Headphones,
  Mail,
  MessageCircle,
  Music2,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserRound,
  UsersRound,
} from 'lucide-react';

const iconMap = {
  rocket: Rocket,
  fileUpload: FileUp,
  fileCheck: FileCheck2,
  music: Music2,
  globe: Globe2,
  chartGrowth: ChartNoAxesCombined,
  mail: Mail,
  search: Search,
  user: UserRound,
  cloudUpload: CloudUpload,
  trophy: Trophy,
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
