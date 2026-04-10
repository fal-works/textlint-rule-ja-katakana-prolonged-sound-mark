/**
 * 英語原語の語尾が -er/-or/-ar 以外で、
 * 末尾長音符あり表記の実効文字数が 4 未満のカタカナ語。
 *
 * 原則（Microsoft スタイルガイド）に従えば末尾長音符ありが正表記。
 *
 * @type {import("./builder.js").DictSource}
 */
export default {
  requireMark: [
    "コピー",             // copy (-py)
  ],
  requireNoMark: [
    "ペア",             // pair (-air) 長音符を付けても4文字に満たない
  ],
};
