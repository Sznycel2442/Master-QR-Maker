import fs from "node:fs";
import vm from "node:vm";
import { Blob } from "node:buffer";

const source = fs.readFileSync("vendor/qrcode.js", "utf8");
const app = fs.readFileSync("app.js", "utf8");
new vm.Script(source);
new vm.Script(app);

class Element {
  constructor(id = "") {
    this.id = id; this.value = ""; this.innerHTML = ""; this.textContent = "";
    this.hidden = false; this.disabled = false; this.dataset = {}; this.listeners = {};
    this.classList = { add() {}, remove() {}, toggle() {} };
  }
  addEventListener(name, fn) { this.listeners[name] = fn; }
  click() { this.listeners.click?.({ target: this }); }
  setAttribute() {}
  append() {}
  remove() {}
  querySelectorAll(selector) {
    if (selector !== "[data-key]") return [];
    this.inputs = [...this.innerHTML.matchAll(/data-key="([^"]+)"/g)].map(match => {
      const input = new Element();
      input.dataset.key = match[1];
      input.type = match[1] === "hidden" ? "checkbox" : "text";
      input.tagName = "INPUT";
      return input;
    });
    return this.inputs;
  }
  querySelector() { const input = new Element(); input.value = "WPA"; return input; }
}

const ids = ["modeFields", "overlayControls", "darkColor", "lightColor", "darkHex", "lightHex",
  "caption", "qrPreview", "paperQr", "standQr", "qrCaption", "paperCaption", "standCaption",
  "standNfc", "nfcEnabled", "nfcOptions", "nfcPosition", "nfcDiameter", "nfcThickness", "nfcPrintHint",
  "matrixSize", "modeMeta", "standDimensions", "inputError", "pngBtn", "svgBtn", "printBtn",
  "plateBtn", "baseBtn", "resetBtn", "toast"];
const elements = new Map(ids.map(id => [id, new Element(id)]));
elements.get("darkColor").value = "#173556";
elements.get("lightColor").value = "#ffffff";
elements.get("caption").value = "Zeskanuj i odkryj więcej";
elements.get("nfcPosition").value = "qr";
elements.get("nfcDiameter").value = "25";
elements.get("nfcThickness").value = "0.4";
const buttons = ["url", "text", "wifi", "email", "contact"].map(mode => {
  const button = new Element(); button.dataset.mode = mode; return button;
});
const segments = ["none", "icon", "image", "text"].map(overlay => {
  const button = new Element(); button.dataset.overlay = overlay; return button;
});
const tabs = ["qr", "paper", "stand"].map(preview => {
  const button = new Element(); button.dataset.preview = preview; return button;
});
const views = ["qrView", "paperView", "standView"].map(id => new Element(id));
const downloads = [];
class TestURL extends URL {}
TestURL.createObjectURL = blob => { downloads.push(blob); return "blob:test"; };
TestURL.revokeObjectURL = () => {};
const document = {
  documentElement: { tagName: "svg" },
  body: { append() {} },
  getElementById: id => elements.get(id),
  querySelectorAll: selector => ({
    ".type-option": buttons, ".segment": segments, ".preview-tab": tabs, ".preview-view": views
  })[selector] || [],
  createElement: tag => {
    const element = new Element(tag);
    if (tag === "canvas") element.getContext = () => ({
      fillText() {}, getImageData: () => ({ data: new Uint8ClampedArray(160 * 32 * 4) })
    });
    return element;
  }
};
const context = {
  document, window: {}, navigator: { userAgent: "test" }, URL: TestURL, URLSearchParams, Blob, TextEncoder,
  structuredClone, setTimeout, clearTimeout
};
vm.createContext(context);
vm.runInContext(source, context);
vm.runInContext(app, context);
const pause = () => new Promise(resolve => setTimeout(resolve, 120));
const assert = (condition, message) => { if (!condition) throw Error(message); };

await pause();
assert(/\d+ × \d+/.test(elements.get("matrixSize").textContent), "Default QR missing");
assert(elements.get("qrPreview").innerHTML.includes("<svg"), "SVG preview missing");
for (const button of [buttons[1], buttons[3], buttons[4]]) {
  button.click(); await pause();
  assert(/\d+ × \d+/.test(elements.get("matrixSize").textContent), button.dataset.mode + " QR missing");
}
buttons[2].click(); await pause();
assert(elements.get("inputError").textContent.includes("hasło"), "Wi-Fi validation missing");
const password = elements.get("modeFields").inputs.find(input => input.dataset.key === "password");
password.value = "Test12345"; password.listeners.input({ target: password }); await pause();
assert(/\d+ × \d+/.test(elements.get("matrixSize").textContent), "Wi-Fi QR missing");
buttons[0].click(); await pause();
segments[3].click(); await pause();
assert(elements.get("qrPreview").innerHTML.includes("<text"), "Center text missing");
segments[1].click(); await pause();
assert(elements.get("qrPreview").innerHTML.includes("<path fill="), "Built-in icon missing");
segments[0].click(); await pause();
elements.get("svgBtn").click();
elements.get("plateBtn").click();
elements.get("baseBtn").click();
assert(downloads.length === 3, "Exports missing");
assert(downloads[0].type.includes("svg"), "SVG download incorrect");
assert(downloads[1].type === "model/stl" && downloads[1].size > 10000, "Plate STL incorrect");
assert(downloads[2].type === "model/stl" && downloads[2].size > 84, "Base STL incorrect");
for (const blob of downloads.slice(1)) {
  const bytes = await blob.arrayBuffer(), view = new DataView(bytes);
  assert(bytes.byteLength === 84 + view.getUint32(80, true) * 50, "Invalid binary STL");
}
console.log("OK: URL, tekst, e-mail, vCard, walidacja Wi-Fi, SVG i dwa pliki STL");
