import type { DictSource } from "./types.ts";

/**
 * 英語原語の語尾が子音 + -er/-or/-ar のカタカナ語。
 *
 * 原則に従えば末尾長音符ありが正表記。
 * 母音 + -er/-or/-ar（-ear, -ier, -oor 等）は dict-r-vowels.ts を参照。
 */
const dict: DictSource = {
  requireMark: [
    // -er （プログラミング・開発）
    "ユーザー", // user
    "パーサー", // parser
    "ハンドラー", // handler
    "リスナー", // listener
    "プロバイダー", // provider
    "ビルダー", // builder
    { word: "ローダー", variants: ["ダウンローダー", "アップローダー"] }, // loader
    { word: "リーダー", falsePositives: ["ブリーダー"] }, // reader / 偽同定防止: breeder
    { word: "ライター", variants: ["ハイライター"] }, // writer / highlighter
    "レンダラー", // renderer
    "トリガー", // trigger
    "ヘッダー", // header
    "フッター", // footer
    "フィルター", // filter
    "エンコーダー", // encoder
    "デコーダー", // decoder
    "バッファー", // buffer
    "リンカー", // linker
    "デバッガー", // debugger
    "マネージャー", // manager
    "プレースホルダー", // placeholder
    "プロファイラー", // profiler
    "トレーサー", // tracer
    "ランチャー", // launcher
    "オブザーバー", // observer
    "パブリッシャー", // publisher
    "コンシューマー", // consumer
    "プロデューサー", // producer
    "コンピューター", // computer
    "トランスフォーマー", // transformer
    { word: "マーカー", variants: ["ベンチマーカー"] }, // marker / benchmarker
    "ブローカー", // broker
    { word: "ビューアー", variants: ["レビューアー"] }, // viewer
    { word: "テスター", falsePositives: ["プロテスター"] }, // tester / 偽同定防止: protester
    "レコーダー", // recorder
    { word: "インストーラー", variants: ["アンインストーラー"] }, // installer
    "サブスクライバー", // subscriber
    "レシーバー", // receiver
    "スケーラー", // scaler
    "プロビジョナー", // provisioner
    "フォワーダー", // forwarder
    "アナライザー", // analyzer
    "トークナイザー", // tokenizer
    "ビジュアライザー", // visualizer
    "ノーマライザー", // normalizer
    "ローカライザー", // localizer
    "カスタマイザー", // customizer
    "サニタイザー", // sanitizer
    "エクスプローラー", // explorer
    { word: "ランナー", falsePositives: ["プランナー"] }, // runner / 偽同定防止: planner
    "チェッカー", // checker
    "ラッパー", // wrapper
    "セッター", // setter
    "ゲッター", // getter
    "マッパー", // mapper
    "ソーター", // sorter
    "スプリッター", // splitter
    "トラッカー", // tracker
    "ウォーカー", // walker
    "クローラー", // crawler
    "スクレイパー", // scraper
    "バンドラー", // bundler
    "リゾルバー", // resolver
    "デプロイヤー", // deployer
    "スターター", // starter
    "レキサー", // lexer
    "モッカー", // mocker
    "モデラー", // modeler / Microsoft のドキュメントでも末尾長音符あり
    { word: "パッカー", variants: ["アンパッカー"] }, // packer / unpacker
    "タガー", // tagger
    "ステマー", // stemmer
    "スイッチャー", // switcher / Microsoft のドキュメントでも末尾長音符あり
    "インクリメンター", // incrementer
    "デクリメンター", // decrementer
    {
      word: "ポーター", // porter
      variants: ["エクスポーター", "インポーター", "トランスポーター"], // exporter, importer, transporter
      falsePositives: ["レポーター", "サポーター"], // reporter, supporter
    },
    { word: "パッチャー", falsePositives: ["ディスパッチャー"] }, // patcher / 偽同定防止: dispatcher
    "ヘルパー", // helper
    "デベロッパー", // developer
    "ウォッチャー", // watcher
    "マッチャー", // matcher
    "プレーヤー", // player
    "シェーダー", // shader
    "ファインダー", // finder
    "パッケージャー", // packager
    "ストリーマー", // streamer
    "チューナー", // tuner
    "クリッパー", // clipper
    "ピッカー", // picker
    "スライダー", // slider
    "スピナー", // spinner
    "エミッター", // emitter / Microsoft のドキュメントでも末尾長音符あり
    "シンセサイザー", // synthesizer / Microsoft のドキュメントでも末尾長音符あり
    "イコライザー", // equalizer
    "スタビライザー", // stabilizer
    "ミニマイザー", // minimizer
    "マキシマイザー", // maximizer
    "ランダマイザー", // randomizer
    "トランスパイラー", // transpiler
    "コンデンサー", // condenser
    "インバーター", // inverter
    "フェイルオーバー", // failover
    { word: "リンター", falsePositives: ["プリンター", "スプリンター"] }, // linter / 偽同定防止: sprinter

    // -er （インフラ・ネットワーク）
    "サーバー", // server
    "ルーター", // router
    "ブラウザー", // browser
    "フォルダー", // folder
    { word: "プリンター", falsePositives: ["スプリンター"] }, // printer / 偽同定防止: sprinter
    "スキャナー", // scanner
    "コンテナー", // container
    "バランサー", // balancer
    "ワーカー", // worker
    "クラスター", // cluster
    "マスター", // master
    "レイヤー", // layer
    "ドライバー", // driver
    "リピーター", // repeater

    // -er （ハードウェア・デバイス）
    "カウンター", // counter
    "タイマー", // timer
    "ポインター", // pointer
    "パラメーター", // parameter
    "キャラクター", // character
    "メンバー", // member
    "ディスクリプター", // descriptor
    "ブースター", // booster
    "アービター", // arbiter / Microsoft のドキュメントでも末尾長音符あり
    "ディスペンサー", // dispenser

    // -er （一般）
    "ナンバー", // number
    "オーナー", // owner
    "リマインダー", // reminder
    "メッセンジャー", // messenger
    "デザイナー", // designer
    "パートナー", // partner
    "プランナー", // planner
    "サポーター", // supporter
    "レポーター", // reporter
    "ディスパッチャー", // dispatcher

    // -or
    "モニター", // monitor
    "エディター", // editor
    "セレクター", // selector
    "コントローラー", // controller
    "アダプター", // adapter
    "ジェネレーター", // generator
    "イテレーター", // iterator
    "オペレーター", // operator
    "バリデーター", // validator
    "シミュレーター", // simulator
    "エミュレーター", // emulator
    "デコレーター", // decorator
    "インスペクター", // inspector
    "コレクター", // collector
    "エグゼキューター", // executor
    "インタプリター", // interpreter
    "アグリゲーター", // aggregator
    "コンパレーター", // comparator
    "セパレーター", // separator
    "アロケーター", // allocator
    "コンバーター", // converter
    "インターセプター", // interceptor
    "オーケストレーター", // orchestrator
    "コーディネーター", // coordinator
    "アクセサー", // accessor
    "インジケーター", // indicator
    "インジェクター", // injector
    "レプリケーター", // replicator
    "マイグレーター", // migrator
    "コンフィギュレーター", // configurator
    "アノテーター", // annotator
    "ナビゲーター", // navigator
    "オーサー", // author
    "ビジター", // visitor
    "コントリビューター", // contributor
    "コンストラクター", // constructor Microsoft のドキュメントでも末尾長音符あり
    "デストラクター", // destructor
    "スーパーバイザー", // supervisor
    "モデレーター", // moderator
    "ファシリテーター", // facilitator
    "レギュレーター", // regulator
    "ディストリビューター", // distributor
    "カリキュレーター", // calculator
    "プロジェクター", // projector
    "メディエーター", // mediator
    "ネゴシエーター", // negotiator
    "インキュベーター", // incubator
    "エスティメーター", // estimator
    { word: "センサー", falsePositives: ["ライセンサー"] }, // sensor / 偽同定防止: licenser
    "ライセンサー", // licenser
    "ベクター", // vector
    "ハイパーバイザー", // hypervisor / Microsoft のドキュメントでも末尾長音符あり
    "イニシエーター", // initiator / Microsoft のドキュメントでも末尾長音符あり
    "ナレーター", // narrator / Windows の支援技術製品名としても末尾長音符あり
    "インストラクター", // instructor
    { word: "モジュレーター", variants: ["デモジュレーター"] }, // modulator / demodulator
    "オシレーター", // oscillator

    // -ar
    "カレンダー", // calendar
    { word: "レーダー", falsePositives: ["トレーダー"] }, // radar / 偽同定防止: trader
    "トレーダー", // trader
  ],
  requireNoMark: [
    // -er
    "コンパイラ", // compiler
    "プログラマ", // programmer
    "フォーマッタ", // formatter
    "スケジューラ", // scheduler
    "レジスタ", // register
    "イニシャライザ", // initializer
    "オプティマイザ", // optimizer
    { word: "シリアライザ", variants: ["デシリアライザ"] }, // serializer
    "インデクサ", // indexer
    "コンプレッサ", // compressor Microsoft のドキュメントでも揺れているので慣例に従う
    { word: "マルチプレクサ", variants: ["デマルチプレクサ"] }, // multiplexer

    // -or
    "アクセラレータ", // accelerator
    "プロセッサ", // processor
    "コネクタ", // connector
    "ラジエータ", // radiator
    "ターミネータ", // terminator
    "トランジスタ", // transistor
    "アクチュエータ", // actuator / Microsoft のドキュメントでも揺れているので慣例に従う
  ],
  allowBoth: [
    // 固有名詞
    "スカラ", // scalar

    // 偽同定防止
    "ブリーダー", // breeder
    "プロテスター", // protester
    "スプリンター", // sprinter
  ],
};
export default dict;
