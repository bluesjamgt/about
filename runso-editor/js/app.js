import { Storage } from './storage.js';
import { Transposer } from './transposer.js';

// 狀態管理
export const AppState = {
    rawData: "[A|4|Verse 1]華やいだ風に [E]さらされても\n[F#m]溶けてゆけない {自分|じぶん}を見つめている\n\n[C#m7|4|Solo][D5|4|] \n",
    activeElement: null,
    activeBatchChords: [],
    currentProjectId: null
};

// 解析器
export const Parser = {
    extractNode: function (node) {
        let out = "";
        for (let child of node.childNodes) {
            if (child.nodeType === Node.TEXT_NODE) {
                out += child.nodeValue;
            } else if (child.classList && child.classList.contains('chord-widget')) {
                const input = child.querySelector('.chord-val');
                if (input) {
                    let val = input.innerText.replace(/\+/g, '').trim();
                    let params = [val === "和弦" ? "" : val, input.dataset.beats || "", input.dataset.section || "", input.dataset.xOffset || "0", input.dataset.yOffset || "0"];
                    while (params.length > 1 && (params[params.length - 1] === "" || params[params.length - 1] === "0")) { params.pop(); }
                    out += `[${params.join('|')}]`;
                }
            } else if (child.classList && child.classList.contains('lyric-ruby')) {
                out += `{${Parser.extractNode(child)}|${child.dataset.rt || ""}}`;
            } else if (child.nodeName === 'BR') {
                if (child.parentNode.nodeName !== 'DIV' || child.parentNode.childNodes.length > 1) { out += '\n'; }
            } else if (child.nodeName === 'DIV' || child.nodeName === 'P') {
                out += '\n' + Parser.extractNode(child);
            } else { out += Parser.extractNode(child); }
        }
        return out;
    },
    editorToRaw: function () {
        let text = Parser.extractNode(document.getElementById('editor-canvas'));
        text = text.replace(/^[\n]/, '').trimEnd() + '\n';
        document.getElementById('raw-lyrics-textarea').value = text;
        AppState.rawData = text;
        UI.updateDict();
    },
    rawToEditor: function () {
        let text = document.getElementById('raw-lyrics-textarea').value;
        let html = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

        const lines = html.split('\n');
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            let stripped = line.replace(/\[.*?\]/g, '').trim();
            if (stripped === '' && line.includes('[')) { lines[i] = line.replace(/ /g, '\t'); }
        }
        html = lines.map(l => `<div>${l === '' ? '<br>' : l}</div>`).join('');

        html = html.replace(/\{([^\|\}]+)\|([^}]*)\}/g, `<span class="lyric-ruby" data-rt="$2">$1</span>`);
        html = html.replace(/\[([^\]]*)\]/g, (match, content) => {
            const p = content.split('|');
            const x = p[3] || "0"; const y = p[4] || "0";
            let style = (x !== "0" ? `margin-left: ${x}px; ` : '') + (y !== "0" ? `margin-bottom: ${y}px; ` : '');
            return `<span class="chord-widget" contenteditable="false"><span class="chord-val" contenteditable="true" data-beats="${p[1] || ""}" data-section="${p[2] || ""}" data-x-offset="${x}" data-y-offset="${y}" style="${style}" oninput="Inspector.syncChordVal(this)">${p[0] || ""}</span></span>`;
        });

        document.getElementById('editor-canvas').innerHTML = html;
        document.querySelectorAll('.chord-val').forEach(el => el.addEventListener('keydown', Interaction.handleChordKeydown));
        UI.updateDict();
    }
};

