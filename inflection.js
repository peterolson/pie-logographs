export const numbers = ["sg", "dual", "pl"];
export const genders = ["m", "f", "n"];
export const cases = ["nom", "gen", "dat", "acc", "ins", "loc", "voc", "abl"];

export const persons = ["1", "2", "3"];
export const verbTypes = ["pres", "past", "imp", "subj", "opt", "part"];
export const voices = ["active", "middle"];
export const formationTypes = {
    _ira: "Imperfective Root athematic",
    _iran: "Imperfective Root athematic (Narten type)",
    _irte: "Imperfective Root thematic normal, e-grade",
    _irto: "Imperfective Root thematic normal, o-grade",
    _irtz: "Imperfective Root thematic, zero-grade",
    _irae: "Imperfective Reduplicated athematic, e-reduplication",
    _irai: "Imperfective Reduplicated athematic, i-reduplication",
    _irrz: "Imperfective Reduplicated thematic, zero-grade",
    _ini: "Imperfective Nasal infix",
    _inu: "Imperfective nu-suffix",
    _iye: "Imperfective ye e-grade",
    _iyz: "Imperfective ye zero-grade",
    _iske: "Imperfective ske zero-grade",
    _ise: "Imperfective se e-grade",
    _pra: "Perfective Root athematic",
    _prtz: "Perfective Root thematic normal, zero-grade",
    _prte: "Perfective reduplicated thematic, e-reduplication",
    _ps: "Perfective s-suffix",
    _sr: "Stative Root",
    _rr: "Stative reduplicated",
};

const formationTypeConversion = {
    bopomofo: {
        _ira: "",
        _iran: "ㄣ",
        _irte: "ㄟ",
        _irto: "ㄡ",
        _irtz: "ㄢ",
        _irae: "ㄒㄧㄝ",
        _irai: "ㄒㄧ",
        _irrz: "ㄩ",
        _ini: "ㄋㄧ",
        _inu: "ㄋㄨ",
        _iye: "ㄧㄝ",
        _iyz: "ㄠ",
        _iske: "ㄙ",
        _ise: "ㄙㄟ",
        _pra: "",
        _prtz: "ㄢ",
        _prte: "ㄒㄧ",
        _ps: "ㄙㄨ",
        _sr: "",
        _rr: "ㄒㄧ",
    },
    hiragana: {
        _ira: "",
        _iran: "ん",
        _irte: "い",
        _irto: "う",
        _irtz: "あ",
        _irae: "しえ",
        _irai: "し",
        _irrz: "ゆ",
        _ini: "に",
        _inu: "ぬ",
        _iye: "いえ",
        _iyz: "あ",
        _iske: "す",
        _ise: "せい",
        _pra: "",
        _prtz: "あ",
        _prte: "しえ",
        _ps: "す",
        _sr: "",
        _rr: "し",
    },
    katakana: {
        _ira: "",
        _iran: "ン",
        _irte: "イ",
        _irto: "ウ",
        _irtz: "ア",
        _irae: "シエ",
        _irai: "シ",
        _irrz: "ユ",
        _ini: "ニ",
        _inu: "ヌ",
        _iye: "イエ",
        _iyz: "ア",
        _iske: "ス",
        _ise: "セイ",
        _pra: "",
        _prtz: "ア",
        _prte: "シエ",
        _ps: "ス",
        _sr: "",
        _rr: "シ",
    },
    hangul: {
        _ira: "",
        _iran: "은",
        _irte: "이",
        _irto: "우",
        _irtz: "아",
        _irae: "에",
        _irai: "시",
        _irrz: "유",
        _ini: "니",
        _inu: "누",
        _iye: "웨",
        _iyz: "아",
        _iske: "스",
        _ise: "잇",
        _pra: "",
        _prtz: "아",
        _prte: "에",
        _ps: "스",
        _sr: "",
        _rr: "시",
    },
};

