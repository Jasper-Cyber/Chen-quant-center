const fs = require("fs");
const path = require("path");

function isUtf16Le(buf) {
  if (buf.length < 4) return false;
  if (buf[0] === 0xff && buf[1] === 0xfe) return true;
  let zeros = 0;
  const n = Math.min(buf.length, 400);
  for (let i = 1; i < n; i += 2) {
    if (buf[i] === 0) zeros++;
  }
  return zeros > 80;
}

function decodeUtf16(buf) {
  if (buf[0] === 0xff && buf[1] === 0xfe) {
    return buf.toString("utf16le", 2);
  }
  return buf.toString("utf16le");
}

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".next") continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      walk(p);
      continue;
    }
    if (!/\.(tsx?|jsx?|css|json|mjs)$/i.test(name)) continue;
    const buf = fs.readFileSync(p);
    if (!isUtf16Le(buf)) continue;
    fs.writeFileSync(p, decodeUtf16(buf), "utf8");
    console.log("Fixed:", p);
  }
}

walk(path.join(__dirname));
console.log("Done. Run: npm run dev");