// 介面渲染
export const UI = {
    init: function () {
        const controls = [
            { id: 'ui-chord-size', var: '--dyn-chord-size', unit: 'rem', valId: 'val-chord-size' },
            { id: 'ui-lyric-size', var: '--dyn-lyric-size', unit: 'rem', valId: 'val-lyric-size' },
            { id: 'ui-line-height', var: '--dyn-line-height', unit: '', valId: 'val-line-height' },
            { id: 'ui-global-x', var: '--dyn-chord-global-x', unit: 'px', valId: 'val-global-x' },
            { id: 'ui-global-y', var: '--dyn-chord-global-y', unit: 'px', valId: 'val-global-y' },
            { id: 'ui-canvas-pad', var: '--dyn-canvas-padding', unit: '%', valId: 'val-canvas-pad' }
        ];

        controls.forEach(c => {
            const el = document.getElementById(c.id);
            if (el) { // 🛡️ 防呆：確保元素存在才綁定，防止畫面變白
                el.addEventListener('input', (e) => {
                    document.getElementById(c.valId).innerText = e.target.value;
                    document.documentElement.style.setProperty(c.var, e.target.value + c.unit);
                });
            }
        });

        const colToggle = document.getElementById('ui-columns');
        if (colToggle) {
            colToggle.addEventListener('change', (e) => {
                document.documentElement.style.setProperty('--dyn-columns', e.target.checked ? '2' : '1');
            });
        }

        // ✨ 新增：隱藏和弦開關 (純歌詞模式)
        const hideToggle = document.getElementById('toggle-hide-chords');
        if (hideToggle) {
            hideToggle.addEventListener('change', (e) => {
                const canvas = document.getElementById('editor-canvas');
                if (e.target.checked) {
                    canvas.classList.add('hide-chords');
                } else {
                    canvas.classList.remove('hide-chords');
                }
            });
        }
    },

    switchView: function (tabIndex) {
        document.querySelectorAll('.tab').forEach((t, i) => t.classList.toggle('active', i === tabIndex - 1));
        document.getElementById('view-raw').style.display = (tabIndex === 1) ? 'block' : 'none';
        document.getElementById('view-arrange').style.display = (tabIndex === 2) ? 'block' : 'none';
        document.getElementById('view-ruby').style.display = (tabIndex === 3) ? 'block' : 'none';
        document.getElementById('view-leadsheet').style.display = (tabIndex === 4) ? 'block' : 'none';

        if (tabIndex === 1) Parser.editorToRaw();
        if (tabIndex === 2 && document.getElementById('raw-lyrics-textarea').value !== AppState.rawData) {
            AppState.rawData = document.getElementById('raw-lyrics-textarea').value; Parser.rawToEditor();
        }
        if (tabIndex === 4) { Parser.editorToRaw(); UI.renderLeadSheet(); }

        document.getElementById('print-title-text').innerText = document.getElementById('meta-title').value || "Untitled Song";
        document.getElementById('print-artist-text').innerText = document.getElementById('meta-artist').value || "Unknown";
        document.getElementById('print-key-text').innerText = "Key: " + (document.getElementById('meta-key').value || "-");
        document.getElementById('print-bpm-text').innerText = "BPM: " + (document.getElementById('meta-bpm').value || "-");
    },

    toggleSidebar: function () {
        const sidebar = document.getElementById('app-sidebar');
        const btn = document.getElementById('toggle-sidebar-btn');
        sidebar.classList.toggle('collapsed');
        btn.innerText = sidebar.classList.contains('collapsed') ? '⬅️ ' : '➡️ ';
    },

    toggleZenMode: function () {
        document.body.classList.toggle('zen-mode');
        const btn = document.getElementById('zen-toggle-btn');
        if (btn) {
            if (document.body.classList.contains('zen-mode')) {
                btn.innerHTML = '⬇️'; // 進入滿版後變成向下箭頭
                btn.style.color = 'var(--primary)';
                btn.style.borderColor = 'var(--primary)';
                btn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; // 給浮動按鈕加個立體陰影
            } else {
                btn.innerHTML = '⬆️'; // 恢復原狀
                btn.style.color = 'var(--text)';
                btn.style.borderColor = 'var(--border)';
                btn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.02)';
            }
        }
    },

    updateDict: function () {
        const container = document.getElementById('dict-list-container');
        const dictMap = new Map();
        document.getElementById('editor-canvas').querySelectorAll('.lyric-ruby').forEach(r => {
            let base = r.innerText.trim(); if (base) dictMap.set(base, r.dataset.rt || "");
        });
        if (dictMap.size === 0) { container.innerHTML = '<div style="padding: 12px; font-size:0.8rem; color:#888; text-align:center;">畫布上尚無標記資料。</div>'; return; }
        container.innerHTML = "";
        dictMap.forEach((rt, base) => { container.innerHTML += `<div class="dict-item"><span class="dict-base">${base}</span><span class="dict-rt">${rt}</span></div>`; });
    },

    renderLeadSheet: function () {
        const surface = document.getElementById('leadsheet-canvas'); surface.innerHTML = "";
        let hasValid = false; let currentSec = ""; let grid = null;
        document.getElementById('editor-canvas').querySelectorAll('.chord-val').forEach(input => {
            const val = input.innerText.replace(/\+/g, '').trim();
            if (!val || val === "和弦") return;
            hasValid = true;
            if (input.dataset.section && input.dataset.section !== currentSec) {
                currentSec = input.dataset.section;
                const block = document.createElement('div'); block.className = 'section-block';
                block.innerHTML = `<div class="section-title">${currentSec}</div>`;
                grid = document.createElement('div'); grid.className = 'chord-grid';
                block.appendChild(grid); surface.appendChild(block);
            } else if (!currentSec && !grid) {
                grid = document.createElement('div'); grid.className = 'chord-grid'; surface.appendChild(grid);
            }
            grid.innerHTML += `<div class="chord-item"><span>${val}</span>${input.dataset.beats ? `<span class="beat-badge">${input.dataset.beats}</span>` : ''}</div>`;
        });
        if (!hasValid) surface.innerHTML = '<div class="empty-state">無有效和弦</div>';
    }
};

