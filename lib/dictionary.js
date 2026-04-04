/**
 * 末尾長音符 `ー` の有無について誤用と判定するべきカタカナ語のセット。
 *
 * 各エントリのコメント形式: 英語原語 (語尾パターン等、正表記の根拠)
 */
const wrongForms = new Set([
  // =====================================================================
  // 規則による登録
  // =====================================================================

  // --- 正表記が末尾ーあり: -er/-or/-ar 語尾で末尾ーが欠落した語 ---

  // -er (プログラミング・開発)
  "ユーザ",           // user (-er)
  "パーサ",           // parser (-er)
  "ハンドラ",         // handler (-er)
  "リスナ",           // listener (-er)
  "プロバイダ",       // provider (-er)
  "ビルダ",           // builder (-er)
  "ローダ",           // loader (-er)
  "リーダ",           // reader (-er)
  "ライタ",           // writer (-er)
  "レンダラ",         // renderer (-er)
  "トリガ",           // trigger (-er)
  "ヘッダ",           // header (-er)
  "フッタ",           // footer (-er)
  "フィルタ",         // filter (-er)
  "エンコーダ",       // encoder (-er)
  "デコーダ",         // decoder (-er)
  "バッファ",         // buffer (-er)
  "リンカ",           // linker (-er)
  "デバッガ",         // debugger (-er)
  "マネージャ",       // manager (-er)
  "プレースホルダ",   // placeholder (-er)
  "プロファイラ",     // profiler (-er)
  "トレーサ",         // tracer (-er)
  "ランチャ",         // launcher (-er)
  "オブザーバ",       // observer (-er)
  "パブリッシャ",     // publisher (-er)
  "コンシューマ",     // consumer (-er)
  "プロデューサ",     // producer (-er)
  "コンピュータ",     // computer (-er)

  // -er (インフラ・ネットワーク)
  "サーバ",           // server (-er)
  "ルータ",           // router (-er)
  "ブラウザ",         // browser (-er)
  "フォルダ",         // folder (-er)
  "プリンタ",         // printer (-er)
  "スキャナ",         // scanner (-er)
  "コンテナ",         // container (-er)
  "バランサ",         // balancer (-er)
  "ワーカ",           // worker (-er)
  "クラスタ",         // cluster (-er)
  "マスタ",           // master (-er)
  "レイヤ",           // layer (-er)
  "ドライバ",         // driver (-er)

  // -er (ハードウェア・デバイス)
  "カウンタ",         // counter (-er)
  "タイマ",           // timer (-er)
  "ポインタ",         // pointer (-er)
  "パラメータ",       // parameter (-er)
  "キャラクタ",       // character (-er)
  "メンバ",           // member (-er)
  "ディスクリプタ",   // descriptor (-er)

  // -or
  "モニタ",           // monitor (-or)
  "エディタ",         // editor (-or)
  "セレクタ",         // selector (-or)
  "コントローラ",     // controller (-or)
  "アダプタ",         // adapter (-or)
  "ジェネレータ",     // generator (-or)
  "イテレータ",       // iterator (-or)
  "オペレータ",       // operator (-or)
  "バリデータ",       // validator (-or)
  "シミュレータ",     // simulator (-or)
  "エミュレータ",     // emulator (-or)
  "デコレータ",       // decorator (-or)
  "インスペクタ",     // inspector (-or)
  "コレクタ",         // collector (-or)
  "エグゼキュータ",   // executor (-or)
  "インタプリタ",     // interpreter (-or)
  "アグリゲータ",     // aggregator (-or)
  "コンパレータ",     // comparator (-or)
  "セパレータ",       // separator (-or)
  "アロケータ",       // allocator (-or)
  "コンバータ",       // converter (-or)
  "インターセプタ",   // interceptor (-or)
  "ディスパッチャ",   // dispatcher (-er)
  "オーケストレータ", // orchestrator (-or)
  "コーディネータ",   // coordinator (-or)
  "トランスフォーマ", // transformer (-er)
  "アクセサ",         // accessor (-or)
  "インジケータ",     // indicator (-or)

  // -ar
  "カレンダ",         // calendar (-ar)

  // --- 正表記が末尾ーなし: -er/-or/-ar 以外で4音節以上、末尾ーが余分な語 ---

  // -ory
  "メモリー",           // memory (-ory)
  "ディレクトリー",     // directory (-ory)
  "リポジトリー",       // repository (-ory)
  "カテゴリー",         // category (-ory)
  "アクセサリー",       // accessory (-ory)
  "ヒストリー",         // history (-ory)
  "インベントリー",     // inventory (-ory)
  "トレジャリー",       // treasury (-ury)
  "ファクトリー",       // factory (-ory)
  "テリトリー",         // territory (-ory)

  // -ary
  "ライブラリー",       // library (-ary)
  "バイナリー",         // binary (-ary)
  "プライマリー",       // primary (-ary)
  "セカンダリー",       // secondary (-ary)
  "グロッサリー",       // glossary (-ary)
  "バウンダリー",       // boundary (-ary)
  "テンポラリー",       // temporary (-ary)

  // -ry (-ory/-ary 以外)
  "レジストリー",       // registry (-ry)
  "エントリー",         // entry (-ry)
  "インダストリー",     // industry (-ry)

  // -ty
  "プロパティー",       // property (-ty)
  "セキュリティー",     // security (-ty)
  "コミュニティー",     // community (-ty)
  "プライオリティー",   // priority (-ty)
  "インテグリティー",   // integrity (-ty)
  "クオリティー",       // quality (-ty)
  "オーソリティー",     // authority (-ty)
  "ベロシティー",       // velocity (-ty)
  "アクティビティー",   // activity (-ty)

  // -bility
  "アクセシビリティー",       // accessibility (-bility)
  "スケーラビリティー",       // scalability (-bility)
  "ユーザビリティー",         // usability (-bility)
  "ポータビリティー",         // portability (-bility)
  "リライアビリティー",       // reliability (-bility)
  "コンパティビリティー",     // compatibility (-bility)
  "フレキシビリティー",       // flexibility (-bility)
  "レスポンシビリティー",     // responsibility (-bility)
  "アカウンタビリティー",     // accountability (-bility)

  // -cy
  "レガシー",           // legacy (-cy)
  "プライバシー",       // privacy (-cy)
  "デペンデンシー",     // dependency (-cy)
  "コンカレンシー",     // concurrency (-cy)
  "コンシステンシー",   // consistency (-cy)

  // -gy
  "テクノロジー",       // technology (-gy)
  "ストラテジー",       // strategy (-gy)
  "トポロジー",         // topology (-gy)
  "メソドロジー",       // methodology (-gy)

  // -my
  "タクソノミー",       // taxonomy (-my)

  // -py
  "エントロピー",       // entropy (-py)

  // -ure
  "アーキテクチャー",         // architecture (-ure)
  "シグネチャー",             // signature (-ure)
  "インフラストラクチャー",   // infrastructure (-ure)
  "プロシージャー",           // procedure (-ure)

  // =====================================================================
  // 慣例優先による登録（一般規則に反するが慣用表記を正とする）
  // =====================================================================

  // --- 慣例で末尾ーなしが正: -er/-or/-ar 語尾だが慣例でーが不要な語 ---

  // -er
  "コンパイラー",     // compiler (-er) 慣例: コンパイラ
  "プログラマー",     // programmer (-er) 慣例: プログラマ
  "フォーマッター",   // formatter (-er) 慣例: フォーマッタ
  "スケジューラー",   // scheduler (-er) 慣例: スケジューラ
  "レジスター",       // register (-er) 慣例: レジスタ
  "バリアー",         // barrier (-er) 慣例: バリア
  "キャリアー",       // carrier (-er) 慣例: キャリア
  "フロンティアー",   // frontier (-er) 慣例: フロンティア

  // -or
  "プロセッサー",     // processor (-or) 慣例: プロセッサ
  "コネクター",       // connector (-or) 慣例: コネクタ
  "ラジエーター",     // radiator (-or) 慣例: ラジエータ
  "ターミネーター",   // terminator (-or) 慣例: ターミネータ
  "トランジスター",   // transistor (-or) 慣例: トランジスタ
  "ドアー",           // door (-or) 慣例: ドア
  "フロアー",         // floor (-or) 慣例: フロア

  // -ar
  "リニアー",         // linear (-ar) 慣例: リニア

  // -ear/-air
  "クリアー",         // clear (-ear) 慣例: クリア
  "ペアー",           // pair (-air) 慣例: ペア
  "ギアー",           // gear (-ear) 慣例: ギア

  // --- 慣例で末尾ーありが正: -er/-or/-ar 以外の語尾で末尾長音符含め4音節以上だが慣例で末尾長音符を保持する語 ---
  "サマリ",           // summary (-ary) 慣例: サマリー
  "レイテンシ",       // latency (-cy) 慣例: レイテンシー
  "フォトグラフィ",   // photography (-phy) 慣例: フォトグラフィー
  "カンパニ",         // company (-ny) 慣例: カンパニー
  "コンピテンシ",     // competency (-cy) 慣例: コンピテンシー
  "ポリシ",         // policy (-cy) 慣例: ポリシー

  // =====================================================================
  // 両方許容（辞書に含めない）
  // =====================================================================
  // "アクセラレータ",   // accelerator (-or)
  // "スカラ",          // scalar (-ar)
]);

/**
 * 誤表記から正表記を導出する。末尾が `ー` なら削り、そうでなければ付ける。
 *
 * 辞書にない語には `undefined` を返す。
 *
 * @param {string} word
 * @returns {string | undefined}
 */
export function correctForm(word) {
  if (!wrongForms.has(word)) return undefined;
  return word[word.length - 1] === "ー"
    ? word.slice(0, -1)
    : word + "ー";
}
