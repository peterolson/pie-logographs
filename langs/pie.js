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
        const prefix = data.prefix?.length
            ? data.prefix.map((x) => x.word).join(" ") + " "
            : "";
        const suffix = data.suffix?.length ? data.suffix.join(" ") + " " : "";
        const keyStart = `${prefix}${suffix}`;
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
            key = `${keyStart}${data.number} ${data.case}`;
        }
        if (pos === "adj") {
            key = `${keyStart}${data.gender} ${data.number} ${data.case}`;
        }
        if (pos === "verb") {
            key = `${keyStart}${data.formation} ${data.voice} ${data.verbType} ${data.number} ${data.person}`;
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