// 交互引擎
export const Interaction = {
    handleCanvasClick: function (e) {
        const ruby = e.target.closest('.lyric-ruby'); const chord = e.target.closest('.chord-val');
        if (chord && AppState.activeBatchChords.length <= 1) { Inspector.setChord(chord); }
        else if (ruby) { Inspector.setRuby(ruby); }
    },
    clearActiveState: function () {
        if (AppState.activeElement) AppState.activeElement.classList.remove('editing');
        AppState.activeBatchChords.forEach(c => c.classList.remove('batch-selected'));
        AppState.activeBatchChords = []; AppState.activeElement = null;
        document.getElementById('inspector-empty').style.display = 'block';
        document.getElementById('inspector-chord-form').style.display = 'none';
        document.getElementById('inspector-ruby-form').style.display = 'none';
        document.getElementById('inspector-title').innerText = "🎯 屬性編輯";
    },
    insertChord: function () {
        const canvas = document.getElementById('editor-canvas'); canvas.focus();
        let sel = window.getSelection(); if (!sel.rangeCount) return;
        let range = sel.getRangeAt(0); if (!canvas.contains(range.commonAncestorContainer)) return;

        const widget = document.createElement('span'); widget.className = 'chord-widget'; widget.contentEditable = "false";
        const input = document.createElement('span'); input.className = 'chord-val'; input.contentEditable = "true";
        input.dataset.beats = ""; input.dataset.section = ""; input.dataset.xOffset = "0"; input.dataset.yOffset = "0";

        input.oninput = function () { Inspector.syncChordVal(this); };
        input.addEventListener('keydown', Interaction.handleChordKeydown);

        widget.appendChild(input); range.insertNode(widget);
        range.setStartAfter(widget); range.collapse(true); sel.removeAllRanges(); sel.addRange(range);
        input.focus(); Inspector.setChord(input);
    },
    handleChordKeydown: function (e) {
        if (e.key === 'Backspace' && this.innerText.replace(/\+/g, '').trim() === '') {
            e.preventDefault(); this.parentElement.remove(); Interaction.clearActiveState(); document.getElementById('editor-canvas').focus();
        }
        if (e.key === 'Enter') { e.preventDefault(); this.blur(); document.getElementById('editor-canvas').focus(); }
    },
    insertRuby: function () {
        const canvas = document.getElementById('editor-canvas'); let sel = window.getSelection();
        if (!sel.rangeCount || sel.isCollapsed) { alert("請先選取要標記的文字！"); return; }
        let range = sel.getRangeAt(0); if (!canvas.contains(range.commonAncestorContainer)) return;

        const ruby = document.createElement('span'); ruby.className = 'lyric-ruby'; ruby.dataset.rt = '字典解釋'; ruby.innerText = range.toString();
        range.deleteContents(); range.insertNode(ruby); sel.removeAllRanges(); Inspector.setRuby(ruby);
    }
};

