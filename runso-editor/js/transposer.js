export const Transposer = {
    // 未來實作：升降 Key 演算法
    scale: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    up: function (chord) {
        console.log(`準備將 ${chord} 升半音...`);
        return chord; // TODO
    },
    down: function (chord) {
        console.log(`準備將 ${chord} 降半音...`);
        return chord; // TODO
    }
};