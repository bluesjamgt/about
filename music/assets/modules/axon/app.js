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
      major: { label: "Major", formula: "1 2 3 4 5 6 7", intervals: [0, 2, 4, 5, 7, 9, 11], degrees: ["1", "2", "3", "4", "5", "6", "7"], romans: ["I", "ii", "iii", "IV", "V", "vi", "vii°"], solfege: ["Do", "Re", "Mi", "Fa", "Sol", "La", "Ti"] },
      minor: { label: "minor", formula: "1 2 b3 4 5 b6 b7", intervals: [0, 2, 3, 5, 7, 8, 10], degrees: ["1", "2", "♭3", "4", "5", "♭6", "♭7"], romans: ["i", "ii°", "III", "iv", "v", "VI", "VII"], solfege: ["Do", "Re", "Me", "Fa", "Sol", "Le", "Te"] },
      harmonicMinor: { label: "Harmonic minor", formula: "1 2 b3 4 5 b6 7", intervals: [0, 2, 3, 5, 7, 8, 11], degrees: ["1", "2", "♭3", "4", "5", "♭6", "7"], romans: ["i", "ii°", "III+", "iv", "V", "VI", "vii°"], solfege: ["Do", "Re", "Me", "Fa", "Sol", "Le", "Ti"] },
      melodicMinor: { label: "Melodic minor", formula: "1 2 b3 4 5 6 7", intervals: [0, 2, 3, 5, 7, 9, 11], degrees: ["1", "2", "♭3", "4", "5", "6", "7"], romans: ["i", "ii", "III+", "IV", "V", "vi°", "vii°"], solfege: ["Do", "Re", "Me", "Fa", "Sol", "La", "Ti"] },
      majorPentatonic: { label: "Major pentatonic", formula: "1 2 3 5 6", intervals: [0, 2, 4, 7, 9], degrees: ["1", "2", "3", "5", "6"], romans: ["I", "ii", "iii", "V", "vi"], solfege: ["Do", "Re", "Mi", "Sol", "La"] },
      minorPentatonic: { label: "Minor pentatonic", formula: "1 b3 4 5 b7", intervals: [0, 3, 5, 7, 10], degrees: ["1", "♭3", "4", "5", "♭7"], romans: ["i", "III", "iv", "v", "VII"], solfege: ["Do", "Me", "Fa", "Sol", "Te"] },
      blues: { label: "Blues", formula: "1 b3 4 b5 5 b7", intervals: [0, 3, 5, 6, 7, 10], degrees: ["1", "♭3", "4", "♭5", "5", "♭7"], romans: ["i", "III", "IV", "♭V", "V", "VII"], solfege: ["Do", "Me", "Fa", "Se", "Sol", "Te"] },
      ionian: { label: "Ionian", formula: "1 2 3 4 5 6 7", intervals: [0, 2, 4, 5, 7, 9, 11], degrees: ["1", "2", "3", "4", "5", "6", "7"], romans: ["I", "ii", "iii", "IV", "V", "vi", "vii°"], solfege: ["Do", "Re", "Mi", "Fa", "Sol", "La", "Ti"] },
      dorian: { label: "Dorian", formula: "1 2 b3 4 5 6 b7", intervals: [0, 2, 3, 5, 7, 9, 10], degrees: ["1", "2", "♭3", "4", "5", "6", "♭7"], romans: ["i", "ii", "III", "IV", "v", "vi°", "VII"], solfege: ["Do", "Re", "Me", "Fa", "Sol", "La", "Te"] },
      phrygian: { label: "Phrygian", formula: "1 b2 b3 4 5 b6 b7", intervals: [0, 1, 3, 5, 7, 8, 10], degrees: ["1", "♭2", "♭3", "4", "5", "♭6", "♭7"], romans: ["i", "II", "III", "iv", "v°", "VI", "vii"], solfege: ["Do", "Ra", "Me", "Fa", "Sol", "Le", "Te"] },
      lydian: { label: "Lydian", formula: "1 2 3 #4 5 6 7", intervals: [0, 2, 4, 6, 7, 9, 11], degrees: ["1", "2", "3", "♯4", "5", "6", "7"], romans: ["I", "II", "iii", "iv°", "V", "vi", "vii"], solfege: ["Do", "Re", "Mi", "Fi", "Sol", "La", "Ti"] },
      mixolydian: { label: "Mixolydian", formula: "1 2 3 4 5 6 b7", intervals: [0, 2, 4, 5, 7, 9, 10], degrees: ["1", "2", "3", "4", "5", "6", "♭7"], romans: ["I", "ii", "iii°", "IV", "v", "vi", "VII"], solfege: ["Do", "Re", "Mi", "Fa", "Sol", "La", "Te"] },
      aeolian: { label: "Aeolian", formula: "1 2 b3 4 5 b6 b7", intervals: [0, 2, 3, 5, 7, 8, 10], degrees: ["1", "2", "♭3", "4", "5", "♭6", "♭7"], romans: ["i", "ii°", "III", "iv", "v", "VI", "VII"], solfege: ["Do", "Re", "Me", "Fa", "Sol", "Le", "Te"] },
      locrian: { label: "Locrian", formula: "1 b2 b3 4 b5 b6 b7", intervals: [0, 1, 3, 5, 6, 8, 10], degrees: ["1", "♭2", "♭3", "4", "♭5", "♭6", "♭7"], romans: ["i°", "II", "iii", "iv", "V", "VI", "vii"], solfege: ["Do", "Ra", "Me", "Fa", "Se", "Le", "Te"] }
    };
    const SCALE_GROUPS = [
      { label: "Diatonic", values: ["major", "minor"] },
      { label: "Minor family", values: ["harmonicMinor", "melodicMinor"] },
      { label: "Pentatonic / Blues", values: ["majorPentatonic", "minorPentatonic", "blues"] },
      { label: "Modes", values: ["ionian", "dorian", "phrygian", "lydian", "mixolydian", "aeolian", "locrian"] }
    ];
    const ARPEGGIO_TYPES = {
      major: { label: "Maj", formula: "1 3 5", intervals: [0, 4, 7] },
      minor: { label: "min", formula: "1 b3 5", intervals: [0, 3, 7] },
      dim: { label: "dim", formula: "1 b3 b5", intervals: [0, 3, 6] },
      aug: { label: "aug", formula: "1 3 #5", intervals: [0, 4, 8] },
      dominant7: { label: "7", formula: "1 3 5 b7", intervals: [0, 4, 7, 10] },
      major7: { label: "Maj7", formula: "1 3 5 7", intervals: [0, 4, 7, 11] },
      minor7: { label: "min7", formula: "1 b3 5 b7", intervals: [0, 3, 7, 10] },
      halfDiminished7: { label: "m7b5", formula: "1 b3 b5 b7", intervals: [0, 3, 6, 10] },
      diminished7: { label: "dim7", formula: "1 b3 b5 bb7", intervals: [0, 3, 6, 9] }
    };
    const ARPEGGIO_GROUPS = [
      { label: "Triads", values: ["major", "minor", "dim", "aug"] },
      { label: "7th chords", values: ["dominant7", "major7", "minor7", "halfDiminished7", "diminished7"] }
    ];
    const PATTERN_OPTIONS = [
      { value: "all", label: "All" },
      { value: "box-a", label: "Box A" },
      { value: "box-b", label: "Box B" },
      { value: "box-c", label: "Box C" },
      { value: "box-d", label: "Box D" },
      { value: "box-e", label: "Box E" },
      { value: "box-f", label: "Box F" },
      { value: "linear", label: "Linear" }
    ];
    const LAYER_IDS = ["a", "b"];
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
      layerControls: document.querySelectorAll("[data-layer][data-layer-field]"),
      layerRows: document.querySelectorAll("[data-layer-row]"),
      variantSelects: document.querySelectorAll("[data-layer-variant]"),
      variantLabels: document.querySelectorAll("[data-layer-variant-label]"),
      formulaLabels: document.querySelectorAll("[data-layer-formula-label]"),
      formulaOutputs: {
        a: document.querySelector("#layer-a-formula"),
        b: document.querySelector("#layer-b-formula")
      },
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
      modeButtons: document.querySelectorAll("[data-mode]"),
      labelButtons: document.querySelectorAll("[data-label-mode]"),
      secondaryLabelButtons: document.querySelectorAll("[data-secondary-label]"),
      colorPickers: document.querySelectorAll("[data-note-color]"),
      paletteButtons: document.querySelectorAll("[data-palette-dot]"),
      infoPosition: document.querySelector("#info-position"),
      infoNote: document.querySelector("#info-note"),
      infoSolfege: document.querySelector("#info-solfege"),
      infoDegree: document.querySelector("#info-degree"),
      infoRelation: document.querySelector("#info-relation"),
      infoString: document.querySelector("#info-string"),
      scopeSelection: document.querySelector("#scope-selection"),
      scopeSuggestions: document.querySelector("#scope-suggestions"),
      scopeViewToggle: document.querySelector("#scope-view-toggle")
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
      secondaryLabels: new Set(["solfege"]),
      boardTheme: "white",
      displayScale: 100,
      pageScale: 100,
      aspectScale: 100,
      fretOffset: 0,
      layers: {
        a: { enabled: true, kind: "scale", keyName: "C", scale: "major", arpeggio: "major", pattern: "all" },
        b: { enabled: false, kind: "scale", keyName: "D", scale: "dorian", arpeggio: "minor7", pattern: "all" }
      },
      emphasisTarget: "a",
      emphasisDegrees: new Set(),
      pitchListMode: "all",
      soloPitches: new Set(),
      pitchOverrides: {},
      markerTool: "cycle",
      colorMode: "color",
      accidentalMode: "auto",
      hideSnapshot: null,
      manualOn: new Set(),
      manualOff: new Set(),
      manualSelected: new Set(),
      selectionLog: [],
      scopeView: "simple",
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

    function tokenDegree(token) {
      const match = String(token).match(/\d+/);
      return match ? Number(match[0]) : 1;
    }

    function layerSpellings(layer) {
      const definition = layerDefinition(layer);
      const rootName = layer.keyName || state.keyName;
      const rootPitch = layerRoot(layer);
      const rootLetter = rootName[0];
      const letters = ["C", "D", "E", "F", "G", "A", "B"];
      const rootLetterIndex = letters.indexOf(rootLetter);
      const byPitch = new Map();
      const tokens = definition.formula.split(/\s+/);
      definition.intervals.forEach((interval, index) => {
        const degree = tokenDegree(tokens[index]);
        const letter = letters[(rootLetterIndex + degree - 1) % letters.length];
        const targetPitch = (rootPitch + interval) % 12;
        const naturalPitch = LETTER_PITCH[letter];
        const accidental = (targetPitch - naturalPitch + 12) % 12;
        byPitch.set(NOTES[targetPitch], `${letter}${accidentalSymbol(accidental)}`);
      });
      return byPitch;
    }

    function displayPitch(note) {
      if (state.accidentalMode === "sharp") return SHARP_NAMES[noteIndex(note)];
      if (state.accidentalMode === "flat") return FLAT_NAMES[noteIndex(note)];
      if (state.layers.a.kind === "arpeggio") {
        const arpeggioName = layerSpellings(state.layers.a).get(note);
        if (arpeggioName) return arpeggioName;
      }
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

    function keyByName(name) {
      return KEY_OPTIONS.find(item => item.name === name) || KEY_OPTIONS[0];
    }

    function normalizeLayer(layer, fallback) {
      const next = { ...fallback, ...(layer || {}) };
      next.enabled = Boolean(next.enabled);
      next.kind = ["arpeggio", "chord"].includes(next.kind) ? "arpeggio" : "scale";
      next.keyName = keyByName(next.keyName).name;
      next.scale = SCALES[next.scale] ? next.scale : fallback.scale;
      next.arpeggio = ARPEGGIO_TYPES[next.arpeggio || next.quality] ? (next.arpeggio || next.quality) : fallback.arpeggio;
      next.pattern = PATTERN_OPTIONS.some(option => option.value === next.pattern) ? next.pattern : fallback.pattern;
      return next;
    }

    function layerRoot(layer) {
      return keyByName(layer.keyName).pitch;
    }

    function syncPrimaryLayer() {
      const primary = state.layers.a;
      const key = keyByName(primary.keyName);
      state.keyName = key.name;
      state.root = key.pitch;
      state.keySpelling = key.spelling;
      state.scale = primary.scale;
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
        layers: state.layers,
        emphasisTarget: state.emphasisTarget,
        emphasisDegrees: [...state.emphasisDegrees],
        pitchListMode: state.pitchListMode,
        pitchOverrides: state.pitchOverrides,
        soloPitches: [...state.soloPitches],
        markerTool: state.markerTool,
        colorMode: state.colorMode,
        accidentalMode: state.accidentalMode,
        secondaryLabels: [...state.secondaryLabels],
        selectionLog: state.selectionLog,
        scopeView: state.scopeView,
        manualOn: [...state.manualOn],
        manualOff: [...state.manualOff],
        manualSelected: [...state.manualSelected],
        selected: state.selected,
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
      state.fretOffset = 0;
      if (saved.layers && typeof saved.layers === "object") {
        state.layers.a = normalizeLayer(saved.layers.a, state.layers.a);
        state.layers.b = normalizeLayer(saved.layers.b, state.layers.b);
      } else {
        state.layers.a = normalizeLayer({
          enabled: true,
          kind: saved.chordType && saved.chordType !== "scale" ? "arpeggio" : "scale",
          keyName: saved.keyName,
          scale: saved.scale,
          arpeggio: saved.chordQuality,
          pattern: saved.patternShape
        }, state.layers.a);
      }
      syncPrimaryLayer();
      if (["all", "scale"].includes(saved.pitchListMode)) state.pitchListMode = saved.pitchListMode;
      if (["cycle", "draw", "erase"].includes(saved.markerTool)) state.markerTool = saved.markerTool;
      if (["color", "mono"].includes(saved.colorMode)) state.colorMode = saved.colorMode;
      if (["auto", "sharp", "flat"].includes(saved.accidentalMode)) state.accidentalMode = saved.accidentalMode;
      if (["a", "b"].includes(saved.emphasisTarget)) state.emphasisTarget = saved.emphasisTarget;
      if (Array.isArray(saved.emphasisDegrees)) {
        state.emphasisDegrees = new Set(saved.emphasisDegrees.filter(item => ["1", "3", "5", "7", "9", "11", "13", "rel"].includes(item)));
      }
      if (Array.isArray(saved.secondaryLabels)) {
        state.secondaryLabels = new Set(saved.secondaryLabels.filter(item => ["note", "solfege", "degree"].includes(item) && item !== state.labelMode));
      }
      if (Array.isArray(saved.selectionLog)) {
        state.selectionLog = saved.selectionLog
          .filter(item => item && Number.isInteger(item.stringIndex) && Number.isInteger(item.fret) && NOTES.includes(item.note))
          .slice(0, 12);
      }
      if (["simple", "detail"].includes(saved.scopeView)) state.scopeView = saved.scopeView;
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
      applyColorMap(NOTE_COLORS, saved.noteColors);
      applyColorMap(RECENT_NOTE_COLORS, saved.recentNoteColors);
    }

    function syncControlsFromState() {
      dom.stringCount.value = String(state.strings);
      dom.tuningPreset.value = state.tuningPresetName;
      dom.boardTheme.value = state.boardTheme;
      syncStageClass();
      dom.keyRoot.value = state.keyName;
      dom.fretCount.value = String(state.frets);
      dom.displayScale.value = state.displayScale;
      dom.displayOutput.textContent = `${state.displayScale}%`;
      dom.aspectScale.value = state.aspectScale;
      dom.aspectOutput.textContent = `${state.aspectScale}%`;
      LAYER_IDS.forEach(layerId => syncLayerControls(layerId));
      dom.modeButtons.forEach(item => item.classList.toggle("is-active", item.dataset.mode === state.mode));
      dom.labelButtons.forEach(item => item.classList.toggle("is-active", item.dataset.labelMode === state.labelMode));
      syncSecondaryLabelButtons();
    }

    function syncStageClass() {
      dom.stage.className = `stage theme-${state.boardTheme}${state.colorMode === "mono" ? " is-mono" : ""}`;
    }

    function layerDefinition(layer) {
      if (layer.kind === "arpeggio") return ARPEGGIO_TYPES[layer.arpeggio] || ARPEGGIO_TYPES.major;
      return SCALES[layer.scale] || SCALES.major;
    }

    function layerFormula(layer) {
      return layerDefinition(layer).formula;
    }

    function layerContains(layer, note) {
      const root = layerRoot(layer);
      const intervals = layerDefinition(layer).intervals;
      const distance = (noteIndex(note) - noteIndex(root) + 12) % 12;
      return intervals.some(interval => interval % 12 === distance);
    }

    function rootPocketStart(layer = state.layers.a, offset = 0) {
      const root = layerRoot(layer);
      const rootFrets = [];
      state.tuning.forEach(openNote => {
        for (let fret = 1; fret <= state.frets; fret += 1) {
          if (noteAt(openNote, fret) === root) rootFrets.push(fret);
        }
      });
      const firstRoot = rootFrets.length ? Math.min(...rootFrets) : 1;
      const maxStart = Math.max(1, state.frets - 4);
      return Math.max(1, Math.min(maxStart, firstRoot - 2 + offset));
    }

    function patternAllows(layer, stringIndex, fret) {
      const boxOffsets = {
        "box-a": 0,
        "box-b": 3,
        "box-c": 6,
        "box-d": 9,
        "box-e": 12,
        "box-f": 15
      };
      if (Object.hasOwn(boxOffsets, layer.pattern)) {
        const start = rootPocketStart(layer, boxOffsets[layer.pattern]);
        return fret >= start && fret <= start + 4;
      }
      if (layer.pattern === "linear") {
        return stringIndex === state.selected.stringIndex;
      }
      return true;
    }

    function markerSources(note, stringIndex, fret) {
      if (state.mode === "custom") return [];
      return LAYER_IDS.filter(layerId => {
        const layer = state.layers[layerId];
        return layer.enabled && patternAllows(layer, stringIndex, fret) && layerContains(layer, note);
      });
    }

    function baseShouldShow(note, stringIndex, fret) {
      if (markerSources(note, stringIndex, fret).length) return true;
      if (state.mode === "all") return true;
      if (state.mode === "root") return note === state.root;
      return false;
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

    function cloneLayer(layer) {
      return { ...layer };
    }

    function snapshotView() {
      return {
        mode: state.mode,
        markerTool: state.markerTool,
        pitchOverrides: { ...state.pitchOverrides },
        soloPitches: [...state.soloPitches],
        manualOn: [...state.manualOn],
        manualOff: [...state.manualOff],
        manualSelected: [...state.manualSelected],
        layers: {
          a: cloneLayer(state.layers.a),
          b: cloneLayer(state.layers.b)
        }
      };
    }

    function restoreSnapshot(snapshot) {
      state.mode = snapshot.mode;
      state.markerTool = snapshot.markerTool;
      state.pitchOverrides = { ...snapshot.pitchOverrides };
      state.soloPitches = new Set(snapshot.soloPitches);
      state.manualOn = new Set(snapshot.manualOn);
      state.manualOff = new Set(snapshot.manualOff);
      state.manualSelected = new Set(snapshot.manualSelected);
      state.layers.a = normalizeLayer(snapshot.layers.a, state.layers.a);
      state.layers.b = normalizeLayer(snapshot.layers.b, state.layers.b);
      syncPrimaryLayer();
      syncControlsFromState();
    }

    function keyLabel() {
      const scale = SCALES[state.scale] || SCALES.major;
      if (state.scale === "minor") return `${state.keyName}m minor`;
      return `${state.keyName} ${scale.label}`;
    }

    function accidentalToolLabel() {
      if (state.accidentalMode === "sharp") return "♯";
      if (state.accidentalMode === "flat") return "♭";
      return "🎵";
    }

    function cycleAccidentalMode() {
      const order = ["auto", "sharp", "flat"];
      state.accidentalMode = order[(order.indexOf(state.accidentalMode) + 1) % order.length];
    }

    function transposeKeyName(keyName, semitones) {
      const key = keyByName(keyName);
      const nextPitch = NOTES[(noteIndex(key.pitch) + semitones + 12) % 12];
      const preferFlat = state.accidentalMode === "flat" || key.spelling === "flat";
      const names = preferFlat ? FLAT_NAMES : SHARP_NAMES;
      const label = names[noteIndex(nextPitch)];
      const match = KEY_OPTIONS.find(item => item.name === label || item.pitch === nextPitch);
      return (match || KEY_OPTIONS[0]).name;
    }

    function transposeLayers(semitones) {
      LAYER_IDS.forEach(layerId => {
        state.layers[layerId].keyName = transposeKeyName(state.layers[layerId].keyName, semitones);
      });
      syncPrimaryLayer();
      syncControlsFromState();
    }

    function labelText(kind, note, info) {
      if (kind === "solfege") return info.solfege;
      if (kind === "degree") return info.degree;
      return displayNote(note);
    }

    function syncSecondaryLabelButtons() {
      dom.secondaryLabelButtons.forEach(button => {
        const kind = button.dataset.secondaryLabel;
        const disabled = kind === state.labelMode;
        if (disabled) state.secondaryLabels.delete(kind);
        button.disabled = disabled;
        button.classList.toggle("is-disabled", disabled);
        button.classList.toggle("is-active", state.secondaryLabels.has(kind));
      });
    }

    function emphasisIntervalFor(layer, target) {
      const definition = layerDefinition(layer);
      const tokens = definition.formula.split(/\s+/);
      const targetDegree = { "9": 2, "11": 4, "13": 6 }[target] || Number(target);
      const index = tokens.findIndex(token => tokenDegree(token) === targetDegree);
      return index >= 0 ? definition.intervals[index] % 12 : null;
    }

    function relativeIntervalFor(layer) {
      const third = emphasisIntervalFor(layer, "3");
      if (third === 3) return 3;
      if (third === 4) return 9;
      return null;
    }

    function shouldEmphasize(note) {
      if (!state.emphasisDegrees.size) return false;
      const layer = state.layers[state.emphasisTarget];
      if (!layer || !layer.enabled) return false;
      const distance = (noteIndex(note) - noteIndex(layerRoot(layer)) + 12) % 12;
      for (const target of state.emphasisDegrees) {
        const interval = target === "rel" ? relativeIntervalFor(layer) : emphasisIntervalFor(layer, target);
        if (interval !== null && distance === interval) return true;
      }
      return false;
    }

    function chordRootLabel(note) {
      const pitch = noteIndex(note);
      if (state.accidentalMode === "flat" || state.keySpelling === "flat") return FLAT_NAMES[pitch];
      return SHARP_NAMES[pitch];
    }

    function chordQualityLabel(key) {
      const labels = {
        major: "",
        minor: "m",
        dim: "dim",
        aug: "aug",
        dominant7: "7",
        major7: "maj7",
        minor7: "m7",
        halfDiminished7: "m7b5",
        diminished7: "dim7"
      };
      return labels[key] ?? key;
    }

    function chordCandidates() {
      const selectedPitches = [...new Set(state.selectionLog.map(item => noteIndex(item.note)))];
      if (selectedPitches.length < 2) return [];
      const selectedSet = new Set(selectedPitches);
      const qualities = ["major", "minor", "dim", "aug", "dominant7", "major7", "minor7", "halfDiminished7", "diminished7"];
      const candidates = [];
      NOTES.forEach(root => {
        const rootPitch = noteIndex(root);
        qualities.forEach(quality => {
          const definition = ARPEGGIO_TYPES[quality];
          const chordPitches = definition.intervals.map(interval => (rootPitch + interval) % 12);
          const chordSet = new Set(chordPitches);
          const containsAll = selectedPitches.every(pitch => chordSet.has(pitch));
          if (!containsAll) return;
          const exact = chordSet.size === selectedSet.size;
          const rootBonus = selectedSet.has(rootPitch) ? 5 : 0;
          const score = (exact ? 100 : 82 - ((chordSet.size - selectedSet.size) * 7)) + rootBonus;
          candidates.push({
            name: `${chordRootLabel(root)}${chordQualityLabel(quality)}`,
            formula: definition.formula,
            quality: definition.label,
            score,
            exact
          });
        });
      });
      return candidates
        .sort((a, b) => b.score - a.score || a.name.length - b.name.length)
        .slice(0, 6);
    }

    function renderScopeSuggestions() {
      if (!dom.scopeSuggestions) return;
      const candidates = chordCandidates();
      dom.scopeSuggestions.innerHTML = "<strong>Chord Suggestions</strong>";
      if (!candidates.length) {
        const empty = document.createElement("span");
        empty.textContent = state.selectionLog.length < 2 ? "選 2 個以上音，這裡會顯示可能和弦。" : "目前沒有明確候選和弦。";
        dom.scopeSuggestions.append(empty);
        return;
      }
      const list = document.createElement("div");
      list.className = "scope-chord-list";
      candidates.forEach(candidate => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = ["scope-chord", candidate.exact ? "is-exact" : ""].filter(Boolean).join(" ");
        item.innerHTML = `
          <strong>${candidate.name}</strong>
          <span>${candidate.formula}</span>
        `;
        list.append(item);
      });
      dom.scopeSuggestions.append(list);
    }

    function recordScopeSelection(stringIndex, fret, note) {
      const info = scaleInfo(note);
      const entry = {
        id: `${stringIndex}:${fret}`,
        stringIndex,
        fret,
        note,
        noteLabel: displayNote(note),
        solfege: info.solfege,
        degree: info.degree,
        relation: info.inKey ? "in" : "out"
      };
      state.selectionLog = [...state.selectionLog.filter(item => item.id !== entry.id), entry].slice(-12);
    }

    function renderScopeSelection() {
      if (!dom.scopeSelection) return;
      dom.scopeSelection.innerHTML = "";
      if (dom.scopeViewToggle) {
        dom.scopeViewToggle.textContent = state.scopeView === "simple" ? "Detail" : "Simple";
        dom.scopeViewToggle.classList.toggle("is-active", state.scopeView === "detail");
      }
      if (!state.selectionLog.length) {
        const empty = document.createElement("span");
        empty.className = "scope-empty";
        empty.textContent = "點擊指板上的音，這裡會先記錄選取內容。";
        dom.scopeSelection.append(empty);
        renderScopeSuggestions();
        return;
      }
      state.selectionLog.forEach((item, index) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.draggable = true;
        chip.dataset.scopeIndex = String(index);
        chip.className = ["scope-chip", item.relation === "out" ? "is-out" : ""].filter(Boolean).join(" ");
        chip.style.setProperty("--note-color", colorForNote(item.note));
        const noteLabel = displayPitch(item.note);
        chip.innerHTML = state.scopeView === "detail"
          ? `<strong>${noteLabel}</strong><span>${item.solfege} / ${item.degree}</span><small>S${item.stringIndex + 1} F${item.fret}</small>`
          : `<strong>${noteLabel}</strong>`;
        chip.addEventListener("click", () => {
          state.selected = { stringIndex: item.stringIndex, fret: item.fret };
          updateInfo(item.stringIndex, item.fret);
        });
        chip.addEventListener("dblclick", event => {
          event.preventDefault();
          event.stopPropagation();
          state.selectionLog = state.selectionLog.filter(entry => entry.id !== item.id);
          render();
        });
        chip.addEventListener("dragstart", event => {
          event.dataTransfer?.setData("text/plain", String(index));
          chip.classList.add("is-dragging");
        });
        chip.addEventListener("dragend", () => {
          chip.classList.remove("is-dragging");
        });
        chip.addEventListener("dragover", event => {
          event.preventDefault();
        });
        chip.addEventListener("drop", event => {
          event.preventDefault();
          const fromIndex = Number(event.dataTransfer?.getData("text/plain"));
          const toIndex = index;
          if (!Number.isInteger(fromIndex) || fromIndex === toIndex) return;
          const next = [...state.selectionLog];
          const [moved] = next.splice(fromIndex, 1);
          next.splice(toIndex, 0, moved);
          state.selectionLog = next;
          render();
        });
        dom.scopeSelection.append(chip);
      });
      renderScopeSuggestions();
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
      const switchColumns = Math.max(notes.length + 1, 9);
      dom.noteSwitchboard.style.gridTemplateColumns = `repeat(${switchColumns}, minmax(3.3rem, 4.2rem))`;
      let switchItemCount = 0;
      const addSwitchSpacers = () => {
        const fillerCount = (switchColumns - (switchItemCount % switchColumns)) % switchColumns;
        for (let index = 0; index < fillerCount; index += 1) {
          const spacer = document.createElement("span");
          spacer.className = "switch-spacer";
          spacer.setAttribute("aria-hidden", "true");
          dom.noteSwitchboard.append(spacer);
          switchItemCount += 1;
        }
      };
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
        switchItemCount += 1;
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
      switchItemCount += 1;
      addSwitchSpacers();

      const tools = [
        { id: "clear", label: "CLN", title: "Clear notes / toggle hidden canvas" },
        { id: "cycle", label: "✏️", title: "Draw / select / hide" },
        { id: "erase", label: "🧽", title: "Erase clicked note" },
        { id: "color", label: state.colorMode === "color" ? "LIG" : "BLU", title: "切換彩色/低彩藍色模式" },
        { id: "accidental", label: accidentalToolLabel(), title: "音名升降記號：自動 / 強制升 / 強制降" },
        { id: "export", label: "JPG", title: "輸出目前畫布為 JPG" },
        { id: "transpose-down", label: "-1", title: "Main/Sub 整體降半音" },
        { id: "transpose-up", label: "+1", title: "Main/Sub 整體升半音" }
      ];
      tools.forEach(tool => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = [
          "pitch-tool",
          (tool.id === state.markerTool || (tool.id === "clear" && state.hideSnapshot) || (tool.id === "color" && state.colorMode === "mono") || (tool.id === "accidental" && state.accidentalMode !== "auto")) ? "is-active" : ""
        ].filter(Boolean).join(" ");
        button.textContent = tool.label;
        button.title = tool.title;
        button.addEventListener("click", () => handleToolClick(tool.id));
        dom.noteSwitchboard.append(button);
        switchItemCount += 1;
      });
      addSwitchSpacers();

      const emphasisTools = [
        { id: "emphasis-target", label: state.emphasisTarget === "a" ? "MAIN" : "SUB", title: "切換強調目標：MAIN / SUB" },
        { id: "em-1", label: "R", degree: "1", title: "強調 Root" },
        { id: "em-3", label: "3rd", degree: "3", title: "強調 3rd" },
        { id: "em-5", label: "5th", degree: "5", title: "強調 5th" },
        { id: "em-7", label: "7th", degree: "7", title: "強調 7th" },
        { id: "em-9", label: "9th", degree: "9", title: "強調 9th" },
        { id: "em-11", label: "11th", degree: "11", title: "強調 11th" },
        { id: "em-13", label: "13th", degree: "13", title: "強調 13th" },
        { id: "em-rel", label: "Rel", degree: "rel", title: "強調 Relative Major / Minor" }
      ];
      emphasisTools.forEach(tool => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = [
          "pitch-tool",
          "emphasis-tool",
          tool.id === "emphasis-target" ? "is-target" : "",
          tool.degree && state.emphasisDegrees.has(tool.degree) ? "is-active" : ""
        ].filter(Boolean).join(" ");
        button.textContent = tool.label;
        button.title = tool.title;
        button.addEventListener("click", () => handleToolClick(tool.id));
        dom.noteSwitchboard.append(button);
      });
    }

    function handleToolClick(toolId) {
      if (toolId === "clear") {
        if (state.hideSnapshot) {
          const snapshot = state.hideSnapshot;
          state.hideSnapshot = null;
          restoreSnapshot(snapshot);
          state.manualSelected.clear();
          state.selectionLog = [];
        } else {
          state.hideSnapshot = snapshotView();
          resetManualMarkers();
          state.selectionLog = [];
          state.mode = "custom";
          state.markerTool = "cycle";
        }
      } else if (toolId === "color") {
        state.colorMode = state.colorMode === "color" ? "mono" : "color";
      } else if (toolId === "accidental") {
        cycleAccidentalMode();
      } else if (toolId === "transpose-down") {
        transposeLayers(-1);
      } else if (toolId === "transpose-up") {
        transposeLayers(1);
      } else if (toolId === "emphasis-target") {
        state.emphasisTarget = state.emphasisTarget === "a" ? "b" : "a";
      } else if (toolId.startsWith("em-")) {
        const degree = toolId.replace("em-", "");
        if (state.emphasisDegrees.has(degree)) {
          state.emphasisDegrees.delete(degree);
        } else {
          state.emphasisDegrees.add(degree);
        }
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
          const actualFret = fret;
          const note = noteAt(openNote, actualFret);
          const info = scaleInfo(note);
          const sources = markerSources(note, stringIndex, actualFret);
          if (!shouldShow(stringIndex, actualFret, note)) continue;

          const selected = state.manualSelected.has(markerKey(stringIndex, actualFret));
          const x = boardX + ((fret - .5) * fretWidth);
          const labels = markerLabels(note, info);
          const noteColor = colorForNote(note);
          const emphasis = shouldEmphasize(note);
          const subOnly = sources.length === 1 && sources[0] === "b";
          const fill = state.colorMode === "mono" ? (subOnly ? "#00a99d" : "#ffffff") : (subOnly ? "#ffffff" : (info.inKey ? noteColor : "#9da5aa"));
          const stroke = state.colorMode === "mono" ? (subOnly ? "none" : "#151918") : (subOnly ? "#00a99d" : "none");
          const textColor = state.colorMode === "mono" ? (subOnly ? "#ffffff" : "#6e93db") : (subOnly ? "#00a99d" : "#ffffff");

          if (sources.length > 1) {
            parts.push(`<circle cx="${x}" cy="${y}" r="${markerRadius + 8}" fill="none" stroke="#6e93db" stroke-width="1.875"/>`);
            parts.push(`<circle cx="${x}" cy="${y}" r="${markerRadius + 12}" fill="none" stroke="#00a99d" stroke-width="1.875" opacity=".78"/>`);
          }
          if (selected) {
            parts.push(`<circle cx="${x}" cy="${y}" r="${markerRadius + 5}" fill="none" stroke="#ffffff" stroke-width="3.125"/>`);
            parts.push(`<circle cx="${x}" cy="${y}" r="${markerRadius + 7}" fill="none" stroke="#343b38" stroke-width="1.25" opacity=".22"/>`);
          }
          if (emphasis) {
            parts.push(`<circle cx="${x}" cy="${y}" r="${markerRadius + 6}" fill="none" stroke="#d986a0" stroke-width="2.5"/>`);
          }
          if (emphasis && selected) {
            parts.push(`<circle cx="${x}" cy="${y}" r="${markerRadius + 9}" fill="none" stroke="#ffffff" stroke-width="2.5"/>`);
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
      document.querySelectorAll('[data-layer-field="keyName"]').forEach(select => {
        select.innerHTML = "";
        KEY_OPTIONS.forEach(key => {
          const option = document.createElement("option");
          option.value = key.name;
          option.textContent = key.name;
          select.append(option);
        });
      });
    }

    function rebuildFormOptions() {
      document.querySelectorAll('[data-layer-field="pattern"]').forEach(select => {
        select.innerHTML = "";
        PATTERN_OPTIONS.forEach(pattern => {
          const option = document.createElement("option");
          option.value = pattern.value;
          option.textContent = pattern.label;
          select.append(option);
        });
      });
    }

    function rebuildVariantOptions(layerId) {
      const layer = state.layers[layerId];
      const select = document.querySelector(`[data-layer="${layerId}"][data-layer-field="variant"]`);
      if (!select) return;
      const source = layer.kind === "arpeggio" ? ARPEGGIO_TYPES : SCALES;
      const groups = layer.kind === "arpeggio" ? ARPEGGIO_GROUPS : SCALE_GROUPS;
      select.innerHTML = "";
      groups.forEach(group => {
        const optgroup = document.createElement("optgroup");
        optgroup.label = group.label;
        group.values.forEach(value => {
          const item = source[value];
          if (!item) return;
          const option = document.createElement("option");
          option.value = value;
          option.textContent = item.label;
          optgroup.append(option);
        });
        select.append(optgroup);
      });
    }

    function syncLayerControls(layerId) {
      const layer = state.layers[layerId];
      rebuildVariantOptions(layerId);
      document.querySelectorAll(`[data-layer="${layerId}"][data-layer-field]`).forEach(control => {
        const field = control.dataset.layerField;
        if (control.type === "checkbox") {
          control.checked = Boolean(layer[field]);
        } else if (field === "variant") {
          control.value = layer.kind === "arpeggio" ? layer.arpeggio : layer.scale;
        } else {
          control.value = layer[field];
        }
      });
      const row = document.querySelector(`[data-layer-row="${layerId}"]`);
      if (row) row.classList.toggle("is-muted", !layer.enabled);
      const label = document.querySelector(`[data-layer-variant-label="${layerId}"]`);
      if (label) label.textContent = layer.kind === "arpeggio" ? "Arp." : "Scale";
      const formulaLabel = document.querySelector(`[data-layer-formula-label="${layerId}"]`);
      if (formulaLabel) formulaLabel.textContent = layer.kind === "arpeggio" ? "Chord Tones" : "Formula";
      if (dom.formulaOutputs[layerId]) dom.formulaOutputs[layerId].textContent = layerFormula(layer);
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
      const secondary = ["note", "solfege", "degree"]
        .filter(kind => kind !== state.labelMode && state.secondaryLabels.has(kind))
        .map(kind => labelText(kind, note, info))
        .filter(Boolean)
        .join(" / ");
      return {
        primary: labelText(state.labelMode, note, info),
        secondary
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
          const actualFret = fret;
          const note = noteAt(openNote, actualFret);
          const info = scaleInfo(note);
          const sources = markerSources(note, stringIndex, actualFret);
          const visible = shouldShow(stringIndex, actualFret, note);
          const cell = document.createElement("button");
          cell.type = "button";
          cell.className = [
            "cell",
            stringIndex === 0 ? "first-string" : "",
            stringIndex === state.strings - 1 ? "last-string" : ""
          ].filter(Boolean).join(" ");
          cell.style.gridRow = stringIndex + 1;
          cell.style.gridColumn = fret + 2;
          cell.setAttribute("aria-label", `${openNote} 弦第 ${actualFret} 格，${displayNote(note)}，${info.solfege}`);
          cell.addEventListener("click", () => {
            toggleMarker(stringIndex, actualFret, note);
            recordScopeSelection(stringIndex, actualFret, note);
            updateInfo(stringIndex, actualFret);
            render();
          });

          if (visible) {
            const labels = markerLabels(note, info);
            const marker = document.createElement("span");
            marker.className = [
              "marker",
              sources.length === 1 && sources[0] === "b" ? "is-layer-b" : "",
              sources.length > 1 ? "is-overlap" : "",
              info.inKey ? "" : "is-out",
              shouldEmphasize(note) ? "is-emphasis" : "",
              state.manualSelected.has(markerKey(stringIndex, actualFret)) ? "is-selected" : ""
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
      renderScopeSelection();
      updateInfo(state.selected.stringIndex, state.selected.fret);
      saveSettings();
    }

    function syncKeyFromControl() {
      state.layers.a.keyName = dom.keyRoot.value;
      if (state.layers.a.kind === "arpeggio") {
        state.layers.a.arpeggio = dom.scaleType.value;
      } else {
        state.layers.a.scale = dom.scaleType.value;
      }
      syncPrimaryLayer();
    }

    function restoreTheoryViewFromCustom() {
      if (state.mode !== "custom") return;
      syncKeyFromControl();
      state.mode = "scale";
      resetManualMarkers();
      render();
    }

    function applyLayerControl(control) {
      const layerId = control.dataset.layer;
      const field = control.dataset.layerField;
      const layer = state.layers[layerId];
      if (control.type === "checkbox") {
        layer[field] = control.checked;
      } else if (field === "variant") {
        if (layer.kind === "arpeggio") {
          layer.arpeggio = control.value;
        } else {
          layer.scale = control.value;
        }
      } else {
        layer[field] = control.value;
      }
      if (layerId === "a") syncPrimaryLayer();
      if (state.mode === "custom") state.mode = "scale";
      syncLayerControls(layerId);
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

    dom.layerControls.forEach(control => {
      control.addEventListener("pointerdown", restoreTheoryViewFromCustom);
      control.addEventListener("change", () => applyLayerControl(control));
    });

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
        state.secondaryLabels.delete(state.labelMode);
        syncSecondaryLabelButtons();
        render();
      });
    });

    dom.secondaryLabelButtons.forEach(button => {
      button.addEventListener("click", () => {
        const kind = button.dataset.secondaryLabel;
        if (kind === state.labelMode) return;
        if (state.secondaryLabels.has(kind)) {
          state.secondaryLabels.delete(kind);
        } else {
          state.secondaryLabels.add(kind);
        }
        syncSecondaryLabelButtons();
        render();
      });
    });

    dom.scopeViewToggle?.addEventListener("click", () => {
      state.scopeView = state.scopeView === "simple" ? "detail" : "simple";
      render();
    });

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
    rebuildFormOptions();
    rebuildTuningOptions();
    syncControlsFromState();
    syncPalette();
    setPageScale(state.pageScale);
    render();