export const suffixes = {
    deti: {
        form: "dʰh₁eti",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-d%CA%B0h%E2%82%81eti",
        desc: "Forms resultative verbs.",
        root: "DO",
        bopomofo: "爲",
        hiragana: "爲",
        katakana: "爲",
        hangul: "爲",
    },
    dlom: {
        form: "dʰlom",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-d%CA%B0lom",
        desc: "Forms nouns denoting a tool or instrument.",
        alias: "trom",
        bopomofo: "ㄊㄥ",
        hiragana: "ちょ",
        katakana: "チョ",
        hangul: "치",
    },
    drom: {
        form: "dʰrom",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-d%CA%B0rom",
        desc: "Forms nouns denoting a tool or instrument.",
        alias: "trom",
        bopomofo: "ㄊㄥ",
        hiragana: "ちょ",
        katakana: "チョ",
        hangul: "치",
    },
    trom: {
        form: "trom",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-trom",
        desc: "Forms nouns denoting a tool or instrument.",
        bopomofo: "ㄊㄥ",
        hiragana: "ちょ",
        katakana: "チョ",
        hangul: "치",
    },
    en: {
        form: "ḗn",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%E1%B8%97n",
        desc: "Derives nouns from roots.",
        bopomofo: "ㄣ",
        hiragana: "ん",
        katakana: "ン",
        hangul: "안",
    },
    ehti: {
        form: "éh₁ti",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C3%A9h%E2%82%81ti",
        desc: [
            "Creates inchoative (or fientive) verbs from perfective roots.",
            "Creates inchoative (or fientive) verbs from nominals.",
        ],
        bopomofo: "ㄟ",
        hiragana: "で",
        katakana: "デ",
        hangul: "데",
    },
    yeti: {
        form: "yeti",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-yeti",
        desc: "Creates transitive imperfective verbs from roots.",
        bopomofo: "ㄧㄝ",
        hiragana: "いえ",
        katakana: "イエ",
        hangul: "졔",
    },
    ehyeti: {
        form: "éh₁yeti",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C3%A9h%E2%82%81yeti",
        desc: "Thematicization of the athematic stative verbal suffix; see *-yeti.",
        combo: ["ehti", "yeti"],
        bopomofo: "ㄒㄧㄝ",
        hiragana: "しいえ",
        katakana: "シイエ",
        hangul: "졭",
    },
    eh2: {
        form: "éh₂",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C3%A9h%E2%82%82",
        desc: [
            "Creates collective nouns and mass nouns.",
            "Creates action nouns and abstract nouns.",
        ],
        bopomofo: "ㄏㄜ",
        hiragana: "へ",
        katakana: "ヘ",
        hangul: "헤",
    },
    ye_ti: {
        form: "yéti",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-y%C3%A9ti",
        desc: "Creates intransitive, often deponent, imperfective verbs from roots.",
        bopomofo: "ㄧㄝˊ",
        hiragana: "いて",
        katakana: "イテ",
        hangul: "졬",
    },
    eh2yeti: {
        form: "eh₂yéti",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-eh%E2%82%82y%C3%A9ti",
        desc: [
            "Creates iterative/ frequentative/ intensive verbs.",
            "Creates causative verbs.",
        ],
        combo: ["eh2", "ye_ti"],
        bopomofo: "ㄏㄜㄧㄝˊ",
        hiragana: "へいて",
        katakana: "ヘイテ",
        hangul: "졫",
    },
    es: {
        form: "ēs",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C4%93s",
        desc: "Primarily forms adjectival bahuvrīhi compounds",
        bopomofo: "ㄙㄜ",
        hiragana: "せ",
        katakana: "セ",
        hangul: "세",
    },
    eyeti: {
        form: "éyeti",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C3%A9yeti",
        desc: [
            "Forms causative imperfective verbs from roots.",
            "Forms iterative or frequentative imperfective verbs from roots.",
        ],
        bopomofo: "ㄧㄝˇ",
        hiragana: "いゆ",
        katakana: "イユ",
        hangul: "졸",
    },
    eyti: {
        form: "éyti",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C3%A9yti",
        desc: "Forms aktionsart verbs from roots.",
        bopomofo: "ㄟˋ",
        hiragana: "えゆ",
        katakana: "エユ",
        hangul: "짙",
    },
    tos: {
        form: "tós",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-t%C3%B3s",
        desc: "Creates verbal adjectives from verb stems.",
        bopomofo: "ㄊㄡ",
        hiragana: "と",
        katakana: "ト",
        hangul: "토",
    },
    eh2tos: {
        form: "éh₂tós",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-eh%E2%82%82tos",
        desc: "Forms adjectives from nouns, indicating the possession of a thing or a quality.",
        combo: ["eh2", "tos"],
        bopomofo: "ㄏㄜㄊㄡ",
        hiragana: "へと",
        katakana: "ヘト",
        hangul: "허토",
    },
    hseti: {
        form: "(h₁)seti",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-(h%E2%82%81)seti",
        desc: "Creates desiderative imperfective verbs from roots.",
        bopomofo: "ㄙㄊㄧ",
        hiragana: "すえ",
        katakana: "スエ",
        hangul: "셑",
    },
    h2: {
        form: "h₂",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-h%E2%82%82",
        desc: "Creates collective nouns, which refer to groups or sets. The semantic extension from abstract/collective to feminine is comparable to the one of Proto-Semitic *-at-.",
        bopomofo: "ㄏㄚ",
        hiragana: "は",
        katakana: "ハ",
        hangul: "하",
    },
    h2ti: {
        form: "h₂ti",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-h%E2%82%82ti",
        desc: "Forms factitive verbs from adjective stems.",
        bopomofo: "ㄏㄞ",
        hiragana: "はい",
        katakana: "ハイ",
        hangul: "힡",
    },
    Ho: {
        form: "Hō",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-H%C5%8D",
        desc: "Derives adjectives, nouns indicating possession, denoting burden, authority.",
        bopomofo: "ㄏㄡ",
        hiragana: "ほ",
        katakana: "ホ",
        hangul: "호",
    },
    ih2: {
        form: "ih₂",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-ih%E2%82%82",
        desc: "Feminizes athematic nominal stems.",
        bopomofo: "ㄏㄟ",
        hiragana: "へい",
        katakana: "ヘイ",
        hangul: "히",
    },
    iHnos: {
        form: "iHnos",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-iHnos",
        desc: "Creates adjectives of materials.",
        bopomofo: "ㄧㄋㄛ",
        hiragana: "いの",
        katakana: "イノ",
        hangul: "홋",
    },
    is: {
        form: "is",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-is",
        desc: "Forms nouns from verbs.",
        bopomofo: "ㄧㄙ",
        hiragana: "いす",
        katakana: "イス",
        hangul: "잇",
    },
    iskos: {
        form: "iskos",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-iskos",
        desc: "Characteristic of, typical of, pertaining to",
        bopomofo: "ㄙㄎㄡ",
        hiragana: "いすこ",
        katakana: "イスコ",
        hangul: "솏",
    },
    kos: {
        form: "kos",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-kos",
        desc: "Creates deadjectival and desubstantival adjectives denoting the characteristic of, typical of, pertaining to.",
        bopomofo: "ㄎㄡ",
        hiragana: "こ",
        katakana: "コ",
        hangul: "코",
    },
    kt: {
        form: "kt",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-kt",
        desc: "Forms perfective verbs from roots.",
        bopomofo: "ㄎㄢ",
        hiragana: "くと",
        katakana: "クト",
        hangul: "같",
    },
    los: {
        form: "lós",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-l%C3%B3s",
        desc: [
            "Forms agent nouns from verbal roots.",
            "Forms diminutive nouns from noun stems.",
            "Forms adjectives with the sense “pertaining to …” (alternative form of *-rós). ",
        ],
        bopomofo: "ㄌㄡ",
        hiragana: "ろ",
        katakana: "ロ",
        hangul: "롯",
    },
    men: {
        form: "mḗn",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-m%E1%B8%97n",
        desc: "Creates agent nouns from verbs.",
        alias: "mo",
        bopomofo: "ㄇㄣ",
        hiragana: "めん",
        katakana: "メン",
        hangul: "멘",
    },
    mo: {
        form: "mō",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-m%C5%8D",
        desc: "Creates agent nouns from verbs.",
        bopomofo: "ㄇㄡ",
        hiragana: "も",
        katakana: "モ",
        hangul: "모",
    },
    mn: {
        form: "mn̥",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-mn%CC%A5",
        desc: "Creates action nouns or result nouns from verbs.",
        bopomofo: "ㄇㄣˇ",
        hiragana: "むん",
        katakana: "ムン",
        hangul: "문",
    },
    mhnos: {
        form: "mh₁nos",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-mh%E2%82%81nos",
        desc: "forms the middle participle",
        bopomofo: "ㄇㄣㄙ",
        hiragana: "むす",
        katakana: "ムス",
        hangul: "몺",
    },
    mos: {
        form: "mós",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-m%C3%B3s",
        desc: "Creates action/result nouns from verb stems.",
        bopomofo: "ㄇㄡㄙ",
        hiragana: "もす",
        katakana: "モス",
        hangul: "못",
    },
    newti: {
        form: "néwti",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-n%C3%A9wti",
        desc: "Forms transitive imperfective verbs from roots.",
        bopomofo: "ㄋㄨ",
        hiragana: "ぬえ",
        katakana: "ヌエ",
        hangul: "늬",
    },
    nos: {
        form: "nós",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-n%C3%B3s",
        desc: "Creates verbal adjectives from roots.",
        bopomofo: "ㄋㄡ",
        hiragana: "の",
        katakana: "ノ",
        hangul: "노",
    },
    o: {
        form: "ō",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C5%8D",
        desc: [
            "(productive) Forms so-called “individualizing” or “participant” nouns from nouns and adjectives, agent or patient nouns from verbs.",
            "(rare) Derives nouns from nouns or roots, often with unclear semantic distinction.",
        ],
        bopomofo: "ㄡ",
        hiragana: "お",
        katakana: "オ",
        hangul: "오",
    },
    o_nts: {
        form: "ónts",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C3%B3nts",
        desc: "Derives nouns denoting body parts.",
        bopomofo: "ㄨㄥ",
        hiragana: "おつ",
        katakana: "オツ",
        hangul: "옹",
    },
    o_s: {
        form: "ós",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C3%B3s",
        desc: "Creates agent nouns from verb stems, denoting someone or something that performs that verb's action.",
        bopomofo: "ㄡˊ",
        hiragana: "おす",
        katakana: "オス",
        hangul: "엿",
    },
    oos: {
        form: "ōs",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C5%8Ds",
        desc: "Creates masculine and feminine action nouns or result nouns from verbs.",
        bopomofo: "ㄡˇ",
        hiragana: "うす",
        katakana: "ウス",
        hangul: "엇",
    },
    otr: {
        form: "ótr̥",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C3%B3tr%CC%A5",
        desc: "Derives action nouns from verbal stems.",
        bopomofo: "ㄖㄨ",
        hiragana: "おる",
        katakana: "オル",
        hangul: "올",
    },
    onts: {
        form: "onts",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-onts",
        desc: "Forms adjectives from Caland system roots.",
        bopomofo: "ㄨㄥˇ",
        hiragana: "おぬ",
        katakana: "オヌ",
        hangul: "옰",
    },
    os: {
        form: "os",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-os",
        desc: "Creates action nouns or result nouns from verbs.",
        bopomofo: "ㄡㄙ",
        hiragana: "おそ",
        katakana: "オソ",
        hangul: "옷",
    },
    oyeti: {
        form: "oyéti",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-oy%C3%A9ti",
        desc: "Creates factitive verbs from adjectives.",
        bopomofo: "ㄡㄧㄝˊ",
        hiragana: "おて",
        katakana: "オテ",
        hangul: "예",
    },
    r: {
        form: "r̥",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-r%CC%A5",
        desc: "Derives nouns from roots, frequently mass nouns.",
        bopomofo: "ㄦ",
        hiragana: "る",
        katakana: "ル",
        hangul: "르",
    },
    ros: {
        form: "rós",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-r%C3%B3s",
        desc: "Forms adjectives from Caland system roots.",
        bopomofo: "ㄖㄡ",
        hiragana: "ろす",
        katakana: "ロス",
        hnagul: "럿",
    },
    s: {
        form: "s",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-s",
        desc: "Derives nouns from roots.",
        bopomofo: "ㄙ",
        hiragana: "す",
        katakana: "ス",
        hangul: "스",
    },
    seti: {
        form: "seti",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-seti",
        desc: "Forms primary verbs.",
        bopomofo: "ㄙㄟ",
        hiragana: "せい",
        katakana: "セイ",
        hangul: "싵",
    },
    sketi: {
        form: "sḱéti",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-s%E1%B8%B1%C3%A9ti",
        desc: "Forms durative or iterative imperfective verbs from roots.",
        bopomofo: "ㄎㄧㄝ",
        hiragana: "すけ",
        katakana: "スケ",
        hangul: "싴",
    },
    sneh2: {
        form: "sneh₂",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-sneh%E2%82%82",
        desc: "Used to form nouns denoting an object",
        bopomofo: "ㄙㄣ",
        hiragana: "すね",
        katakana: "スネ",
        hangul: "셓",
    },
    sor: {
        form: "sōr",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-s%C5%8Dr",
        desc: "Derives feminine gender stems from roots",
        bopomofo: "ㄙㄡ",
        hiragana: "そる",
        katakana: "ソル",
        hangul: "솔",
    },
    st: {
        form: "st",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-st",
        desc: "Forms perfective verbs from roots.",
        bopomofo: "ㄙㄞ",
        hiragana: "すた",
        katakana: "スタ",
        hangul: "슽",
    },
    ter: {
        form: "tér",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-t%E1%B8%97r",
        desc: "Derives agent nouns from verbs, denoting someone or something whose role or purpose it is to perform the verb's action.",
        bopomofo: "ㄊㄜ",
        hiragana: "てる",
        katakana: "テル",
        hangul: "텔",
    },
    teh2: {
        form: "téh₂",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-teh%E2%82%82",
        desc: "Used to form nouns representing state of being",
        bopomofo: "ㄊㄟ",
        hiragana: "て",
        katakana: "テ",
        hangul: "테",
    },
    teh2ts: {
        form: "teh₂ts",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-teh%E2%82%82ts",
        desc: "Used to form nouns representing state of being",
        alias: "teh2",
        bopomofo: "ㄊㄟˇ",
        hiragana: "てつ",
        katakana: "テツ",
        hangul: "텻",
    },
    teros: {
        form: "teros",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-teros",
        desc: "Contrastive or oppositional adjectival suffix.",
        bopomofo: "ㄊㄡˊ",
        hiragana: "れす",
        katakana: "レス",
        hangul: "렛",
    },
    tis: {
        form: "tis",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-tis",
        desc: "Derives abstract/action nouns from verb roots.",
        bopomofo: "ㄊㄧ",
        hiragana: "ちす",
        katakana: "チス",
        hangul: "팃",
    },
    tlom: {
        form: "tlom",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-tlom",
        desc: "Forms nouns denoting a tool or instrument.",
        alias: "trom",
        bopomofo: "ㄊㄥ",
        hiragana: "ちょ",
        katakana: "チョ",
        hangul: "치",
    },
    tmmos: {
        form: "tm̥mós",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-tm%CC%A5m%C3%B3s",
        desc: "absolute superlative adjectival suffix.",
        bopomofo: "ㄇㄠ",
        hiragana: "ぽす",
        katakana: "ポス",
        hangul: "텀",
    },
    tnnos: {
        form: "tn̥nós",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-tn%CC%A5n%C3%B3s",
        desc: "Used to form adjectives related to time",
        combo: ["EXTEND", "nos"],
        bopomofo: "及ㄋㄡ",
        hiragana: "及のす",
        katakana: "及ノス",
        hangul: "及턴",
    },
    tor: {
        form: "tōr",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-t%C5%8Dr",
        desc: "Derives agent nouns from verbs, denoting someone or something who has performed the verb's action.",
        bopomofo: "ㄊㄠ",
        hiragana: "とる",
        katakana: "トル",
        hangul: "톨",
    },
    tr: {
        form: "tr̥",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-tr%CC%A5",
        desc: "Derives nouns from verbal roots.",
        bopomofo: "ㄖ",
        hiragana: "つる",
        katakana: "ツル",
        hangul: "틀",
    },
    trih2: {
        form: "trih₂",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-trih%E2%82%82",
        desc: "Derives agent nouns from verbs, denoting someone or something who has performed the verb's action.",
        combo: ["tr", "ih2"],
        bopomofo: "ㄖㄏㄟ",
        hiragana: "ちい",
        katakana: "チイ",
        hangul: "팋",
    },
    tus: {
        form: "tus",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-tus",
        desc: "Derives action nouns from verb roots.",
        bopomofo: "ㄊㄤ",
        hiragana: "つす",
        katakana: "ツス",
        hangul: "툇",
    },
    tweh2: {
        form: "tweh₂",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-tweh%E2%82%82",
        desc: "Forms nouns from verbs",
        combo: ["tus", "eh2"],
        bopomofo: "ㄊㄞ",
        hiragana: "つえ",
        katakana: "ツエ",
        hangul: "퇴",
    },
    us: {
        form: "us",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-us",
        desc: "Forms adjectives from Caland system roots.",
        bopomofo: "ㄨㄙ",
        hiragana: "ゆす",
        katakana: "ユス",
        hangul: "윗",
    },
    wents: {
        form: "wénts",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-w%C3%A9nts",
        desc: "Forms possessive adjectives from nominal stems.",
        bopomofo: "ㄨㄣ",
        hiragana: "うえ",
        katakana: "ウエ",
        hangul: "웬",
    },
    wo_s: {
        form: "wós",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-w%C3%B3s",
        desc: "Creates adjectives from verb stems.",
        bopomofo: "ㄨㄛ",
        hiragana: "うお",
        katakana: "ウオ",
        hangul: "웋",
    },
    woos: {
        form: "wōs",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-w%C5%8Ds",
        desc: "Forms perfect participles from verbs.",
        bopomofo: "ㄨㄛˊ",
        hiragana: "わす",
        katakana: "ワス",
        hangul: "왓",
    },
    wr: {
        form: "wr̥",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-wr%CC%A5",
        desc: `Derives object nouns from verbal roots. e.g. per- "to go through" -> pérwr̥ "ford, crossing"`,
        bopomofo: "ㄨㄖ",
        hiragana: "うる",
        katakana: "ウル",
        hangul: "울",
    },
    yeh: {
        form: "yéh₁",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-y%C3%A9h%E2%82%81-",
        desc: "Forms the optative mood of verbs.",
        bopomofo: "ㄧㄝˋ",
        hiragana: "やえ",
        katakana: "ヤエ",
        hangul: "얘",
    },
    yo_s: {
        form: "yós",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-y%C3%B3s",
        desc: "Creates adjectives from verb stems.",
        bopomofo: "ㄧㄠ",
        hiragana: "よす",
        katakana: "ヨス",
        hangul: "욋",
    },
    yoos: {
        form: "yōs",
        link: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-y%C5%8Ds",
        desc: `Forms adjectives from roots, meaning "very" or "rather".`,
        bopomofo: "ㄧㄡ",
        hiragana: "よう",
        katakana: "ヨウ",
        hangul: "욧",
    },
};

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
            let syllable = hiraganaTable[initial][index];
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
            let syllable = katakanaTable[initial][index];
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

export function addSuffixes(type, word) {
    if (!word.suffix) return "";
    if (!word.suffix.length) return "";
    const parts = [];
    for (const suffix of word.suffix) {
        if (suffix in suffixes) {
            parts.push(suffixes[suffix][type]);
        }
    }
    return parts.join("");
}

export function addFormationType(type, word) {
    if (word.formationType in formationTypes) {
        return formationTypeConversion[type][word.formationType];
    }
    return "";
}

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
