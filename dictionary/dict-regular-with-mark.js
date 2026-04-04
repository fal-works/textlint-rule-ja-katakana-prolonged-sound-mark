/**
 * Microsoft の原則通り、末尾長音符ありを正表記とする語。
 *
 * 採録条件:
 * - 語尾が -er/-or/-ar のカタカナ語
 * - かつ、慣例優先・両方許容・カスタム例外のいずれにも該当しない語
 * 
 * 登録対象の語:
 * - 末尾長音符ありで表記された語
 *
 * 用途:
 * - ここに登録されたほうの表記を正表記として扱う
 *
 * @type {import("./builder.js").DictSource}
 */
export default {
  rule: "require-mark", words: [
    // -er （プログラミング・開発）
    "ユーザー",           // user (-er)
    "パーサー",           // parser (-er)
    "ハンドラー",         // handler (-er)
    "リスナー",           // listener (-er)
    "プロバイダー",       // provider (-er)
    "ビルダー",           // builder (-er)
    "ローダー",           // loader (-er)
    "リーダー",           // reader (-er)
    "ライター",           // writer (-er)
    "レンダラー",         // renderer (-er)
    "トリガー",           // trigger (-er)
    "ヘッダー",           // header (-er)
    "フッター",           // footer (-er)
    "フィルター",         // filter (-er)
    "エンコーダー",       // encoder (-er)
    "デコーダー",         // decoder (-er)
    "バッファー",         // buffer (-er)
    "リンカー",           // linker (-er)
    "デバッガー",         // debugger (-er)
    "マネージャー",       // manager (-er)
    "プレースホルダー",   // placeholder (-er)
    "プロファイラー",     // profiler (-er)
    "トレーサー",         // tracer (-er)
    "ランチャー",         // launcher (-er)
    "オブザーバー",       // observer (-er)
    "パブリッシャー",     // publisher (-er)
    "コンシューマー",     // consumer (-er)
    "プロデューサー",     // producer (-er)
    "コンピューター",     // computer (-er)

    // -er （インフラ・ネットワーク）
    "サーバー",           // server (-er)
    "ルーター",           // router (-er)
    "ブラウザー",         // browser (-er)
    "フォルダー",         // folder (-er)
    "プリンター",         // printer (-er)
    "スキャナー",         // scanner (-er)
    "コンテナー",         // container (-er)
    "バランサー",         // balancer (-er)
    "ワーカー",           // worker (-er)
    "クラスター",         // cluster (-er)
    "マスター",           // master (-er)
    "レイヤー",           // layer (-er)
    "ドライバー",         // driver (-er)

    // -er （ハードウェア・デバイス）
    "カウンター",         // counter (-er)
    "タイマー",           // timer (-er)
    "ポインター",         // pointer (-er)
    "パラメーター",       // parameter (-er)
    "キャラクター",       // character (-er)
    "メンバー",           // member (-er)
    "ディスクリプター",   // descriptor (-er)

    // -or
    "モニター",           // monitor (-or)
    "エディター",         // editor (-or)
    "セレクター",         // selector (-or)
    "コントローラー",     // controller (-or)
    "アダプター",         // adapter (-or)
    "ジェネレーター",     // generator (-or)
    "イテレーター",       // iterator (-or)
    "オペレーター",       // operator (-or)
    "バリデーター",       // validator (-or)
    "シミュレーター",     // simulator (-or)
    "エミュレーター",     // emulator (-or)
    "デコレーター",       // decorator (-or)
    "インスペクター",     // inspector (-or)
    "コレクター",         // collector (-or)
    "エグゼキューター",   // executor (-or)
    "インタプリター",     // interpreter (-or)
    "アグリゲーター",     // aggregator (-or)
    "コンパレーター",     // comparator (-or)
    "セパレーター",       // separator (-or)
    "アロケーター",       // allocator (-or)
    "コンバーター",       // converter (-or)
    "インターセプター",   // interceptor (-or)
    "ディスパッチャー",   // dispatcher (-er)
    "オーケストレーター", // orchestrator (-or)
    "コーディネーター",   // coordinator (-or)
    "トランスフォーマー", // transformer (-er)
    "アクセサー",         // accessor (-or)
    "インジケーター",     // indicator (-or)

    // -ar
    "カレンダー",         // calendar (-ar)
  ]
};
