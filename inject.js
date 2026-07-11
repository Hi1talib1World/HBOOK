const fs = require('fs');
const data = {
  brazil: { capital: 'Brasília', currency: 'Real' },
  japan: { capital: 'Tokyo', currency: 'Yen' },
  france: { capital: 'Paris', currency: 'Euro' },
  egypt: { capital: 'Cairo', currency: 'Egyptian Pound' },
  australia: { capital: 'Canberra', currency: 'Australian Dollar' },
  canada: { capital: 'Ottawa', currency: 'Canadian Dollar' },
  italy: { capital: 'Rome', currency: 'Euro' },
  india: { capital: 'New Delhi', currency: 'Indian Rupee' },
  south_africa: { capital: 'Pretoria', currency: 'Rand' },
  mexico: { capital: 'Mexico City', currency: 'Mexican Peso' },
  germany: { capital: 'Berlin', currency: 'Euro' },
  thailand: { capital: 'Bangkok', currency: 'Thai Baht' },
  new_zealand: { capital: 'Wellington', currency: 'New Zealand Dollar' },
  argentina: { capital: 'Buenos Aires', currency: 'Argentine Peso' },
  spain: { capital: 'Madrid', currency: 'Euro' }
};
let c = fs.readFileSync('src/data/countries.ts', 'utf8');
c = c.replace('  language: string;', '  language: string;\n  capital: string;\n  currency: string;');
for (let [id, info] of Object.entries(data)) {
  const re = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?language:\\s*'.*?',)`, 'g');
  c = c.replace(re, `$1\n    capital: '${info.capital}',\n    currency: '${info.currency}',`);
}
fs.writeFileSync('src/data/countries.ts', c);
console.log('done');
