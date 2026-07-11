const fs = require('fs');
const path = require('path');
const icons = require('ionicons/icons');
const srcDir = 'src/pages';
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.tsx'));
let missing = [];
files.forEach(f => {
  const content = fs.readFileSync(path.join(srcDir, f), 'utf8');
  const matches = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]ionicons\/icons['"]/);
  if (matches) {
    matches[1].split(',').forEach(i => {
      const name = i.trim();
      if (name && !icons[name]) {
        missing.push({ file: f, icon: name });
      }
    });
  }
});
console.log(JSON.stringify(missing, null, 2));
