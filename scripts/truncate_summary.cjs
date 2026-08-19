const fs = require('fs');
const path = 'c:/Users/ivani/OneDrive/Escritorio/Math/src/data/curriculum.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/conceptSummary: '(.*?)'/g, (match, p1) => {
  const parts = p1.split('.');
  let first = parts[0].trim();
  if (!first) return match;
  return `conceptSummary: '${first}.'`;
});

fs.writeFileSync(path, content);
