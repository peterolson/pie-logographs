import lexicon from "./lexicon.json" assert { type: "json" };
import {
    numbers,
    genders,
    cases,
    persons,
    verbTypes,
    voices,
    addInflection,
    suffixes,
    addSuffixes,
    formationTypes,
} from "./inflection.js";
import { texts } from "./texts.js";
import { renderPIE } from "./langs/pie.js";

function parseLine(line) {
    const tokens = line.split(" ");
    let currentWord = null;
    let prefix = [];
    const result = [];
    for (const token of tokens) {
        if (token.trim() === "") continue;
        if (lexicon[token]) {
            if (currentWord) {
                result.push(currentWord);
            }
            if (token.endsWith("-")) {
                prefix.push({
                    word: token,
                    char: lexicon[token],
                });
                currentWord = null;
                continue;
            }
            currentWord = {
                word: token,
                char: lexicon[token],
                prefix: prefix,
            };
            prefix = [];
        } else if (numbers.includes(token)) {
            currentWord.number = token;
        } else if (genders.includes(token)) {
            currentWord.gender = token;
        } else if (cases.includes(token)) {
            currentWord.case = token;
        } else if (persons.includes(token)) {
            currentWord.person = token;
        } else if (token in verbTypes) {
            currentWord.verbType = token;
        } else if (voices.includes(token)) {
            currentWord.voice = token;
        } else if (token in suffixes) {
            currentWord.suffix = currentWord.suffix || [];
            currentWord.suffix.push(token);
        } else if (token in formationTypes) {
            currentWord.formation = token;
        } else {
            console.error("Unknown token: " + token);
        }
    }
    if (currentWord) {
        result.push(currentWord);
    }

    for (const item of result) {
        if (item.gender) {
            item.pos = "adj";
        } else if (item.case) {
            item.pos = "noun";
        } else if (item.person || item.voice || item.verbType) {
            item.pos = "verb";
        }
        if (item.pos === "adj") {
            if (!item.number) {
                item.number = "sg";
            }
            if (!item.case) {
                item.case = "nom";
            }
        }
        if (item.pos === "noun") {
            if (!item.number) {
                item.number = "sg";
            }
        }
        if (item.pos === "verb") {
            if (!item.voice) {
                item.voice = "active";
            }
            if (!item.number) {
                item.number = "sg";
            }
        }
    }

    return result;
}

function parse(input) {
    return input.trim().split("\n").map(parseLine);
}

function renderLine(words) {
    return words
        .map((word) => {
            return (
                renderLine(word.prefix || []) +
                word.char +
                addSuffixes(word) +
                addInflection(word)
            );
        })
        .join("");
}

function render(parsed, renderer) {
    return parsed.map(renderer).join("\n");
}

for (const { title, text } of texts) {
    console.log(title);
    const parsed = parse(text);
    const rendered = render(parsed, renderLine);
    const renderedPIE = render(parsed, renderPIE);

    console.log(parsed);
    console.log(rendered);
    console.log(renderedPIE);
}
