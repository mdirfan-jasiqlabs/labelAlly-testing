import {
  Check,
  Music2,
  ShieldCheck,
  Users,
  UsersRound,
} from 'lucide-react';

const iconMap = {
  users: Users,
  artistMusic: Music2,
  team: UsersRound,
  rightsProtection: ShieldCheck,
  check: Check,
  shieldCheck: ShieldCheck,
};

/**
 * Resolve serializable icon keys from JSON to Lucide components.
 */
export function getWhoWeWorkWithIcon(name) {
  return iconMap[name] ?? Users;
}
