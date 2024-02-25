export const numbers = ["sg", "dual", "pl"];
export const genders = ["m", "f", "n"];
export const cases = ["nom", "gen", "dat", "acc", "ins", "loc", "voc", "abl"];

export const persons = ["1", "2", "3"];
export const verbTypes = ["pres", "past", "imp", "subj", "opt", "part"];
export const voices = ["active", "middle"];

const hiraganaTable = {
    "": ["あ", "い", "う", "え", "お", "や", "ゆ", "よ"],
    k: ["か", "き", "く", "け", "こ", "きゃ", "きゅ", "きょ"],
    s: ["さ", "し", "す", "せ", "そ", "しゃ", "しゅ", "しょ"],
    t: ["た", "ち", "つ", "て", "と", "ちゃ", "ちゅ", "ちょ"],
    n: ["な", "に", "ぬ", "ね", "の", "にゃ", "にゅ", "にょ"],
    h: ["は", "ひ", "ふ", "へ", "ほ", "ひゃ", "ひゅ", "ひょ"],
    m: ["ま", "み", "む", "め", "も", "みゃ", "みゅ", "みょ"],
    r: ["ら", "り", "る", "れ", "ろ", "りゃ", "りゅ", "りょ"],
    g: ["が", "ぎ", "ぐ", "げ", "ご", "ぎゃ", "ぎゅ", "ぎょ"],
    z: ["ざ", "じ", "ず", "ぜ", "ぞ", "じゃ", "じゅ", "じょ"],
    d: ["だ", "ぢ", "づ", "で", "ど", "ぢゃ", "ぢゅ", "ぢょ"],
    b: ["ば", "び", "ぶ", "べ", "ぼ", "びゃ", "びゅ", "びょ"],
    p: ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ", "ぴゃ", "ぴゅ", "ぴょ"],
};

const katakanaTable = {
    "": ["ア", "イ", "ウ", "エ", "オ", "ヤ", "ユ", "ヨ"],
    k: ["カ", "キ", "ク", "ケ", "コ", "キャ", "キュ", "キョ"],
    s: ["サ", "シ", "ス", "セ", "ソ", "シャ", "シュ", "ショ"],
    t: ["タ", "チ", "ツ", "テ", "ト", "チャ", "チュ", "チョ"],
    n: ["ナ", "ニ", "ヌ", "ネ", "ノ", "ニャ", "ニュ", "ニョ"],
    h: ["ハ", "ヒ", "フ", "ヘ", "ホ", "ヒャ", "ヒュ", "ヒョ"],
    m: ["マ", "ミ", "ム", "メ", "モ", "ミャ", "ミュ", "ミョ"],
    r: ["ラ", "リ", "ル", "レ", "ロ", "リャ", "リュ", "リョ"],
    g: ["ガ", "ギ", "グ", "ゲ", "ゴ", "ギャ", "ギュ", "ギョ"],
    z: ["ザ", "ジ", "ズ", "ゼ", "ゾ", "ジャ", "ジュ", "ジョ"],
    d: ["ダ", "ヂ", "ヅ", "デ", "ド", "ヂャ", "ヂュ", "ヂョ"],
    b: ["バ", "ビ", "ブ", "ベ", "ボ", "ビャ", "ビュ", "ビョ"],
    p: ["パ", "ピ", "プ", "ペ", "ポ", "ピャ", "ピュ", "ピョ"],
};

const hangulInitials = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
];
const hangulMedials = [
    "ㅏ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅓ",
    "ㅔ",
    "ㅕ",
    "ㅖ",
    "ㅗ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅛ",
    "ㅜ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅠ",
    "ㅡ",
    "ㅢ",
    "ㅣ",
];
const hangulFinals = [
    "",
    "ㄱ",
    "ㄲ",
    "ㄳ",
    "ㄴ",
    "ㄵ",
    "ㄶ",
    "ㄷ",
    "ㄹ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅁ",
    "ㅂ",
    "ㅄ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
];

function hangulSyllable(initial, medial, final) {
    const initialIndex = hangulInitials.indexOf(initial);
    const medialIndex = hangulMedials.indexOf(medial);
    const finalIndex = hangulFinals.indexOf(final);
    return String.fromCharCode(
        44032 + initialIndex * 588 + medialIndex * 28 + finalIndex
    );
}

