import fs from 'fs';
const arrayStr = fs.readFileSync('original_projects.json', 'utf8');

// The arrayStr has JS variables and expressions, so we can't just JSON.parse it.
// We can use a dynamic Function to evaluate it in a context where the variable names are defined,
// or just print/analyze it.
// Let's see what external variables are referenced in it.
const varNames = Array.from(arrayStr.matchAll(/[a-zA-Z0-9_]+/g)).map(m => m[0]);
const uniqueVars = [...new Set(varNames)].filter(v => {
  // Filter out keywords, numbers, string-like things
  return !/^\d+$/.test(v) && !['id', 'title', 'titleEN', 'category', 'images', 'description', 'descriptionEN', 'materials', 'materialsEN', 'location', 'locationEN', 'year', 'true', 'false', 'null', 'undefined'].includes(v);
});
console.log("Variables referenced in the array:", uniqueVars);

// Let's create a sandbox context with all these variables mapped to string placeholders so eval doesn't fail.
const sandbox = {};
uniqueVars.forEach(v => {
  sandbox[v] = `__VAR_${v}__`;
});

const evalFn = new Function(...Object.keys(sandbox), `return ${arrayStr};`);
try {
  const result = evalFn(...Object.values(sandbox));
  console.log(`Evaluated successfully! Total items: ${result.length}`);
  result.forEach((p, idx) => {
    console.log(`${idx + 1}. ID: ${p.id}, Title: "${p.title}", Category: "${p.category}"`);
  });
} catch (err) {
  console.error("Evaluation failed:", err);
}
