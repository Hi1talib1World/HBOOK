export interface Country {
  id: string;
  name: string;
  continent: string;
  flagImg: string;
  coverImg: string;
  description: string;
  population: string;
  language: string;
  capital: string;
  currency: string;
  funFact: string;
}

export const countries: Country[] = [
  {
    id: 'brazil',
    name: 'Brazil',
    continent: 'South America',
    flagImg: '/assets/flags/brazil.png',
    coverImg: '/assets/brazil_cover.png',
    description: 'The largest country in both South America and Latin America, famous for its Carnival, vibrant culture, and the Amazon Rainforest.',
    population: '214.3 Million',
    language: 'Portuguese',
    capital: 'Brasília',
    currency: 'Real',
    funFact: 'Brazil is home to the world\'s largest biodiversity, containing around 15-20% of the world\'s biological diversity.'
  },
  {
    id: 'japan',
    name: 'Japan',
    continent: 'Asia',
    flagImg: '/assets/flags/japan.png',
    coverImg: '/assets/japan_cover.png', // Fallback to a color or generic if missing
    description: 'An island nation in East Asia known for its deep traditions, cutting-edge technology, and iconic cherry blossoms.',
    population: '125.1 Million',
    language: 'Japanese',
    capital: 'Tokyo',
    currency: 'Yen',
    funFact: 'Japan consists of over 6,800 islands, with the four main islands making up 97% of its land area.'
  },
  {
    id: 'france',
    name: 'France',
    continent: 'Europe',
    flagImg: '/assets/flags/france.png',
    coverImg: '/assets/france_cover.png',
    description: 'A global center for art, science, and philosophy, renowned for its gastronomy, fashion, and the Eiffel Tower.',
    population: '67.7 Million',
    language: 'French',
    capital: 'Paris',
    currency: 'Euro',
    funFact: 'France is the most visited country in the world, welcoming over 89 million international tourists annually.'
  },
  {
    id: 'egypt',
    name: 'Egypt',
    continent: 'Africa',
    flagImg: '/assets/flags/egypt.png',
    coverImg: '/assets/egypt_cover.png',
    description: 'A transcontinental country spanning the northeast corner of Africa, home to the ancient pyramids and the Nile river.',
    population: '109.3 Million',
    language: 'Arabic',
    capital: 'Cairo',
    currency: 'Egyptian Pound',
    funFact: 'The Great Pyramid of Giza is the only remaining structure of the Seven Wonders of the Ancient World.'
  },
  {
    id: 'australia',
    name: 'Australia',
    continent: 'Oceania',
    flagImg: '/assets/flags/australia.png',
    coverImg: '/assets/australia_cover.png',
    description: 'The world\'s smallest continent and largest island, famous for its Outback, kangaroos, and the Great Barrier Reef.',
    population: '25.7 Million',
    language: 'English',
    capital: 'Canberra',
    currency: 'Australian Dollar',
    funFact: 'Australia is wider than the moon; it measures nearly 4,000 km across, while the moon\'s diameter is 3,400 km.'
  },
  {
    id: 'canada',
    name: 'Canada',
    continent: 'North America',
    flagImg: '/assets/flags/canada.png',
    coverImg: '/assets/canada_cover.png',
    description: 'The second-largest country in the world by total area, known for its vast wilderness, maple syrup, and polite locals.',
    population: '38.2 Million',
    language: 'English / French',
    capital: 'Ottawa',
    currency: 'Canadian Dollar',
    funFact: 'Canada has more lakes than the rest of the world\'s countries combined.'
  },
  {
    id: 'italy',
    name: 'Italy',
    continent: 'Europe',
    flagImg: '/assets/flags/italy.png',
    coverImg: '/assets/italy_cover.png',
    description: 'A European country with a long Mediterranean coastline, famous for its history, art, and incredible cuisine.',
    population: '59.1 Million',
    language: 'Italian',
    capital: 'Rome',
    currency: 'Euro',
    funFact: 'Italy has a free, 24-hour public wine fountain in the Abruzzo region.'
  },
  {
    id: 'india',
    name: 'India',
    continent: 'Asia',
    flagImg: '/assets/flags/india.png',
    coverImg: '/assets/india_cover.png',
    description: 'A vast South Asian country with diverse terrain, deeply historic sites, and vibrant festivals like Diwali.',
    population: '1.4 Billion',
    language: 'Hindi / English',
    capital: 'New Delhi',
    currency: 'Indian Rupee',
    funFact: 'The game of chess was invented in India during the Gupta empire around the 6th century AD.'
  },
  {
    id: 'south_africa',
    name: 'South Africa',
    continent: 'Africa',
    flagImg: '/assets/flags/south_africa.png',
    coverImg: '/assets/south_africa_cover.png',
    description: 'A country on the southernmost tip of the African continent, marked by distinct ecosystems and diverse cultures.',
    population: '60.1 Million',
    language: '11 Official Languages',
    capital: 'Pretoria',
    currency: 'Rand',
    funFact: 'South Africa is the only country in the world to have three capital cities: Pretoria, Cape Town, and Bloemfontein.'
  },
  {
    id: 'mexico',
    name: 'Mexico',
    continent: 'North America',
    flagImg: '/assets/flags/mexico.png',
    coverImg: '/assets/mexico_cover.png',
    description: 'Known for its Pacific and Gulf of Mexico beaches, diverse landscape, ancient ruins, and rich culinary traditions.',
    population: '126.7 Million',
    language: 'Spanish',
    capital: 'Mexico City',
    currency: 'Mexican Peso',
    funFact: 'The Chicxulub crater in Mexico was formed by the asteroid that caused the extinction of the dinosaurs.'
  },
  {
    id: 'germany',
    name: 'Germany',
    continent: 'Europe',
    flagImg: '/assets/flags/germany.png',
    coverImg: '/assets/germany_cover.png',
    description: 'A Western European country known for its engineering, history, castles, and the Oktoberfest.',
    population: '83.2 Million',
    language: 'German',
    capital: 'Berlin',
    currency: 'Euro',
    funFact: 'Germany has over 20,000 castles and a tradition of baking more than 3,000 varieties of bread.'
  },
  {
    id: 'thailand',
    name: 'Thailand',
    continent: 'Asia',
    flagImg: '/assets/flags/thailand.png',
    coverImg: '/assets/thailand_cover.png',
    description: 'A Southeast Asian country known for tropical beaches, opulent royal palaces, ancient ruins, and ornate temples.',
    population: '71.6 Million',
    language: 'Thai',
    capital: 'Bangkok',
    currency: 'Thai Baht',
    funFact: 'Thailand is the only Southeast Asian country that was never colonized by a European power.'
  },
  {
    id: 'new_zealand',
    name: 'New Zealand',
    continent: 'Oceania',
    flagImg: '/assets/flags/new_zealand.png',
    coverImg: '/assets/new_zealand_cover.png',
    description: 'An island country in the southwestern Pacific Ocean, known for its dramatic landscapes and Maori culture.',
    population: '5.1 Million',
    language: 'English / Māori',
    capital: 'Wellington',
    currency: 'New Zealand Dollar',
    funFact: 'There are about 5 sheep for every 1 person in New Zealand.'
  },
  {
    id: 'argentina',
    name: 'Argentina',
    continent: 'South America',
    flagImg: '/assets/flags/argentina.png',
    coverImg: '/assets/argentina_cover.png',
    description: 'A massive South American nation known for the Andes mountains, glacial lakes, and Pampas grassland, the traditional grazing ground of its famed beef cattle.',
    population: '45.8 Million',
    language: 'Spanish',
    capital: 'Buenos Aires',
    currency: 'Argentine Peso',
    funFact: 'Argentina is home to both the highest and lowest points of the Southern Hemisphere (Mount Aconcagua and Laguna del Carbón).'
  },
  {
    id: 'spain',
    name: 'Spain',
    continent: 'Europe',
    flagImg: '/assets/flags/spain.png',
    coverImg: '/assets/spain_cover.png',
    description: 'A country on Europe’s Iberian Peninsula, includes 17 autonomous regions with diverse geography and cultures.',
    population: '47.3 Million',
    language: 'Spanish',
    capital: 'Madrid',
    currency: 'Euro',
    funFact: 'Spain produces over half of the world\'s olive oil.'
  }
];

export const getCountryById = (id: string) => countries.find(c => c.id === id);
