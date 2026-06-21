const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const LETTER_PITCH = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
    const SHARP_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
    const FLAT_NAMES = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
    const KEY_OPTIONS = [
      { name: "C", pitch: "C", spelling: "sharp" },
      { name: "D♭", pitch: "C#", spelling: "flat" },
      { name: "D", pitch: "D", spelling: "sharp" },
      { name: "E♭", pitch: "D#", spelling: "flat" },
      { name: "E", pitch: "E", spelling: "sharp" },
      { name: "F", pitch: "F", spelling: "flat" },
      { name: "G♭", pitch: "F#", spelling: "flat" },
      { name: "G", pitch: "G", spelling: "sharp" },
      { name: "A♭", pitch: "G#", spelling: "flat" },
      { name: "A", pitch: "A", spelling: "sharp" },
      { name: "B♭", pitch: "A#", spelling: "flat" },
      { name: "B", pitch: "B", spelling: "sharp" }
    ];
    const SCALES = {
      major: {
        label: "Major",
        intervals: [0, 2, 4, 5, 7, 9, 11],
        degrees: ["1", "2", "3", "4", "5", "6", "7"],
        romans: ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
        solfege: ["Do", "Re", "Mi", "Fa", "Sol", "La", "Ti"]
      },
      minor: {
        label: "minor",
        intervals: [0, 2, 3, 5, 7, 8, 10],
        degrees: ["1", "2", "♭3", "4", "5", "♭6", "♭7"],
        romans: ["i", "ii°", "III", "iv", "v", "VI", "VII"],
        solfege: ["Do", "Re", "Me", "Fa", "Sol", "Le", "Te"]
      }
    };
    const CHORD_QUALITIES = {
      major: {
        triad: [0, 4, 7],
        seventh: [0, 4, 7, 11],
        extended: [0, 4, 7, 11, 14]
      },
      minor: {
        triad: [0, 3, 7],
        seventh: [0, 3, 7, 10],
        extended: [0, 3, 7, 10, 14]
      },
      dominant: {
        triad: [0, 4, 7],
        seventh: [0, 4, 7, 10],
        extended: [0, 4, 7, 10, 14]
      },
      dim: {
        triad: [0, 3, 6],
        seventh: [0, 3, 6, 9],
        extended: [0, 3, 6, 9, 14]
      }
    };
    const THEME_TOKENS = {
      white: { board: "#ffffff", fret: "#e0e2e3", string: "#8f9492", ink: "#1f2423", muted: "rgba(31, 36, 35, .62)" },
      ebony: { board: "#202423", fret: "rgba(220, 232, 228, .58)", string: "rgba(245, 248, 247, .72)", ink: "#f4faf8", muted: "rgba(244, 250, 248, .62)" },
      rosewood: { board: "#4a251c", fret: "rgba(255, 231, 212, .48)", string: "rgba(255, 245, 235, .66)", ink: "#fff3ea", muted: "rgba(255, 243, 234, .66)" },
      maple: { board: "#e7c889", fret: "rgba(92, 62, 30, .34)", string: "rgba(67, 49, 31, .56)", ink: "#2b2115", muted: "rgba(43, 33, 21, .62)" }
    };
    const DEFAULT_NOTE_COLORS = {
      C: "#d8c85a",
      D: "#c98c63",
      E: "#9a86bc",
      F: "#6e93db",
      G: "#7fb39a",
      A: "#d78479",
      B: "#5fa7b4"
    };
    const NOTE_COLORS = { ...DEFAULT_NOTE_COLORS };
    const RECENT_NOTE_COLORS = { ...DEFAULT_NOTE_COLORS };
    const STORAGE_KEY = "bluesjamgt.fretboard.settings.v1";
    const TUNINGS = {
      4: {
        "Bass Standard": ["G", "D", "A", "E"],
        "Ukulele High G": ["A", "E", "C", "G"]
      },
      5: {
        "5-String Bass": ["G", "D", "A", "E", "B"]
      },
      6: {
        "Guitar Standard": ["E", "B", "G", "D", "A", "E"],
        "Drop D": ["E", "B", "G", "D", "A", "D"],
        "Open G": ["D", "B", "G", "D", "G", "D"]
      },
      7: {
        "7-String Guitar": ["E", "B", "G", "D", "A", "E", "B"]
      },
      8: {
        "8-String Guitar": ["E", "B", "G", "D", "A", "E", "B", "F#"]
      }
    };
    const FUTURE_LAYERS = {
      chord: null,
      arpeggio: null,
      pattern: null,
      pentatonic: null,
      noteLanguage: "movable-do"
    };

    const dom = {
      fretboard: document.querySelector("#fretboard"),
      stage: document.querySelector("#stage"),
      stringCount: document.querySelector("#string-count"),
      tuningPreset: document.querySelector("#tuning-preset"),
      boardTheme: document.querySelector("#board-theme"),
      keyRoot: document.querySelector("#key-root"),
      scaleType: document.querySelector("#scale-type"),
      chordType: document.querySelector("#chord-type"),
      chordQuality: document.querySelector("#chord-quality"),
      arpMode: document.querySelector("#arp-mode"),
      patternShape: document.querySelector("#pattern-shape"),
      noteSwitchboard: document.querySelector("#note-switchboard"),
      fretCount: document.querySelector("#fret-count"),
      displayScale: document.querySelector("#display-scale"),
      displayOutput: document.querySelector("#display-output"),
      aspectScale: document.querySelector("#aspect-scale"),
      aspectOutput: document.querySelector("#aspect-output"),
      zoomOut: document.querySelector("#zoom-out"),
      zoomIn: document.querySelector("#zoom-in"),
      zoomOutput: document.querySelector("#zoom-output"),
      keyBadge: document.querySelector("#key-badge"),
      modeButtons: document.querySelectorAll("[data-mode]"),
      labelButtons: document.querySelectorAll("[data-label-mode]"),
      colorPickers: document.querySelectorAll("[data-note-color]"),
      paletteButtons: document.querySelectorAll("[data-palette-dot]"),
      showBoth: document.querySelector("#show-both"),
      infoPosition: document.querySelector("#info-position"),
      infoNote: document.querySelector("#info-note"),
      infoSolfege: document.querySelector("#info-solfege"),
      infoDegree: document.querySelector("#info-degree"),
      infoRelation: document.querySelector("#info-relation"),
      infoString: document.querySelector("#info-string")
    };

    const state = {
      strings: 6,
      frets: 12,
      tuning: TUNINGS[6]["Guitar Standard"],
      tuningPresetName: "Guitar Standard",
      root: "C",
      keyName: "C",
      keySpelling: "sharp",
      scale: "major",
      mode: "scale",
      labelMode: "note",
      boardTheme: "white",
      displayScale: 100,
      pageScale: 100,
      aspectScale: 100,
      chordType: "scale",
      chordQuality: "major",
      arpMode: "off",
      patternShape: "all",
      pitchListMode: "all",
      soloPitches: new Set(),
      pitchOverrides: {},
      markerTool: "cycle",
      colorMode: "color",
      manualOn: new Set(),
      manualOff: new Set(),
      manualSelected: new Set(),
      selected: { stringIndex: 5, fret: 1 }
    };

    function noteIndex(note) {
      return NOTES.indexOf(note);
    }

    function noteAt(openNote, fret) {
      return NOTES[(noteIndex(openNote) + fret) % NOTES.length];
    }

    function displayNote(note) {
      return displayPitch(note);
    }

    function keyProfile() {
      return KEY_OPTIONS.find(key => key.name === state.keyName) || KEY_OPTIONS[0];
    }

    function accidentalSymbol(offset) {
      if (offset === 0) return "";
      if (offset === 1) return "♯";
      if (offset === 2) return "𝄪";
      if (offset === 11) return "♭";
      if (offset === 10) return "𝄫";
      return "";
    }

    function scaleSpellings() {
      const scale = SCALES[state.scale];
      const rootLetter = state.keyName[0];
      const letters = ["C", "D", "E", "F", "G", "A", "B"];
      const rootLetterIndex = letters.indexOf(rootLetter);
      const byPitch = new Map();
      scale.intervals.forEach((interval, degreeIndex) => {
        const letter = letters[(rootLetterIndex + degreeIndex) % letters.length];
        const targetPitch = (noteIndex(state.root) + interval) % 12;
        const naturalPitch = LETTER_PITCH[letter];
        const accidental = (targetPitch - naturalPitch + 12) % 12;
        byPitch.set(NOTES[targetPitch], `${letter}${accidentalSymbol(accidental)}`);
      });
      return byPitch;
    }

    function displayPitch(note) {
      const inScaleName = scaleSpellings().get(note);
      if (inScaleName) return inScaleName;
      const pitch = noteIndex(note);
      return state.keySpelling === "flat" ? FLAT_NAMES[pitch] : SHARP_NAMES[pitch];
    }

    function scaleInfo(note) {
      const scale = SCALES[state.scale];
      const distance = (noteIndex(note) - noteIndex(state.root) + 12) % 12;
      const degreeIndex = scale.intervals.indexOf(distance);
      if (degreeIndex < 0) {
        return {
          inKey: false,
          degree: "非調內",
          roman: "",
          solfege: "-"
        };
      }
      return {
        inKey: true,
        degree: scale.degrees[degreeIndex],
        roman: scale.romans[degreeIndex],
        solfege: scale.solfege[degreeIndex]
      };
    }

    function colorForNote(note) {
      const label = displayPitch(note);
      return NOTE_COLORS[label[0]] || "#9da5aa";
    }

    function syncPalette() {
      Object.entries(NOTE_COLORS).forEach(([note, color]) => {
        document.querySelectorAll(`[data-palette-dot="${note}"]`).forEach(dot => {
          dot.style.setProperty("--legend-color", color);
          dot.title = `切換 ${note} 預設色 / 最近自訂色`;
        });
        document.querySelectorAll(`[data-palette-code="${note}"]`).forEach(code => {
          code.textContent = color.toUpperCase();
        });
        document.querySelectorAll(`[data-note-color="${note}"]`).forEach(input => {
          input.value = color;
        });
      });
    }

    function togglePaletteColor(note) {
      const current = NOTE_COLORS[note].toLowerCase();
      const defaultColor = DEFAULT_NOTE_COLORS[note].toLowerCase();
      const recentColor = RECENT_NOTE_COLORS[note];
      NOTE_COLORS[note] = current === defaultColor ? recentColor : DEFAULT_NOTE_COLORS[note];
      syncPalette();
      render();
    }

    function setPageScale(nextScale) {
      state.pageScale = Math.max(70, Math.min(130, nextScale));
      document.documentElement.style.setProperty("--page-scale", state.pageScale / 100);
      dom.zoomOutput.textContent = `${state.pageScale}%`;
      saveSettings();
    }

    function validNumber(value, fallback, min, max) {
      const number = Number(value);
      if (!Number.isFinite(number)) return fallback;
      return Math.max(min, Math.min(max, number));
    }

    function applyColorMap(target, source) {
      if (!source || typeof source !== "object") return;
      Object.keys(target).forEach(note => {
        if (/^#[0-9a-f]{6}$/i.test(source[note] || "")) {
          target[note] = source[note];
        }
      });
    }

    function saveSettings() {
      const payload = {
        strings: state.strings,
        frets: state.frets,
        tuningPresetName: state.tuningPresetName,
        keyName: state.keyName,
        scale: state.scale,
        mode: state.mode,
        labelMode: state.labelMode,
        boardTheme: state.boardTheme,
        displayScale: state.displayScale,
        aspectScale: state.aspectScale,
        pageScale: state.pageScale,
        chordType: state.chordType,
        chordQuality: state.chordQuality,
        arpMode: state.arpMode,
        patternShape: state.patternShape,
        pitchListMode: state.pitchListMode,
        pitchOverrides: state.pitchOverrides,
        soloPitches: [...state.soloPitches],
        markerTool: state.markerTool,
        colorMode: state.colorMode,
        manualOn: [...state.manualOn],
        manualOff: [...state.manualOff],
        manualSelected: [...state.manualSelected],
        selected: state.selected,
        showBoth: dom.showBoth.checked,
        noteColors: { ...NOTE_COLORS },
        recentNoteColors: { ...RECENT_NOTE_COLORS }
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch (error) {
        console.warn("Unable to save fretboard settings", error);
      }
    }

    function loadSettings() {
      let saved = null;
      try {
        saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      } catch (error) {
        console.warn("Unable to load fretboard settings", error);
      }
      if (!saved || typeof saved !== "object") return;

      state.strings = [4, 5, 6, 7, 8].includes(Number(saved.strings)) ? Number(saved.strings) : state.strings;
      state.frets = [12, 15, 17, 19, 22, 24].includes(Number(saved.frets)) ? Number(saved.frets) : state.frets;
      state.tuningPresetName = TUNINGS[state.strings]?.[saved.tuningPresetName] ? saved.tuningPresetName : state.tuningPresetName;

      const key = KEY_OPTIONS.find(item => item.name === saved.keyName);
      if (key) {
        state.keyName = key.name;
        state.root = key.pitch;
        state.keySpelling = key.spelling;
      }
      if (SCALES[saved.scale]) state.scale = saved.scale;
      if (["scale", "all", "root", "custom"].includes(saved.mode)) state.mode = saved.mode;
      if (["note", "solfege"].includes(saved.labelMode)) state.labelMode = saved.labelMode;
      if (["white", "ebony", "rosewood", "maple"].includes(saved.boardTheme)) state.boardTheme = saved.boardTheme;
      state.displayScale = validNumber(saved.displayScale, state.displayScale, 70, 130);
      state.aspectScale = validNumber(saved.aspectScale, state.aspectScale, 55, 150);
      state.pageScale = validNumber(saved.pageScale, state.pageScale, 70, 130);
      if (["scale", "triad", "seventh", "extended"].includes(saved.chordType)) state.chordType = saved.chordType;
      if (Object.hasOwn(CHORD_QUALITIES, saved.chordQuality)) state.chordQuality = saved.chordQuality;
      if (["off", "triad", "seventh", "spread"].includes(saved.arpMode)) state.arpMode = saved.arpMode;
      if (["all", "box-a", "box-b", "linear"].includes(saved.patternShape)) state.patternShape = saved.patternShape;
      if (["all", "scale"].includes(saved.pitchListMode)) state.pitchListMode = saved.pitchListMode;
      if (["cycle", "draw", "erase"].includes(saved.markerTool)) state.markerTool = saved.markerTool;
      if (["color", "mono"].includes(saved.colorMode)) state.colorMode = saved.colorMode;
      state.pitchOverrides = saved.pitchOverrides && typeof saved.pitchOverrides === "object" ? saved.pitchOverrides : {};
      state.soloPitches = new Set(Array.isArray(saved.soloPitches) ? saved.soloPitches.filter(note => NOTES.includes(note)) : []);
      state.manualOn = new Set(Array.isArray(saved.manualOn) ? saved.manualOn : []);
      state.manualOff = new Set(Array.isArray(saved.manualOff) ? saved.manualOff : []);
      state.manualSelected = new Set(Array.isArray(saved.manualSelected) ? saved.manualSelected : []);
      if (saved.selected && Number.isInteger(saved.selected.stringIndex) && Number.isInteger(saved.selected.fret)) {
        state.selected = {
          stringIndex: Math.max(0, Math.min(state.strings - 1, saved.selected.stringIndex)),
          fret: Math.max(1, Math.min(state.frets, saved.selected.fret))
        };
      }
      dom.showBoth.checked = Boolean(saved.showBoth);
      applyColorMap(NOTE_COLORS, saved.noteColors);
      applyColorMap(RECENT_NOTE_COLORS, saved.recentNoteColors);
    }

    function syncControlsFromState() {
      dom.stringCount.value = String(state.strings);
      dom.tuningPreset.value = state.tuningPresetName;
      dom.boardTheme.value = state.boardTheme;
      syncStageClass();
      dom.keyRoot.value = state.keyName;
      dom.scaleType.value = state.scale;
      dom.fretCount.value = String(state.frets);
      dom.displayScale.value = state.displayScale;
      dom.displayOutput.textContent = `${state.displayScale}%`;
      dom.aspectScale.value = state.aspectScale;
      dom.aspectOutput.textContent = `${state.aspectScale}%`;
      dom.chordType.value = state.chordType;
      dom.chordQuality.value = state.chordQuality;
      dom.arpMode.value = state.arpMode;
      dom.patternShape.value = state.patternShape;
      dom.modeButtons.forEach(item => item.classList.toggle("is-active", item.dataset.mode === state.mode));
      dom.labelButtons.forEach(item => item.classList.toggle("is-active", item.dataset.labelMode === state.labelMode));
    }

    function syncStageClass() {
      dom.stage.className = `stage theme-${state.boardTheme}${state.colorMode === "mono" ? " is-mono" : ""}`;
    }

    function activeChordIntervals() {
      const quality = CHORD_QUALITIES[state.chordQuality] || CHORD_QUALITIES.major;
      if (state.arpMode === "triad") return quality.triad;
      if (state.arpMode === "seventh") return quality.seventh;
      if (state.arpMode === "spread") return quality.extended;
      if (state.chordType === "triad") return quality.triad;
      if (state.chordType === "seventh") return quality.seventh;
      if (state.chordType === "extended") return quality.extended;
      return null;
    }

    function isChordTone(note) {
      const intervals = activeChordIntervals();
      if (!intervals) return true;
      const distance = (noteIndex(note) - noteIndex(state.root) + 12) % 12;
      return intervals.some(interval => interval % 12 === distance);
    }

    function rootPocketStart(offset = 0) {
      const rootFrets = [];
      state.tuning.forEach(openNote => {
        for (let fret = 1; fret <= state.frets; fret += 1) {
          if (noteAt(openNote, fret) === state.root) rootFrets.push(fret);
        }
      });
      const firstRoot = rootFrets.length ? Math.min(...rootFrets) : 1;
      const maxStart = Math.max(1, state.frets - 4);
      return Math.max(1, Math.min(maxStart, firstRoot - 2 + offset));
    }

    function patternAllows(stringIndex, fret) {
      if (state.patternShape === "box-a") {
        const start = rootPocketStart(0);
        return fret >= start && fret <= start + 4;
      }
      if (state.patternShape === "box-b") {
        const start = rootPocketStart(4);
        return fret >= start && fret <= start + 4;
      }
      if (state.patternShape === "linear") {
        return stringIndex === state.selected.stringIndex;
      }
      return true;
    }

    function baseShouldShow(note, stringIndex, fret) {
      const info = scaleInfo(note);
      if (state.mode === "custom") return false;
      if (!patternAllows(stringIndex, fret)) return false;
      if (activeChordIntervals()) return isChordTone(note);
      if (state.mode === "all") return true;
      if (state.mode === "root") return note === state.root;
      return info.inKey;
    }

    function markerKey(stringIndex, fret) {
      return `${stringIndex}:${fret}`;
    }

    function shouldShow(stringIndex, fret, note) {
      const key = markerKey(stringIndex, fret);
      const baseVisible = baseShouldShow(note, stringIndex, fret);
      if (state.soloPitches.size) return state.soloPitches.has(note);
      if (state.manualSelected.has(key)) return true;
      if (state.manualOn.has(key)) return true;
      if (state.manualOff.has(key)) return false;
      if (state.pitchOverrides[note] === true) return true;
      if (state.pitchOverrides[note] === false) return false;
      return baseVisible;
    }

    function toggleMarker(stringIndex, fret, note) {
      const key = markerKey(stringIndex, fret);
      const currentlyVisible = shouldShow(stringIndex, fret, note);
      const currentlySelected = state.manualSelected.has(key);
      state.selected = { stringIndex, fret };

      if (state.markerTool === "draw") {
        state.manualOn.add(key);
        state.manualOff.delete(key);
        state.manualSelected.delete(key);
      } else if (state.markerTool === "erase") {
        state.manualSelected.delete(key);
        state.manualOn.delete(key);
        state.manualOff.add(key);
      } else if (currentlySelected) {
        state.manualSelected.delete(key);
        state.manualOff.add(key);
        state.manualOn.delete(key);
      } else if (currentlyVisible) {
        state.manualSelected.add(key);
        state.manualOn.delete(key);
        state.manualOff.delete(key);
      } else {
        state.manualOn.add(key);
        state.manualOff.delete(key);
        state.manualSelected.delete(key);
      }
    }

    function resetManualMarkers() {
      state.manualOn.clear();
      state.manualOff.clear();
      state.manualSelected.clear();
      state.pitchOverrides = {};
      state.soloPitches.clear();
    }

    function keyLabel() {
      if (state.scale === "minor") return `${state.keyName}m minor`;
      return `${state.keyName} Major`;
    }

    function keyBadgeLabel() {
      if (state.scale === "minor") return `${state.keyName}m`;
      return state.keyName;
    }

    function togglePitch(note) {
      if (state.soloPitches.has(note)) {
        state.soloPitches.delete(note);
        delete state.pitchOverrides[note];
      } else if (state.pitchOverrides[note] === false) {
        state.soloPitches.add(note);
        delete state.pitchOverrides[note];
      } else {
        state.soloPitches.delete(note);
        state.pitchOverrides[note] = false;
      }
      render();
    }

    function renderNoteSwitchboard() {
      dom.noteSwitchboard.innerHTML = "";
      const notes = state.pitchListMode === "scale"
        ? NOTES.filter(note => scaleInfo(note).inKey)
        : NOTES;
      dom.noteSwitchboard.style.gridTemplateColumns = `repeat(${notes.length}, minmax(3.3rem, 4.2rem)) 3.3rem`;
      notes.forEach(note => {
        const info = scaleInfo(note);
        const button = document.createElement("button");
        button.type = "button";
        button.className = [
          "pitch-button",
          info.inKey ? "is-in-key" : "",
          state.pitchOverrides[note] === true ? "is-forced-on" : "",
          state.pitchOverrides[note] === false ? "is-forced-off" : "",
          state.soloPitches.has(note) ? "is-solo" : ""
        ].filter(Boolean).join(" ");
        button.style.setProperty("--note-color", colorForNote(note));
        button.innerHTML = `<strong>${displayPitch(note)}</strong><span>${info.roman}</span>`;
        button.addEventListener("click", () => togglePitch(note));
        dom.noteSwitchboard.append(button);
      });
      const collapse = document.createElement("button");
      collapse.type = "button";
      collapse.className = "pitch-collapse";
      collapse.textContent = state.pitchListMode === "all" ? "<" : ">";
      collapse.setAttribute("aria-label", state.pitchListMode === "all" ? "收合成七音模式" : "展開成十二音模式");
      collapse.addEventListener("click", () => {
        state.pitchListMode = state.pitchListMode === "all" ? "scale" : "all";
        renderNoteSwitchboard();
        saveSettings();
      });
      dom.noteSwitchboard.append(collapse);

      const tools = [
        { id: "clear", label: "Hi", title: "Hide all notes / custom mode" },
        { id: "cycle", label: "✏️", title: "Draw / select / hide" },
        { id: "erase", label: "🧽", title: "Erase clicked note" },
        { id: "color", label: state.colorMode === "color" ? "SAT" : "BLU", title: "切換彩色/低彩藍色模式" },
        { id: "export", label: "JPG", title: "輸出目前畫布為 JPG" }
      ];
      tools.forEach(tool => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = [
          "pitch-tool",
          (tool.id === state.markerTool || (tool.id === "color" && state.colorMode === "mono")) ? "is-active" : ""
        ].filter(Boolean).join(" ");
        button.textContent = tool.label;
        button.title = tool.title;
        button.addEventListener("click", () => handleToolClick(tool.id));
        dom.noteSwitchboard.append(button);
      });
    }

    function handleToolClick(toolId) {
      if (toolId === "clear") {
        state.manualOn.clear();
        state.manualOff.clear();
        state.manualSelected.clear();
        state.pitchOverrides = {};
        state.soloPitches.clear();
        state.mode = "custom";
        state.markerTool = "cycle";
        state.chordType = "scale";
        state.arpMode = "off";
        state.patternShape = "all";
        syncControlsFromState();
      } else if (toolId === "color") {
        state.colorMode = state.colorMode === "color" ? "mono" : "color";
      } else if (toolId === "export") {
        exportCanvasJpg().catch(error => {
          console.warn("Unable to export canvas JPG", error);
        });
        return;
      } else {
        state.markerTool = toolId;
      }
      render();
    }

    function svgEscape(value) {
      return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
      })[character]);
    }

    async function exportCanvasJpg() {
      const theme = THEME_TOKENS[state.boardTheme] || THEME_TOKENS.white;
      const padding = 28;
      const labelWidth = 58;
      const nutWidth = 30;
      const rowHeight = 72;
      const fretWidth = 100 * (state.aspectScale / 100);
      const displayScale = state.displayScale / 100;
      const boardX = padding + labelWidth + nutWidth;
      const firstY = padding + 30;
      const lastY = firstY + ((state.strings - 1) * rowHeight);
      const boardWidth = state.frets * fretWidth;
      const width = Math.ceil(boardX + boardWidth + padding);
      const height = Math.ceil(lastY + 70);
      const markerRadius = Math.max(18, 24 * displayScale);
      const labelRadius = Math.max(17, 19 * displayScale);
      const markerFont = Math.max(13, 16 * displayScale);
      const subFont = Math.max(9, 10 * displayScale);
      const visibleNumbers = [3, 5, 7, 9, 12, 15, 17, 19, 22, 24].filter(fret => fret <= state.frets);
      const parts = [];

      parts.push(`<rect width="100%" height="100%" fill="#ffffff"/>`);
      parts.push(`<rect x="${boardX}" y="${firstY}" width="${boardWidth}" height="${lastY - firstY}" fill="${theme.board}"/>`);

      state.tuning.forEach((openNote, stringIndex) => {
        const y = firstY + (stringIndex * rowHeight);
        const openColor = colorForNote(openNote);
        parts.push(`<line x1="${boardX}" y1="${y}" x2="${boardX + boardWidth}" y2="${y}" stroke="${theme.string}" stroke-width="2"/>`);
        parts.push(`<circle cx="${padding + 24}" cy="${y}" r="${labelRadius}" fill="#ffffff" stroke="${openColor}" stroke-width="2"/>`);
        parts.push(`<text x="${padding + 24}" y="${y + 5}" text-anchor="middle" font-size="${markerFont}" font-weight="800" fill="${openColor}">${svgEscape(displayNote(openNote))}</text>`);
      });

      parts.push(`<line x1="${padding + labelWidth + (nutWidth / 2)}" y1="${firstY}" x2="${padding + labelWidth + (nutWidth / 2)}" y2="${lastY}" stroke="#3d4140" stroke-width="9" stroke-linecap="round"/>`);

      for (let fret = 1; fret <= state.frets; fret += 1) {
        const x = boardX + (fret * fretWidth);
        parts.push(`<line x1="${x}" y1="${firstY}" x2="${x}" y2="${lastY}" stroke="${theme.fret}" stroke-width="2"/>`);
      }

      state.tuning.forEach((openNote, stringIndex) => {
        const y = firstY + (stringIndex * rowHeight);
        for (let fret = 1; fret <= state.frets; fret += 1) {
          const note = noteAt(openNote, fret);
          const info = scaleInfo(note);
          if (!shouldShow(stringIndex, fret, note)) continue;

          const selected = state.manualSelected.has(markerKey(stringIndex, fret));
          const x = boardX + ((fret - .5) * fretWidth);
          const labels = markerLabels(note, info);
          const noteColor = colorForNote(note);
          const fill = state.colorMode === "mono" ? "#ffffff" : (info.inKey ? noteColor : "#9da5aa");
          const stroke = state.colorMode === "mono" ? "#151918" : "none";
          const textColor = state.colorMode === "mono" ? "#6e93db" : "#ffffff";

          if (selected) {
            parts.push(`<circle cx="${x}" cy="${y}" r="${markerRadius + 5}" fill="none" stroke="#ffffff" stroke-width="5"/>`);
            parts.push(`<circle cx="${x}" cy="${y}" r="${markerRadius + 7}" fill="none" stroke="rgba(31,36,35,.22)" stroke-width="2"/>`);
          }
          parts.push(`<circle cx="${x}" cy="${y}" r="${markerRadius}" fill="${fill}" stroke="${stroke}" stroke-width="${state.colorMode === "mono" ? 2 : 0}"/>`);
          parts.push(`<text x="${x}" y="${labels.secondary ? y - 1 : y + 5}" text-anchor="middle" font-size="${markerFont}" font-weight="900" fill="${textColor}">${svgEscape(labels.primary)}</text>`);
          if (labels.secondary) {
            parts.push(`<text x="${x}" y="${y + 14}" text-anchor="middle" font-size="${subFont}" font-weight="800" fill="${textColor}" opacity=".75">${svgEscape(labels.secondary)}</text>`);
          }
        }
      });

      visibleNumbers.forEach(fret => {
        const x = boardX + ((fret - .5) * fretWidth);
        parts.push(`<text x="${x}" y="${lastY + 42}" text-anchor="middle" font-size="14" font-weight="900" fill="${theme.muted}">${fret}</text>`);
      });

      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
          <style>text{font-family:"Noto Sans TC","Microsoft JhengHei",Arial,sans-serif;}</style>
          ${parts.join("\n")}
        </svg>
      `;
      const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const image = new Image();
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = url;
      });
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
      URL.revokeObjectURL(url);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg", 0.92);
      link.download = `axon-fretboard-${new Date().toISOString().slice(0, 10)}.jpg`;
      link.click();
    }

    function rebuildKeyOptions() {
      dom.keyRoot.innerHTML = "";
      KEY_OPTIONS.forEach(key => {
        const option = document.createElement("option");
        option.value = key.name;
        option.textContent = key.name;
        dom.keyRoot.append(option);
      });
      dom.keyRoot.value = state.keyName;
    }

    function rebuildTuningOptions() {
      dom.tuningPreset.innerHTML = "";
      Object.entries(TUNINGS[state.strings]).forEach(([label, notes], index) => {
        const option = document.createElement("option");
        option.value = label;
        option.textContent = label;
        option.selected = label === state.tuningPresetName || (!TUNINGS[state.strings][state.tuningPresetName] && index === 0);
        dom.tuningPreset.append(option);
      });
      if (!TUNINGS[state.strings][state.tuningPresetName]) {
        state.tuningPresetName = Object.keys(TUNINGS[state.strings])[0];
      }
      state.tuning = TUNINGS[state.strings][state.tuningPresetName];
      state.selected.stringIndex = Math.min(state.selected.stringIndex, state.strings - 1);
    }

    function markerLabels(note, info) {
      const primary = state.labelMode === "note" ? displayNote(note) : info.solfege;
      const secondary = state.labelMode === "note" ? info.solfege : displayNote(note);
      return {
        primary,
        secondary: dom.showBoth.checked ? secondary : ""
      };
    }

    function updateInfo(stringIndex, fret) {
      const openNote = state.tuning[stringIndex];
      const note = noteAt(openNote, fret);
      const info = scaleInfo(note);
      dom.infoPosition.textContent = `第 ${stringIndex + 1} 弦 / 第 ${fret} 格`;
      dom.infoNote.textContent = displayNote(note);
      dom.infoSolfege.textContent = info.solfege;
      dom.infoDegree.textContent = info.degree;
      dom.infoRelation.textContent = info.inKey ? `${keyLabel()}內音` : `不在 ${keyLabel()} 內`;
      dom.infoString.textContent = displayNote(openNote);
    }

    function render() {
      dom.fretboard.innerHTML = "";
      syncStageClass();
      dom.noteSwitchboard.classList.toggle("is-mono", state.colorMode === "mono");
      dom.fretboard.style.setProperty("--strings", state.strings);
      dom.fretboard.style.setProperty("--frets", state.frets);
      dom.fretboard.style.setProperty("--display-scale", state.displayScale / 100);
      const fretWidth = 6.3 * (state.aspectScale / 100);
      dom.fretboard.style.gridTemplateColumns = `3.5rem 1.9rem repeat(${state.frets}, minmax(${fretWidth}rem, ${fretWidth}rem))`;
      dom.fretboard.style.minWidth = `${5.4 + (state.frets * fretWidth)}rem`;
      dom.fretboard.style.setProperty("--board-width", `${state.frets * fretWidth}rem`);
      document.querySelector("#stage-layout").style.setProperty("--frets", state.frets);
      document.querySelector("#stage-layout").style.minWidth = `${18.5 + (state.frets * fretWidth)}rem`;
      dom.keyBadge.textContent = keyBadgeLabel();
      dom.modeButtons.forEach(item => item.classList.toggle("is-active", item.dataset.mode === state.mode));

      const nut = document.createElement("div");
      nut.className = "nut-bar";
      nut.style.gridRow = `1 / ${state.strings + 1}`;
      nut.style.gridColumn = "2";
      dom.fretboard.append(nut);

      state.tuning.forEach((openNote, stringIndex) => {
        const label = document.createElement("div");
        label.className = "string-label";
        label.style.gridRow = stringIndex + 1;
        label.style.gridColumn = "1";
        label.style.setProperty("--open-color", colorForNote(openNote));
        label.textContent = displayNote(openNote);
        dom.fretboard.append(label);

        for (let fret = 1; fret <= state.frets; fret += 1) {
          const note = noteAt(openNote, fret);
          const info = scaleInfo(note);
          const visible = shouldShow(stringIndex, fret, note);
          const cell = document.createElement("button");
          cell.type = "button";
          cell.className = [
            "cell",
            stringIndex === 0 ? "first-string" : "",
            stringIndex === state.strings - 1 ? "last-string" : ""
          ].filter(Boolean).join(" ");
          cell.style.gridRow = stringIndex + 1;
          cell.style.gridColumn = fret + 2;
          cell.setAttribute("aria-label", `${openNote} 弦第 ${fret} 格，${displayNote(note)}，${info.solfege}`);
          cell.addEventListener("click", () => {
            toggleMarker(stringIndex, fret, note);
            updateInfo(stringIndex, fret);
            render();
          });

          if (visible) {
            const labels = markerLabels(note, info);
            const marker = document.createElement("span");
            marker.className = [
              "marker",
              info.inKey ? "" : "is-out",
              state.manualSelected.has(markerKey(stringIndex, fret)) ? "is-selected" : ""
            ].filter(Boolean).join(" ");
            marker.style.setProperty("--note-color", colorForNote(note));
            marker.style.setProperty("--in-key-scale", 1);
            marker.innerHTML = `
              <span class="marker-note">${labels.primary}</span>
              <span class="marker-solfege">${labels.secondary}</span>
            `;
            cell.append(marker);
          }
          dom.fretboard.append(cell);
        }
      });

      const visibleNumbers = [3, 5, 7, 9, 12, 15, 17, 19, 22, 24].filter(fret => fret <= state.frets);
      visibleNumbers.forEach(fret => {
        const number = document.createElement("div");
        number.className = "fret-number";
        number.style.gridRow = state.strings + 1;
        number.style.gridColumn = fret + 2;
        number.textContent = fret;
        dom.fretboard.append(number);
      });

      renderNoteSwitchboard();
      updateInfo(state.selected.stringIndex, state.selected.fret);
      saveSettings();
    }

    function syncKeyFromControl() {
      const key = KEY_OPTIONS.find(item => item.name === dom.keyRoot.value) || KEY_OPTIONS[0];
      state.keyName = key.name;
      state.root = key.pitch;
      state.keySpelling = key.spelling;
      state.scale = dom.scaleType.value;
    }

    function restoreTheoryViewFromCustom() {
      if (state.mode !== "custom") return;
      syncKeyFromControl();
      state.mode = "scale";
      resetManualMarkers();
      render();
    }

    function applyFormControls() {
      state.chordType = dom.chordType.value;
      state.chordQuality = dom.chordQuality.value;
      state.arpMode = dom.arpMode.value;
      state.patternShape = dom.patternShape.value;
      if (state.mode === "custom") state.mode = "scale";
      resetManualMarkers();
      render();
    }

    dom.stringCount.addEventListener("change", event => {
      state.strings = Number(event.target.value);
      state.tuningPresetName = Object.keys(TUNINGS[state.strings])[0];
      resetManualMarkers();
      rebuildTuningOptions();
      syncControlsFromState();
      render();
    });

    dom.tuningPreset.addEventListener("change", event => {
      state.tuningPresetName = event.target.value;
      state.tuning = TUNINGS[state.strings][state.tuningPresetName];
      resetManualMarkers();
      render();
    });

    dom.boardTheme.addEventListener("change", event => {
      state.boardTheme = event.target.value;
      syncStageClass();
      saveSettings();
    });

    dom.keyRoot.addEventListener("pointerdown", restoreTheoryViewFromCustom);
    dom.scaleType.addEventListener("pointerdown", restoreTheoryViewFromCustom);

    dom.keyRoot.addEventListener("change", () => {
      syncKeyFromControl();
      if (state.mode === "custom") state.mode = "scale";
      resetManualMarkers();
      render();
    });

    dom.scaleType.addEventListener("change", () => {
      syncKeyFromControl();
      if (state.mode === "custom") state.mode = "scale";
      resetManualMarkers();
      render();
    });

    dom.chordType.addEventListener("change", applyFormControls);
    dom.chordQuality.addEventListener("change", applyFormControls);
    dom.arpMode.addEventListener("change", applyFormControls);
    dom.patternShape.addEventListener("change", applyFormControls);

    dom.fretCount.addEventListener("change", event => {
      state.frets = Number(event.target.value);
      state.selected.fret = Math.min(state.selected.fret, state.frets);
      resetManualMarkers();
      render();
    });

    dom.displayScale.addEventListener("input", event => {
      state.displayScale = Number(event.target.value);
      dom.displayOutput.textContent = `${state.displayScale}%`;
      render();
    });

    dom.aspectScale.addEventListener("input", event => {
      state.aspectScale = Number(event.target.value);
      dom.aspectOutput.textContent = `${state.aspectScale}%`;
      render();
    });

    dom.labelButtons.forEach(button => {
      button.addEventListener("click", () => {
        dom.labelButtons.forEach(item => item.classList.toggle("is-active", item === button));
        state.labelMode = button.dataset.labelMode;
        render();
      });
    });

    dom.showBoth.addEventListener("change", render);

    dom.colorPickers.forEach(picker => {
      picker.addEventListener("input", event => {
        const note = picker.dataset.noteColor;
        NOTE_COLORS[note] = event.target.value;
        RECENT_NOTE_COLORS[note] = event.target.value;
        syncPalette();
        render();
      });
    });

    dom.paletteButtons.forEach(button => {
      button.addEventListener("click", () => {
        togglePaletteColor(button.dataset.paletteDot);
      });
    });

    dom.zoomOut.addEventListener("click", () => setPageScale(state.pageScale - 10));
    dom.zoomIn.addEventListener("click", () => setPageScale(state.pageScale + 10));

    dom.modeButtons.forEach(button => {
      button.addEventListener("click", () => {
        dom.modeButtons.forEach(item => item.classList.toggle("is-active", item === button));
        state.mode = button.dataset.mode;
        resetManualMarkers();
        render();
      });
    });

    loadSettings();
    rebuildKeyOptions();
    rebuildTuningOptions();
    syncControlsFromState();
    syncPalette();
    setPageScale(state.pageScale);
    render();
