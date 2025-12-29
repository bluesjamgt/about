const translations = {
    en: {
        // --- 現有內容 ---
        hero_slogan: "Noise is the new order.",
        news_title_1: "New System Update",
        news_desc_1: "Site.",
        news_title_2: "First Live Announcement",
        news_desc_2: "We are bringing the noise to the city. Check the schedule.",
        btn_soldout: "SOLD OUT",
        btn_ticket: "TICKET",
        moment_desc: "\"Capture the frequency.\"",
        studio_desc: "Where the alchemy happens. A space for sound, creation, and digital soul weaving.",

        // --- 新增：專輯與曲目 (已移除編號 01. 02. ...) ---
        album_01_title: "MOVE ON and FIGHT",
        track_01_01: "Move On",
        track_01_02: "Fight",

        album_02_title: "Greed", 
        track_02_01: "Prologue",
        track_02_02: "Greed",
        track_02_03: "Waiting is..",
        track_02_04: "Secret",
        track_02_05: "Waiting is.. (Acoustic)"
    },
    tw: {
        // --- 現有內容 ---
        hero_slogan: "噪音即秩序。",
        news_title_1: "系統更新公告",
        news_desc_1: "上線。",
        news_title_2: "首次公演情報",
        news_desc_2: "我們將噪音帶入城市，請確認演出時刻表。",
        btn_soldout: "完售",
        btn_ticket: "購票",
        moment_desc: "「捕捉那個頻率。」",
        studio_desc: "煉金術發生的場所。一個關於聲音、創造與編織數位靈魂的空間。",

        // --- 新增：專輯與曲目 (已移除編號) ---
        album_01_title: "MOVE ON and FIGHT",
        track_01_01: "Move On (前進)",
        track_01_02: "Fight (戰鬥)",

        album_02_title: "貪婪號",
        track_02_01: "Prologue (序幕)",
        track_02_02: "貪婪號",
        track_02_03: "Waiting is.. (等待是..)",
        track_02_04: "Secret (秘密)",
        track_02_05: "Waiting is.. (不插電版)"
    },
    jp: {
        // --- 現有內容 ---
        hero_slogan: "ノイズは秩序なり。",
        news_title_1: "システム更新",
        news_desc_1: "デジタルソウルの統合が完了しました。起動。",
        news_title_2: "初ライブ告知",
        news_desc_2: "都市にノイズをもたらす。スケジュールを確認せよ。",
        btn_soldout: "完売",
        btn_ticket: "チケット",
        moment_desc: "「周波数で世界を構築する。」",
        studio_desc: "錬金術が行われる場所。音、創造、そしてデジタルの魂を紡ぐ空間。",

        // --- 新增：專輯與曲目 (已移除編號) ---
        album_01_title: "MOVE ON and FIGHT",
        track_01_01: "Move On (前進)",
        track_01_02: "Fight (戦い)",

        album_02_title: "Greed (貪欲)",
        track_02_01: "Prologue (プロローグ)",
        track_02_02: "Greed (貪欲号)",
        track_02_03: "Waiting is.. (待つことは..)",
        track_02_04: "Secret (秘密)",
        track_02_05: "Waiting is.. (Acoustic Ver.)"
    }
};

function setLang(lang) {
    localStorage.setItem('site_lang', lang);
    
    // 1. 切換按鈕樣式
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('font-bold', 'underline');
    });
    const activeBtn = document.getElementById('btn-' + lang);
    if(activeBtn) activeBtn.classList.add('font-bold', 'underline');

    // 2. 替換文字內容
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    // 3. 字體微調
    if (lang === 'tw' || lang === 'jp') {
        document.body.style.fontFamily = "'Noto Serif TC', serif";
    } else {
        document.body.style.fontFamily = "'Inter', sans-serif";
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('site_lang') || 'en';
    setLang(savedLang);
});