import {
  Check,
  Disc3,
  Mic2,
  ShieldCheck,
  Users,
} from 'lucide-react';

const iconMap = {
  users: Users,
  mic2: Mic2,
  disc3: Disc3,
  shieldCheck: ShieldCheck,
  rightsProtection: ShieldCheck,
  check: Check,
  // legacy keys
  artistMusic: Mic2,
  team: Disc3,
};

/**
 * Resolve serializable icon keys from JSON to Lucide components.
 */
export function getWhoWeWorkWithIcon(name) {
  return iconMap[name] ?? Users;
}
