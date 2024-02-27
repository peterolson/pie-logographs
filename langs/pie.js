import pie from "./pie.json" assert { type: "json" };

const punctSpaceAfter = new Set([".", ",", ":", ";", "!", "?", "''", ")"]);
const punctSpaceBefore = new Set(["(", "``"]);

export function renderPIE(words) {
    const tokens = [];
    for (const { word, pos, ...data } of words) {
        if (punctSpaceAfter.has(word)) {
            tokens.push("_" + word);
            continue;
        }
        if (punctSpaceBefore.has(word)) {
            tokens.push(word + "_");
            continue;
        }
        const suffix = data.suffix ? data.suffix.join(" ") + " " : "";
        const dictEntry = pie[word];
        if (!dictEntry) {
            console.error("Unknown word: " + word);
            continue;
        }
        if (typeof dictEntry === "string") {
            tokens.push(dictEntry);
            continue;
        }
        let key = "";
        if (pos === "noun") {
            key = `${suffix}${data.number} ${data.case}`;
        }
        if (pos === "adj") {
            key = `${suffix}${data.gender} ${data.number} ${data.case}`;
        }
        if (pos === "verb") {
            key = `${suffix}${data.formation} ${data.voice} ${data.verbType} ${data.number} ${data.person}`;
        }
        if (!key) {
            console.error("No handler for", word, data);
            continue;
        }
        if (!(key in dictEntry[pos])) {
            console.error("Unknown key: " + key, word, data);
            continue;
        }
        tokens.push(dictEntry[pos][key]);
    }
    return tokens
        .join(" ")
        .replaceAll(" -", "-")
        .replaceAll(" _", "")
        .replaceAll("_ ", "")
        .replaceAll("``", '"')
        .replaceAll("''", '"');
}
