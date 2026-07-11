export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string; // Used to pick the Ionicons dynamically or map to one
  colorClass: string; // The CSS class for the background (e.g., 'orange-box')
}

export const badgesData: Badge[] = [
  {
    id: 'first_spin',
    name: 'First Spin',
    description: 'The start of something big',
    iconName: 'refresh',
    colorClass: 'orange-box'
  },
  {
    id: 'europe_expert',
    name: 'Europe Expert',
    description: 'Visited France',
    iconName: 'search',
    colorClass: 'green-box'
  },
  {
    id: 'flag_bearer',
    name: 'Flag Bearer',
    description: 'Collect 3 flags',
    iconName: 'flag',
    colorClass: 'red-box'
  },
  {
    id: 'globe_trotter',
    name: 'Globe Trotter',
    description: 'Visit 5 countries',
    iconName: 'globe',
    colorClass: 'blue-box'
  },
  {
    id: 'trivia_king',
    name: 'Trivia King',
    description: 'Earn 1000 XP',
    iconName: 'medal',
    colorClass: 'purple-box'
  }
];
