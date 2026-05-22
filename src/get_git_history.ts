import { execSync } from 'child_process';
import * as fs from 'fs';

try {
  // Let's run a git log search for commits that touched App.tsx to see what we have
  console.log('Running git log...');
  const log = execSync('git log --oneline -n 15', { encoding: 'utf8' });
  console.log('Last 15 commits:\n', log);

  // Let's search inside git history for instances of "process" inside src/App.tsx
  console.log('Searching git history for process section changes...');
  const diffs = execSync('git log -p -S "step1Img" -- src/App.tsx', { encoding: 'utf8' });
  fs.writeFileSync('src/git_diff_output.txt', diffs);
  console.log('Successfully wrote git diff history to src/git_diff_output.txt');
} catch (e) {
  console.error('Error running git commands:', e);
}
