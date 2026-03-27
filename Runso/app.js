// 模擬的 JSON 資料 (未來可以存在 localStorage 或後端)
const projectData = {
    global_dictionary: {
        "華やいだ": "はなやいだ",
        "風": "かぜ",
        "溶けて": "とけて",
        "自分": "じぶん"
    },
    lyrics: [
        [ // 第一行
            { text: "華やいだ", chord: "Am" },
            { text: "風", chord: null },
            { text: "に", chord: "E" },
            { text: "さらされても", chord: null }
        ],
        [ // 第二行
            { text: "溶けて", chord: "F#m" },
            { text: "ゆけない", chord: null },
            { text: "自分", chord: "G" },
            { text: "を見つめている", chord: "E" }
        ]
    ]
};

// 渲染歌詞網格的魔法
function renderLyrics() {
    const sheet = document.getElementById('lyric-sheet');
    const dict = projectData.global_dictionary;

    projectData.lyrics.forEach(line => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'lyric-line';

        line.forEach(block => {
            const wordDiv = document.createElement('div');
            wordDiv.className = 'word-block';

            // 1. 渲染和弦 (如果有的話)
            const chordSpan = document.createElement('span');
            chordSpan.className = 'chord-label';
            chordSpan.innerText = block.chord ? block.chord : "";
            wordDiv.appendChild(chordSpan);

            // 2. 渲染歌詞與自動匹配注音 (Furigana)
            const furigana = dict[block.text];
            if (furigana) {
                wordDiv.innerHTML += `<ruby>${block.text}<rt>${furigana}</rt></ruby>`;
            } else {
                wordDiv.innerHTML += `<span>${block.text}</span>`;
            }

            lineDiv.appendChild(wordDiv);
        });
        sheet.appendChild(lineDiv);
    });
}

// 渲染右側字典的魔法
function renderDictionary() {
    const dictView = document.getElementById('dict-view');
    const dict = projectData.global_dictionary;

    for (const [kanji, kana] of Object.entries(dict)) {
        dictView.innerHTML += `<div class="dict-item"><strong>${kanji}</strong> : ${kana}</div>`;
    }
}

// 啟動引擎
renderLyrics();
renderDictionary();