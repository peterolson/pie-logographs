import lexicon from "./lexicon.json" assert { type: "json" };
import {
    numbers,
    genders,
    cases,
    persons,
    verbTypes,
    voices,
    addInflection,
} from "./inflection.js";

function parseLine(line) {
    const tokens = line.split(" ");
    let currentWord = null;
    const result = [];
    for (const token of tokens) {
        if (lexicon[token]) {
            if (currentWord) {
                result.push(currentWord);
            }
            currentWord = {
                word: token,
                char: lexicon[token],
            };
        }
        if (numbers.includes(token)) {
            currentWord.number = token;
        }
        if (genders.includes(token)) {
            currentWord.gender = token;
        }
        if (cases.includes(token)) {
            currentWord.case = token;
        }
        if (persons.includes(token)) {
            currentWord.person = token;
        }
        if (verbTypes.includes(token)) {
            currentWord.verbType = token;
        }
        if (voices.includes(token)) {
            currentWord.voice = token;
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
        } else if (item.person) {
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
            if (!item.verbType) {
                item.verbType = "pres";
            }
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

function renderLine(words, inflectionType) {
    return words
        .map((word) => {
            return word.char + addInflection(inflectionType, word);
        })
        .join("");
}

function render(parsed, inflectionType) {
    return parsed.map((x) => renderLine(x, inflectionType)).join("\n");
}

const input = `
SHEEP nom HORSE nom AND
SHEEP dat IT f sg dat HAIR *-néh₂ f sg nom NOT BE 3 sg , THIS HORSE acc pl SEE past 3 sg .
`;
const parsed = parse(input);
const renderedBopomofo = render(parsed, "bopomofo");
const renderedHiragana = render(parsed, "hiragana");
const renderedKatakana = render(parsed, "katakana");

console.log(input);
console.log(parsed);
console.log(renderedBopomofo);
console.log(renderedHiragana);
console.log(renderedKatakana);