const inflectionConverters = {
    bopomofo: {
        adj: (n, g, c) => {
            const tone = {
                sg: "",
                dual: "ˊ",
                pl: "ˇ",
            };
            const final = {
                m: "ㄚ",
                f: "ㄢ",
                n: "ㄤ",
            };
            const initial = {
                nom: "ㄅ",
                gen: "ㄆ",
                dat: "ㄇ",
                acc: "ㄈ",
                ins: "ㄉ",
                loc: "ㄊ",
                voc: "ㄋ",
                abl: "ㄌ",
            };
            return initial[c] + final[g] + tone[n];
        },
        verb: (n, p, t, v) => {
            if (t === "part") {
                if (v === "active") {
                    return "ㄠ";
                }
                return "ㄩ";
            }
            const tones = {
                sg: "",
                dual: "ˊ",
                pl: "ˇ",
            };
            const finals = {
                active: {
                    1: "ㄚ",
                    2: "ㄧ",
                    3: "ㄨ",
                },
                middle: {
                    1: "ㄞ",
                    2: "ㄧㄚ",
                    3: "ㄨㄟ",
                },
            };
            const initials = {
                pres: ["", ""],
                past: ["ㄍ", "ㄐ"],
                imp: ["ㄎ", "ㄑ"],
                subj: ["ㄏ", "ㄒ"],
                opt: ["ㄓ", "ㄓ"],
            };
            const tone = tones[n];
            let final = finals[v][p];
            const initial = initials[t][p === 2 ? 1 : 0];
            if (initial === "ㄓ" && final.startsWith("ㄧ")) {
                final = final.slice(1);
            }
            return initial + final + tone;
        },
    },
    hiragana: {
        adj: (n, g, c) => {
            const caseIndex = cases.indexOf(c);
            const initials = {
                sg: {
                    m: "",
                    f: "k",
                    n: "s",
                },
                dual: {
                    m: "t",
                    f: "n",
                    n: "h",
                },
                pl: {
                    m: "m",
                    f: "r",
                    n: "g",
                },
            };
            const initial = initials[n][g];
            return hiraganaTable[initial][caseIndex];
        },
        verb: (n, p, t, v) => {
            if (t === "part") {
                if (v === "active") {
                    return "わ";
                }
                return "ら";
            }
            const indexes = {
                1: {
                    sg: 0,
                    dual: 5,
                    pl: 0,
                },
                2: {
                    sg: 1,
                    dual: 7,
                    pl: 4,
                },
                3: {
                    sg: 2,
                    dual: 6,
                    pl: 3,
                },
            };
            const index = indexes[p][n];
            const initials = {
                active: {
                    pres: "",
                    past: "k",
                    imp: "s",
                    subj: "t",
                    opt: "b",
                },
                middle: {
                    pres: "n",
                    past: "g",
                    imp: "z",
                    subj: "d",
                    opt: "p",
                },
            };
            const initial = initials[v][t];
            const syllable = hiraganaTable[initial][index];
            if (index === 0 && n === "pl") {
                syllable += "ん";
            }
            return syllable;
        },
    },
    katakana: {
        adj: (n, g, c) => {
            const caseIndex = cases.indexOf(c);
            const initials = {
                sg: {
                    m: "",
                    f: "k",
                    n: "s",
                },
                dual: {
                    m: "t",
                    f: "n",
                    n: "h",
                },
                pl: {
                    m: "m",
                    f: "r",
                    n: "g",
                },
            };
            const initial = initials[n][g];
            return katakanaTable[initial][caseIndex];
        },
        verb: (n, p, t, v) => {
            if (t === "part") {
                if (v === "active") {
                    return "ワ";
                }
                return "ラ";
            }
            const indexes = {
                1: {
                    sg: 0,
                    dual: 5,
                    pl: 0,
                },
                2: {
                    sg: 1,
                    dual: 7,
                    pl: 4,
                },
                3: {
                    sg: 2,
                    dual: 6,
                    pl: 3,
                },
            };
            const index = indexes[p][n];
            const initials = {
                active: {
                    pres: "",
                    past: "k",
                    imp: "s",
                    subj: "t",
                    opt: "b",
                },
                middle: {
                    pres: "n",
                    past: "g",
                    imp: "z",
                    subj: "d",
                    opt: "p",
                },
            };
            const initial = initials[v][t];
            const syllable = katakanaTable[initial][index];
            if (index === 0 && n === "pl") {
                syllable += "ン";
            }
            return syllable;
        },
    },
    hangul: {
        adj: (n, g, c) => {
            const caseIndex = cases.indexOf(c);
            const initials = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅈ"];
            const initial = initials[caseIndex];
            const vowels = {
                sg: "ㅏ",
                dual: "ㅗ",
                pl: "ㅜ",
            };
            const vowel = vowels[n];
            const finals = {
                m: "",
                f: "ㄴ",
                n: "ㅇ",
            };
            const final = finals[g];
            return hangulSyllable(initial, vowel, final);
        },
        verb: (n, p, t, v) => {
            if (t === "part") {
                if (v === "active") {
                    return "파";
                }
                return "포";
            }
            const initials = {
                active: {
                    pres: "ㅇ",
                    past: "ㄱ",
                    imp: "ㅅ",
                    subj: "ㄹ",
                    opt: "ㅂ",
                },
                middle: {
                    pres: "ㄴ",
                    past: "ㅁ",
                    imp: "ㅈ",
                    subj: "ㄷ",
                    opt: "ㅎ",
                },
            };
            const initial = initials[v][t];
            const vowels = {
                sg: "ㅏ",
                dual: "ㅗ",
                pl: "ㅜ",
            };
            const vowel = vowels[n];
            const finals = {
                1: "ㄹ",
                2: "ㅇ",
                3: "",
            };
            const final = finals[p];
            return hangulSyllable(initial, vowel, final);
        },
    },
};

export function addInflection(type, word) {
    const converter = inflectionConverters[type];
    if (word.pos === "adj") {
        if (
            word.gender === "m" &&
            word.number === "sg" &&
            word.case === "nom"
        ) {
            return "";
        }
        return converter.adj(word.number, word.gender, word.case);
    }
    if (word.pos === "noun") {
        if (word.number === "sg" && word.case === "nom") {
            return "";
        }
        return converter.adj(word.number, "m", word.case);
    }
    if (word.pos === "verb") {
        if (
            word.number === "sg" &&
            word.person === "3" &&
            word.verbType === "pres" &&
            word.voice === "active"
        ) {
            return "";
        }
        return converter.verb(
            word.number,
            word.person,
            word.verbType,
            word.voice
        );
    }
    return "";
}
