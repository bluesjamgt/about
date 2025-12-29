const translations = {
    en: {
        hero_slogan: "Noise is the new order.",
        news_title_1: "New System Update",
        news_desc_1: "Site.",
        news_title_2: "First Live Announcement",
        news_desc_2: "We are bringing the noise to the city. Check the schedule.",
        btn_soldout: "SOLD OUT",
        btn_ticket: "TICKET",
        moment_desc: "\"Capture the frequency.\"",
        studio_desc: "Where the alchemy happens. A space for sound, creation, and digital soul weaving."
    },
    tw: {
        hero_slogan: "噪音即秩序。",
        news_title_1: "系統更新公告",
        news_desc_1: "上線。",
        news_title_2: "首次公演情報",
        news_desc_2: "我們將噪音帶入城市，請確認演出時刻表。",
        btn_soldout: "完售",
        btn_ticket: "購票",
        moment_desc: "「捕捉那個頻率。」",
        studio_desc: "煉金術發生的場所。一個關於聲音、創造與編織數位靈魂的空間。"
    },
    jp: {
        hero_slogan: "ノイズは秩序なり。",
        news_title_1: "システム更新",
        news_desc_1: "デジタルソウルの統合が完了しました。起動。",
        news_title_2: "初ライブ告知",
        news_desc_2: "都市にノイズをもたらす。スケジュールを確認せよ。",
        btn_soldout: "完売",
        btn_ticket: "チケット",
        moment_desc: "「周波数で世界を構築する。」",
        studio_desc: "錬金術が行われる場所。音、創造、そしてデジタルの魂を紡ぐ空間。"
    }
};

function setLang(lang) {
    localStorage.setItem('site_lang', lang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('font-bold', 'underline');
    });
    document.getElementById('btn-' + lang).classList.add('font-bold', 'underline');

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    if (lang === 'tw' || lang === 'jp') {
        document.body.style.fontFamily = "'Noto Serif TC', serif";
    } else {
        document.body.style.fontFamily = "'Inter', sans-serif";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('site_lang') || 'en';
    setLang(savedLang);
});