document.addEventListener('selectionchange', () => {
    const sel = window.getSelection(); if (sel.isCollapsed) return;
    const canvas = document.getElementById('editor-canvas'); if (!canvas.contains(sel.anchorNode)) return;

    const selected = [];
    canvas.querySelectorAll('.chord-val').forEach(c => { if (sel.containsNode(c, true)) selected.push(c); });

    if (selected.length > 1) {
        AppState.activeBatchChords.forEach(c => c.classList.remove('batch-selected'));
        AppState.activeBatchChords = selected;
        AppState.activeBatchChords.forEach(c => c.classList.add('batch-selected'));
        AppState.activeElement = null; Inspector.showBatch();
    } else {
        AppState.activeBatchChords.forEach(c => c.classList.remove('batch-selected'));
        AppState.activeBatchChords = [];
    }
});

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); Interaction.insertChord(); }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'j') { e.preventDefault(); Interaction.insertRuby(); }
});
document.getElementById('editor-canvas').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); document.execCommand('insertLineBreak'); }
    if (e.key === 'Tab') { e.preventDefault(); document.execCommand('insertText', false, '\t'); }
});

// 屬性面板
export const Inspector = {
    props: {
        val: document.getElementById('prop-chord'), beats: document.getElementById('prop-beats'), sec: document.getElementById('prop-section'),
        x: document.getElementById('prop-x-offset'), y: document.getElementById('prop-y-offset'),
        rBase: document.getElementById('prop-ruby-base'), rRt: document.getElementById('prop-ruby-rt')
    },
    setChord: function (el) {
        Interaction.clearActiveState(); AppState.activeElement = el; el.classList.add('editing');
        document.getElementById('inspector-empty').style.display = 'none'; document.getElementById('inspector-chord-form').style.display = 'block';
        document.getElementById('group-chord-name').style.display = 'block'; document.getElementById('group-chord-move').style.display = 'block';
        document.getElementById('group-chord-beats').style.display = 'block'; document.getElementById('group-chord-section').style.display = 'block';
        document.getElementById('group-batch-actions').style.display = 'none'; document.getElementById('btn-delete-chord').style.display = 'block';

        let val = el.innerText.replace(/\+/g, '').trim(); this.props.val.value = val === "和弦" ? "" : val;
        this.props.beats.value = el.dataset.beats || ""; this.props.sec.value = el.dataset.section || "";
        this.props.x.value = el.dataset.xOffset || "0"; document.getElementById('val-x-offset').innerText = this.props.x.value + "px";
        this.props.y.value = el.dataset.yOffset || "0"; document.getElementById('val-y-offset').innerText = this.props.y.value + "px";
    },
    showBatch: function () {
        document.getElementById('inspector-empty').style.display = 'none'; document.getElementById('inspector-chord-form').style.display = 'block';
        document.getElementById('inspector-title').innerText = `🎯 批次編輯 (${AppState.activeBatchChords.length}個)`;
        document.getElementById('group-chord-name').style.display = 'none'; document.getElementById('group-chord-move').style.display = 'none';
        document.getElementById('group-chord-beats').style.display = 'none'; document.getElementById('group-chord-section').style.display = 'none';
        document.getElementById('group-batch-actions').style.display = 'block'; document.getElementById('btn-delete-chord').style.display = 'none';

        this.props.x.value = 0; document.getElementById('val-x-offset').innerText = "微調";
        this.props.y.value = 0; document.getElementById('val-y-offset').innerText = "微調";
    },
    setRuby: function (el) {
        Interaction.clearActiveState(); AppState.activeElement = el; el.classList.add('editing');
        document.getElementById('inspector-empty').style.display = 'none'; document.getElementById('inspector-ruby-form').style.display = 'block';
        this.props.rBase.value = el.innerText; this.props.rRt.value = el.dataset.rt || ""; this.props.rRt.focus();
    },
    syncChordVal: function (el) {
        if (AppState.activeElement === el) { this.props.val.value = el.innerText.replace(/\+/g, '').trim() === "和弦" ? "" : el.innerText.replace(/\+/g, '').trim(); }
    },
    moveChord: function (dir) {
        if (!AppState.activeElement) return;
        let widget = AppState.activeElement.parentElement;
        let target = dir === -1 ? widget.previousSibling : widget.nextSibling;
        while (target && target.nodeType === Node.TEXT_NODE && target.textContent === "") { target = dir === -1 ? target.previousSibling : target.nextSibling; }
        if (target) {
            if (target.nodeType === Node.TEXT_NODE) {
                let t = target.textContent;
                if (dir === -1) { target.textContent = t.slice(0, -1); widget.after(document.createTextNode(t.slice(-1))); }
                else { target.textContent = t.slice(1); widget.before(document.createTextNode(t.slice(0, 1))); }
            } else { dir === -1 ? target.before(widget) : target.after(widget); }
            AppState.activeElement.focus();
        }
    },
    removeActiveElement: function () {
        if (AppState.activeElement) {
            if (AppState.activeElement.classList.contains('chord-val')) AppState.activeElement.parentElement.remove();
            else { AppState.activeElement.replaceWith(document.createTextNode(AppState.activeElement.innerText)); }
        }
        Interaction.clearActiveState(); UI.updateDict();
    },
    bindEvents: function () {
        this.props.val.addEventListener('input', e => { if (AppState.activeElement) AppState.activeElement.innerText = e.target.value; });
        this.props.beats.addEventListener('change', e => { if (AppState.activeElement) AppState.activeElement.dataset.beats = e.target.value; });
        this.props.sec.addEventListener('input', e => { if (AppState.activeElement) AppState.activeElement.dataset.section = e.target.value; });

        this.props.x.addEventListener('input', e => {
            let v = parseInt(e.target.value);
            if (AppState.activeBatchChords.length > 1) {
                AppState.activeBatchChords.forEach(c => { c.style.marginLeft = (parseInt(c.dataset.xOffset || 0) + v) + 'px'; });
                document.getElementById('val-x-offset').innerText = `+${v}px`;
            } else if (AppState.activeElement) { AppState.activeElement.dataset.xOffset = v; AppState.activeElement.style.marginLeft = v + 'px'; document.getElementById('val-x-offset').innerText = v + "px"; }
        });
        this.props.y.addEventListener('input', e => {
            let v = parseInt(e.target.value);
            if (AppState.activeBatchChords.length > 1) {
                AppState.activeBatchChords.forEach(c => { c.style.marginBottom = (parseInt(c.dataset.yOffset || 0) + v) + 'px'; });
                document.getElementById('val-y-offset').innerText = `+${v}px`;
            } else if (AppState.activeElement) { AppState.activeElement.dataset.yOffset = v; AppState.activeElement.style.marginBottom = v + 'px'; document.getElementById('val-y-offset').innerText = v + "px"; }
        });
        this.props.x.addEventListener('change', e => {
            if (AppState.activeBatchChords.length > 1) {
                let v = parseInt(e.target.value); AppState.activeBatchChords.forEach(c => { c.dataset.xOffset = parseInt(c.dataset.xOffset || 0) + v; });
                Inspector.props.x.value = 0; document.getElementById('val-x-offset').innerText = "微調";
            }
        });
        this.props.y.addEventListener('change', e => {
            if (AppState.activeBatchChords.length > 1) {
                let v = parseInt(e.target.value); AppState.activeBatchChords.forEach(c => { c.dataset.yOffset = parseInt(c.dataset.yOffset || 0) + v; });
                Inspector.props.y.value = 0; document.getElementById('val-y-offset').innerText = "微調";
            }
        });
        this.props.rRt.addEventListener('input', e => { if (AppState.activeElement) { AppState.activeElement.dataset.rt = e.target.value; UI.updateDict(); } });
    }
};

// 暴露 API 供 HTML inline handler 呼叫
window.UI = UI;
window.Interaction = Interaction;
window.Inspector = Inspector;
window.Storage = Storage;

window.onload = () => {
    UI.init(); Inspector.bindEvents();
    const lastId = localStorage.getItem('runsoLastProjectId');
    if (lastId && Storage.getAll()[lastId]) { Storage.loadProject(lastId); }
    else { document.getElementById('raw-lyrics-textarea').value = AppState.rawData; Parser.rawToEditor(); }
};