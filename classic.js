const fs = require('fs');
let arg = process.argv;
let S = fs.readFileSync(arg[2]).toString();
let T = fs.readFileSync(arg[3]).toString();
let n = S.length;
let m = T.length;
let shift1 = new Array();
for (let i = 0; i < T.length; i++)
    shift1[T.charAt(i)] = i + 1;
let Tt = '*'.repeat(m) + T;
let shift2 = new Array();
let rpr = new Array();
for (let l = 0; l <= m; l++) {
    let k = m;
    let fl = true;
    while (!(k <= m - l && fl && ((k > 1 && T[k - 2] !== T[m - l - 1]) || k <= 1))) {
        fl = true;
        let subTt = Tt.substring(k + m - 1, k + m + l - 1);
        let subT = T.substring(m - l, m);
        for (let i = 0; i < subTt.length; i++) {
            if (!(subTt[i] === '*' || subT[i] === '*' || subTt[i] === subT[i]))
                fl = false
        }
        k--;
    }
    rpr[l] = k;
}
for (let l = 0; l <= m; l++)
    shift2[l] = m - rpr[l] - l + 1;
let ans = new Array();
console.time('Boyer-Moore');
for (let i = 0; i < n - m; i++) {
    let l = 0;
    while (l < m) {
        if (S[i + m - l - 1] !== T[m - l - 1])
            break;
        l++;
    }
    if (l === m)
        ans.push(i);
    let char = S[i + m - l - 1];
    if (shift1[char])
        i += Math.max(Math.max(m - l - shift1[char], 1), shift2[l]) - 1;
    else
        i += Math.max(Math.max(m - l, 1), shift2[l]) - 1;
}
console.timeEnd('Boyer-Moore');
console.log(ans.join(' '));