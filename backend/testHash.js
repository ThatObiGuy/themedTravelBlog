// testHash.js
const crypto = require('crypto');

const input = 'admin';
const hashedText = crypto.createHash('sha256').update(input).digest('hex');
console.log('Input:', input);
console.log('Hashed Text:', hashedText);

/*
Input: AdventureTime123
Hashed Text: db1160e4448dbf5cfcb869f4c53e2630c45bf3d62c09fd07122b02f411f22a1e

Input: LadyRainicorn99
Hashed Text: 10704a99411469d17971fa4d93fbbb4e5e97083d080a527a5956d992519c4cb2

Input: WhoWantsPMO8888
Hashed Text: d2798218ffb65fb3ca5d69f63662dc17bfbdeb08792416b934667f97a43704db

Input: ScienceRules2023
Hashed Text: 5f693a4c3cdbe5a9cb2e1593ffa67c32ad582862e92bac828fd27df7e15f8b92

Input: VampireQueen1000
Hashed Text: 666ea0ecfb2938d00d8e534d53008f57a87b364ee0ab5af873d18d8e851c3b36

Input: WenkWenk12345
Hashed Text: 644229615ed57b2b0dc27c12cd130afd5e5f8bdba7493f0574948b5d5df41678

Input: admin
Hashed Text: 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918

'node testHash.js' to run.

*/