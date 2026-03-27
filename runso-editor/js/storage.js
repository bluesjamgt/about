import { AppState, Parser, UI } from './app.js';

export const Storage = {
    getAll: function () { return JSON.parse(localStorage.getItem('runsoProjectList')) || {}; },
    newProject: function () {
        if (confirm("建立新專案？未儲存的變更將會遺失。")) {
            AppState.currentProjectId = null; document.getElementById('meta-title').value = "Untitled Song";
            document.getElementById('meta-artist').value = ""; document.getElementById('meta-key').value = "";
            document.getElementById('meta-bpm').value = ""; document.getElementById('raw-lyrics-textarea').value = "";
            document.getElementById('editor-canvas').innerHTML = ""; localStorage.removeItem('runsoLastProjectId'); UI.switchView(2);
        }
    },
    saveProject: function (silent = false) {
        if (document.getElementById('view-raw').style.display === 'block') {
            AppState.rawData = document.getElementById('raw-lyrics-textarea').value;
            Parser.rawToEditor();
        } else {
            Parser.editorToRaw();
        }

        const title = document.getElementById('meta-title').value.trim() || "Untitled Song";
        if (!AppState.currentProjectId) AppState.currentProjectId = 'PROJ_' + Date.now();
        const pData = {
            id: AppState.currentProjectId, title: title, artist: document.getElementById('meta-artist').value,
            key: document.getElementById('meta-key').value, bpm: document.getElementById('meta-bpm').value,
            rawText: AppState.rawData, updatedAt: new Date().toLocaleString()
        };

        const p = this.getAll(); p[AppState.currentProjectId] = pData;
        localStorage.setItem('runsoProjectList', JSON.stringify(p));
        localStorage.setItem('runsoLastProjectId', AppState.currentProjectId);

        if (!silent) alert(`已儲存：「${title}」`);
    },
    saveAsNew: function () {
        AppState.currentProjectId = null;
        document.getElementById('meta-title').value += " (Copy)";
        this.saveProject();
    },
    updateMeta: function (id, field, val) {
        const p = this.getAll();
        if (p[id]) {
            p[id][field] = val; p[id].updatedAt = new Date().toLocaleString();
            localStorage.setItem('runsoProjectList', JSON.stringify(p));
            if (AppState.currentProjectId === id) {
                if (field === 'title') document.getElementById('meta-title').value = val;
                if (field === 'artist') document.getElementById('meta-artist').value = val;
                if (field === 'key') document.getElementById('meta-key').value = val;
                if (field === 'bpm') document.getElementById('meta-bpm').value = val;
            }
        }
    },
    cloneProject: function (id) {
        const p = this.getAll();
        if (p[id]) {
            const newId = 'PROJ_' + Date.now();
            const clone = JSON.parse(JSON.stringify(p[id]));
            clone.id = newId; clone.title = clone.title + " (Copy)"; clone.updatedAt = new Date().toLocaleString();
            p[newId] = clone; localStorage.setItem('runsoProjectList', JSON.stringify(p));
            this.openManager();
        }
    },
    openManager: function () {
        const c = document.getElementById('project-list-container'); c.innerHTML = "";
        const p = this.getAll(); const keys = Object.keys(p).sort((a, b) => b.localeCompare(a));
        if (keys.length === 0) {
            c.innerHTML = "<p style='color:#888; text-align:center;'>尚未儲存任何專案。</p>";
        } else {
            keys.forEach(k => {
                const proj = p[k];
                c.innerHTML += `
                <div class="project-item">
                    <div style="display:flex; align-items:center; gap:12px; width:100%;">
                        <input type="checkbox" class="proj-cb" value="${k}">
                        <div class="project-info">
                            <input type="text" value="${proj.title}" onchange="Storage.updateMeta('${k}', 'title', this.value)" style="font-weight:bold; width:200px;">
                            <input type="text" value="${proj.artist || ''}" placeholder="藝人" onchange="Storage.updateMeta('${k}', 'artist', this.value)" style="width:100px;">
                            <input type="text" value="${proj.key || ''}" placeholder="Key" onchange="Storage.updateMeta('${k}', 'key', this.value)" style="width:50px;">
                            <input type="text" value="${proj.bpm || ''}" placeholder="BPM" onchange="Storage.updateMeta('${k}', 'bpm', this.value)" style="width:60px;">
                        </div>
                        <div class="project-actions">
                            <button class="btn-load" onclick="Storage.loadProject('${k}')">讀取</button>
                            <button onclick="Storage.cloneProject('${k}')">複製</button>
                            <button class="btn-del" onclick="Storage.deleteProject('${k}')">刪除</button>
                        </div>
                    </div>
                </div>`;
            });
        }
        document.getElementById('project-modal').style.display = 'flex';
    },
    toggleSelectAll: function (checked) { document.querySelectorAll('.proj-cb').forEach(cb => cb.checked = checked); },
    exportSelected: function () {
        const cbs = document.querySelectorAll('.proj-cb:checked');
        if (cbs.length === 0) return alert("請先勾選要匯出的專案！");
        const currentProjects = this.getAll(); const exportData = {};
        cbs.forEach(cb => { if (currentProjects[cb.value]) exportData[cb.value] = currentProjects[cb.value]; });
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob); const a = document.createElement('a');
        a.href = url; a.download = `runso_backup_${Date.now()}.json`; a.click(); URL.revokeObjectURL(url);
    },
    importFile: function (e) {
        const file = e.target.files[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedData = JSON.parse(event.target.result);
                const currentProjects = this.getAll();
                Object.keys(importedData).forEach(k => { currentProjects[k] = importedData[k]; });
                localStorage.setItem('runsoProjectList', JSON.stringify(currentProjects));
                alert("匯入成功！"); this.openManager();
            } catch (err) { alert("檔案格式錯誤！請確保是 .json 備份檔。"); }
        };
        reader.readAsText(file); e.target.value = '';
    },
    closeManager: function () { document.getElementById('project-modal').style.display = 'none'; },
    loadProject: function (id) {
        const p = this.getAll()[id];
        if (p) {
            AppState.currentProjectId = p.id; document.getElementById('meta-title').value = p.title; document.getElementById('meta-artist').value = p.artist || "";
            document.getElementById('meta-key').value = p.key || ""; document.getElementById('meta-bpm').value = p.bpm || "";
            document.getElementById('raw-lyrics-textarea').value = p.rawText; AppState.rawData = p.rawText;
            localStorage.setItem('runsoLastProjectId', p.id); this.closeManager(); Parser.rawToEditor(); UI.switchView(2);
        }
    },
    deleteProject: function (id) {
        if (confirm("確定刪除此專案？")) {
            const p = this.getAll(); delete p[id]; localStorage.setItem('runsoProjectList', JSON.stringify(p));
            if (AppState.currentProjectId === id) AppState.currentProjectId = null; this.openManager();
        }
    }
};