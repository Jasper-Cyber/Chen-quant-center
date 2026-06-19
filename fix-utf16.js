const fs = require("fs");
const path = require("path");

const root = __dirname;
const skip = new Set(["node_modules", ".next"]);
const ext = /\.(json|mjs|ts|tsx|js|css)$/;

let fixed = 0;

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (skip.has(name)) continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (ext.test(name)) {
      const buf = fs.readFileSync(p);
      if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) {
        fs.writeFileSync(p, buf.toString("utf16le"), "utf8");
        console.log("Fixed:", p);
        fixed++;
      }
    }
  }
}

walk(root);
console.log("Total fixed:", fixed);
