import type { DictSource } from './types.ts';

/**
 * 英語原語の語尾が子音 + -er/-or/-ar のカタカナ語。
 *
 * 原則に従えば末尾長音符ありが正表記。
 * 母音 + -er/-or/-ar（-ear, -ier, -oor 等）は dict-r-vowels.ts を参照。
 */
const dict: DictSource = {
  requireMark: [
    // -er （プログラミング・開発）
    "ユーザー",           // user (-er)
    "パーサー",           // parser (-er)
    "ハンドラー",         // handler (-er)
    "リスナー",           // listener (-er)
    "プロバイダー",       // provider (-er)
    "ビルダー",           // builder (-er)
    { word: "ローダー", derived: ["ダウンローダー", "アップローダー"] }, // loader (-er)
    { word: "リーダー", falsePositives: ["ブリーダー"] },                 // reader (-er) / 偽同定防止: breeder
    { word: "ライター", falsePositives: ["ハイライター"] },               // writer (-er) / 偽同定防止: highlighter
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
    "トランスフォーマー", // transformer (-er)
    "マーカー",           // marker (-er)
    "ブローカー",         // broker (-er)
    { word: "ビューアー", derived: ["レビューアー"] },       // viewer (-er)
    { word: "テスター", falsePositives: ["プロテスター"] },  // tester (-er) / 偽同定防止: protester
    "レコーダー",         // recorder (-er)
    { word: "インストーラー", derived: ["アンインストーラー"] }, // installer (-er)
    "サブスクライバー",   // subscriber (-er)
    "レシーバー",         // receiver (-er)
    "スケーラー",         // scaler (-er)
    "プロビジョナー",     // provisioner (-er)
    "フォワーダー",       // forwarder (-er)
    "アナライザー",       // analyzer (-er)
    "トークナイザー",     // tokenizer (-er)
    "ビジュアライザー",   // visualizer (-er)
    "ノーマライザー",     // normalizer (-er)
    "ローカライザー",     // localizer (-er)
    "カスタマイザー",     // customizer (-er)
    "サニタイザー",       // sanitizer (-er)
    "エクスプローラー",   // explorer (-er)
    { word: "ランナー", falsePositives: ["プランナー"] }, // runner (-er) / 偽同定防止: planner (語源的に無関係だが一貫性のため)
    "チェッカー",         // checker (-er)
    "ラッパー",           // wrapper (-er)
    "セッター",           // setter (-er)
    "ゲッター",           // getter (-er)
    "マッパー",           // mapper (-er)
    "ソーター",           // sorter (-er)
    "スプリッター",       // splitter (-er)
    "トラッカー",         // tracker (-er)
    "ウォーカー",         // walker (-er)
    "クローラー",         // crawler (-er)
    "スクレイパー",       // scraper (-er)
    "バンドラー",         // bundler (-er)
    "リゾルバー",         // resolver (-er)
    "デプロイヤー",       // deployer (-er)
    "スターター",         // starter (-er)
    "レキサー",           // lexer (-er)
    {
      word: "ポーター",                                                // porter (-er)
      derived: ["エクスポーター", "インポーター", "レポーター"],       // exporter, importer, reporter
      falsePositives: ["サポーター", "トランスポーター"],              // supporter, transporter
    },
    { word: "パッチャー", derived: ["ディスパッチャー"] }, // patcher (-er)
    "ヘルパー",           // helper (-er)
    "デベロッパー",       // developer (-er)
    "ウォッチャー",       // watcher (-er)
    "マッチャー",         // matcher (-er)
    "プレーヤー",         // player (-er)
    "シェーダー",         // shader (-er)
    "ファインダー",       // finder (-er)
    "パッケージャー",     // packager (-er)
    "ストリーマー",       // streamer (-er)
    "チューナー",         // tuner (-er)
    "クリッパー",         // clipper (-er)
    "ピッカー",           // picker (-er)
    "スライダー",         // slider (-er)
    "スピナー",           // spinner (-er)
    "エミッター",         // emitter (-er) Microsoft のドキュメントでも末尾長音符あり
    "シンセサイザー",     // synthesizer (-er) Microsoft のドキュメントでも末尾長音符あり
    "イコライザー",       // equalizer (-er)
    "スタビライザー",     // stabilizer (-er)
    "ミニマイザー",       // minimizer (-er)
    "マキシマイザー",     // maximizer (-er)
    "ランダマイザー",     // randomizer (-er)
    "トランスパイラー",   // transpiler (-er)
    "コンデンサー",       // condenser (-er)
    "インバーター",       // inverter (-er)
    "デマルチプレクサー", // demultiplexer (-er)

    // -er （インフラ・ネットワーク）
    "サーバー",           // server (-er)
    "ルーター",           // router (-er)
    "ブラウザー",         // browser (-er)
    "フォルダー",         // folder (-er)
    { word: "プリンター", falsePositives: ["スプリンター"] }, // printer (-er) / 偽同定防止: sprinter
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

    // -er （一般）
    "ナンバー",           // number (-er)
    "オーナー",           // owner (-er)
    "リマインダー",       // reminder (-er)
    "メッセンジャー",     // messenger (-er)
    "デザイナー",         // designer (-er)
    "パートナー",         // partner (-er)

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
    "オーケストレーター", // orchestrator (-or)
    "コーディネーター",   // coordinator (-or)
    "アクセサー",         // accessor (-or)
    "インジケーター",     // indicator (-or)
    "インジェクター",     // injector (-or)
    "レプリケーター",     // replicator (-or)
    "マイグレーター",     // migrator (-or)
    "コンフィギュレーター", // configurator (-or)
    "アノテーター",       // annotator (-or)
    "ナビゲーター",       // navigator (-or)
    "オーサー",           // author (-or)
    "ビジター",           // visitor (-or)
    "コントリビューター", // contributor (-or)
    "コンストラクター",   // constructor (-or) Microsoft のドキュメントでも末尾長音符あり
    "デストラクター",     // destructor (-or)
    "スーパーバイザー",   // supervisor (-or)
    "モデレーター",       // moderator (-or)
    "ファシリテーター",   // facilitator (-or)
    "レギュレーター",     // regulator (-or)
    "ディストリビューター", // distributor (-or)
    "カリキュレーター",   // calculator (-or)
    "プロジェクター",     // projector (-or)
    "メディエーター",     // mediator (-or)
    "ネゴシエーター",     // negotiator (-or)
    "インキュベーター",   // incubator (-or)
    "エスティメーター",   // estimator (-or)
    { word: "センサー", falsePositives: ["ライセンサー"] }, // sensor (-or) / 偽同定防止: licenser
    "ベクター",           // vector (-or)

    // -ar
    "カレンダー",         // calendar (-ar)
    { word: "レーダー", falsePositives: ["トレーダー"] },   // radar (-ar) / 偽同定防止: trader

    // -over
    "フェイルオーバー",   // failover (-over)
  ],
  requireNoMark: [
    // -er
    "コンパイラ",       // compiler (-er)
    "プログラマ",       // programmer (-er)
    "フォーマッタ",     // formatter (-er)
    "スケジューラ",     // scheduler (-er)
    "レジスタ",         // register (-er)
    "イニシャライザ",   // initializer (-er)
    "オプティマイザ",   // optimizer (-er)
    { word: "シリアライザ", derived: ["デシリアライザ"] }, // serializer (-er)
    "インデクサ",       // indexer (-er)
    "コンプレッサ",     // compressor (-er) Microsoft のドキュメントでも揺れているので慣例に従う
    "マルチプレクサ",   // multiplexer (-er) 同上

    // -or
    "アクセラレータ",   // accelerator (-or)
    "プロセッサ",       // processor (-or)
    "コネクタ",         // connector (-or)
    "ラジエータ",       // radiator (-or)
    "ターミネータ",     // terminator (-or)
    "トランジスタ",     // transistor (-or)
    "アクチュエータ",   // actuator (-or) Microsoft のドキュメントでも揺れているので慣例に従う

  ],
  allowBoth: [
    "スカラ",           // scalar (-ar) DQかもしれん
  ],
};
export default dict;
