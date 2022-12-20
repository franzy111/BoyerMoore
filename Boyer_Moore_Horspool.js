let fs = require('fs');
let arg = process.argv;
let pattern = new String();
let text = new String();
try {
    text = fs.readFileSync(arg[2]).toString();
    pattern = fs.readFileSync(arg[3]).toString();
} catch (err) {
    console.log(err);
}
let textLength = text.length;
let patternLength = pattern.length;
let unique_value = new Set();
let shift = new Array();
for (let i = (patternLength - 2); i >= 0; i--) {
    if (!unique_value.has(pattern.charAt(i))) {
        shift[pattern.charAt(i)] = patternLength - i - 1;
        unique_value.add(pattern.charAt(i));
    }
}
if (!unique_value.has(pattern.charAt(patternLength - 1)))
    shift[pattern.charAt(patternLength - 1)] = patternLength;
shift['*'] = patternLength;
let ans = new Array();
if (textLength >= patternLength) {
    let ind = patternLength - 1, jump;
    console.time('Boyer-Moore-Horspool');
    while (ind < (textLength)) {
        let k = 0;
        for (var j = (patternLength - 1); j >= 0; j--) {
            if (text.charAt(ind - k) != pattern.charAt(j)) {
                if (j == (patternLength - 1))
                    jump = unique_value.has(text.charAt(ind)) ? shift[text.charAt(ind)] : shift['*'];
                else
                    jump = shift[pattern.charAt(j)];
                ind += jump;
                break;
            }
            k++;
        }
        if (k == patternLength) {
            ans.push(ind + 1 - k);
            ind += shift['*'];
        }
    }
    console.log(ans.join(' '));
    console.timeEnd('Boyer-Moore-Horspool');
} else {
    console.log('the pattern length is longer than the text');
}
