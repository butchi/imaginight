import Complex from '@/js/lib/complex';
import CMath from '@/js/lib/cmath';
import CommandLi from '@/js/lib/command-list';

const normalFunc = CommandLi.normalFunc;
const specialFunc = CommandLi.specialFunc;

// from [ヘルプメッセージ - PSP版FFT獅子戦争攻略wiki](http://playshinra.com/fft/helpmessage.html)
const nameArr = [
  "アーノルド",
  "アイアンサイド",
  "アイルトン",
  "アベル",
  "アマルガン",
  "アルバート",
  "アルベルト",
  "アンダーソン",
  "アンディ",
  "イアン",
  "イェーガー",
  "イジュラン",
  "イングラム",
  "インディ",
  "ヴィクター",
  "ウィスク",
  "ウィリー",
  "ヴィンセント",
  "ウインター",
  "ヴェルナー",
  "ウォーゼル",
  "ウォルター",
  "ウッディ",
  "エイブラハム",
  "エステベス",
  "エッカート",
  "エディ",
  "エドガー",
  "エバンズ",
  "エリオット",
  "エリック",
  "オーウェル",
  "オーサ",
  "オットー",
  "オニール",
  "オバノン",
  "カーツ",
  "カーティス",
  "カーマイン",
  "カールソン",
  "ガイスト",
  "ガイラー",
  "カイン",
  "カシム",
  "ガストン",
  "カッシング",
  "カッツ",
  "カプラン",
  "ガルシア",
  "キース",
  "キニスン",
  "ギリアム",
  "キンバリー",
  "キンブル",
  "グイン",
  "グッドマン",
  "クライブ",
  "グレッグ",
  "グレン",
  "クロフォード",
  "ケイン",
  "ケリー",
  "ゲルハルト",
  "ゴーシュ",
  "ゴードン",
  "コールマン",
  "コリンズ",
  "ゴルドン",
  "サザーランド",
  "サザビー",
  "ザック",
  "サムソン",
  "サリバン",
  "サンダース",
  "ジーク",
  "ジーン",
  "シェーンベルグ",
  "シェイカー",
  "ジェリド",
  "ジギー",
  "ジャド",
  "ジャンク",
  "ショーター",
  "ジョドー",
  "ジラルド",
  "シングルトン",
  "スウィフト",
  "スコット",
  "スタンレー",
  "ストーン",
  "ストレイカー",
  "スパイク",
  "スパイダー",
  "スペンサー",
  "スレイダー",
  "セヴェリーニ",
  "ゼメキス",
  "ゼリグ",
  "ゼル",
  "セルジュ",
  "セレック",
  "ソリューズ",
  "ソルヴェー",
  "ダーナー",
  "ダイスン",
  "タイラー",
  "タッカート",
  "ダニエル",
  "ダビッド",
  "ダラス",
  "チェスター",
  "チェンバレン",
  "チップス",
  "ツェッペリン",
  "ディーコン",
  "ディアス",
  "ディック",
  "デイトリッヒ",
  "デイビッド",
  "ディベルカ",
  "ティム",
  "ディロン",
  "デニス",
  "デビッド",
  "デルタ",
  "テンスベルガー",
  "ドースン",
  "ドーマ",
  "ドグ",
  "ドノバン",
  "ドレファス",
  "ドレーパー",
  "トンプソン",
  "ナイジェル",
  "ナッシュ",
  "ナバール",
  "ニール",
  "ニールソン",
  "ニコル",
  "ニルソン",
  "ネイザン",
  "ネルソン",
  "ノートン",
  "ノア",
  "ノリス",
  "パーカー",
  "バークレー",
  "パーティス",
  "バートン",
  "バーナード",
  "バーニィ",
  "ハインライン",
  "バグシー",
  "バスカーク",
  "バスター",
  "バダム",
  "パド",
  "ハリー",
  "バリントン",
  "ハレンタイン",
  "ハロルド",
  "ハンフリー",
  "ハンニバル",
  "ビーン",
  "ヒックス",
  "ヒューゴ",
  "ビンセント",
  "フィッシャー",
  "フィロウ",
  "フィンク",
  "フェルドマン",
  "フォーダム",
  "フォックス",
  "フォワード",
  "ブライアン",
  "ブラッキィ",
  "ブラックバーン",
  "ブランドル",
  "ブリッド",
  "ブレイク",
  "ブルース",
  "ブルーノ",
  "フレディー",
  "フレドー",
  "ベイカー",
  "ベック",
  "ベネディクト",
  "ベルガー",
  "ヘンドリクセン",
  "ボーヴィル",
  "ホーガン",
  "ボイル",
  "ボイス",
  "ホイスラー",
  "ホィットマン",
  "ポナパルト",
  "マーべリック",
  "マーロー",
  "マクガイル",
  "マクニール",
  "マクノートン",
  "マクファーソン",
  "マクレディ",
  "マーティ",
  "マルコム",
  "マンセル",
  "ミュラー",
  "ムサシ",
  "メイフィールド",
  "モーリス",
  "モリスン",
  "モロダー",
  "モンタナ",
  "ユーゴ",
  "ラーズ",
  "ライナス",
  "ラインハルト",
  "ラヴェル",
  "ラット",
  "ラッド",
  "ラディッシュ",
  "ラドクリフ",
  "ラルフ",
  "ランディ",
  "ランドルフ",
  "ランバート",
  "ランバルディ",
  "リーブス",
  "リトルジョン",
  "リバルディ",
  "ルーク",
  "レオン",
  "レッドフォード",
  "レナード",
  "ロイド",
  "ローウェル",
  "ローランド",
  "ロギンス",
  "ロビンズ",
  "ロベルト",
  "ワイアット",
  "アーネスト",
  "アイヴォリー",
  "アイミィ",
  "アイリーン",
  "アクア",
  "アクエリアス",
  "アグネス",
  "アスカ",
  "アニータ",
  "アネット",
  "アマンダ",
  "アリサ",
  "アリシア",
  "アリス",
  "アリエル",
  "アルフォンヌ",
  "アンジェリカ",
  "アンナ",
  "イザベラ",
  "イブ",
  "イライザ",
  "イリア",
  "ヴァネッサ",
  "ヴァレリー",
  "ヴェガ",
  "ヴェロニカ",
  "ウェンディ",
  "エイミー",
  "エヴァ",
  "エスメラルダ",
  "エバ",
  "エミリー",
  "エメラルド",
  "エリー",
  "エリザベート",
  "エリス",
  "エルザ",
  "エルティアナ",
  "エレン",
  "エレーヌ",
  "オパール",
  "オフェーリア",
  "オリーブ",
  "オレンジ",
  "オードリー",
  "オーロラ",
  "カーシャ",
  "ガーネット",
  "カトリーヌ",
  "カルメン",
  "カレン",
  "キティ",
  "キャサリン",
  "キャリー",
  "キャロライン",
  "キャロル",
  "キャンディ",
  "キララ",
  "クィン",
  "クッキー",
  "クラウディア",
  "クララ",
  "クラリス",
  "クリス",
  "クリスティ",
  "グレース",
  "グレンダ",
  "グロリア",
  "クローディア",
  "ケイ",
  "ケイシー",
  "ケイト",
  "ココ",
  "コスモス",
  "コメット",
  "コニー",
  "コリー",
  "コンスタンス",
  "コーネリア",
  "サーシャ",
  "サーラ",
  "サキ",
  "サバティーニ",
  "サファイア",
  "サブリナ",
  "サマンサ",
  "サラダ",
  "サリー",
  "サロメ",
  "サンディ",
  "サンドラ",
  "シータ",
  "シーマ",
  "シーモア",
  "シーラ",
  "シールズ",
  "ジーナ",
  "ジェシカ",
  "ジェニック",
  "ジェニー",
  "ジェニファー",
  "シェパード",
  "シェリル",
  "ジェーン",
  "ジニー",
  "シボーン",
  "シモーヌ",
  "シモンヌ",
  "シャーリー",
  "ジャスミン",
  "ジャッキー",
  "シャディ",
  "シャーデー",
  "シャネル",
  "ジャネット",
  "シャルル",
  "シャレーヌ",
  "シャロン",
  "ジャンヌ",
  "ジューン",
  "ジュディ",
  "ジュリア",
  "ジュリエット",
  "ショーン",
  "ジョアン",
  "ジョアンナ",
  "ジョセフィーヌ",
  "ジョディ",
  "ジョベス",
  "ジョリーン",
  "シルフィ",
  "シルキィ",
  "シルヴィア",
  "ジル",
  "シンシア",
  "シンディ",
  "シンデレラ",
  "ジンジャー",
  "スカーレット",
  "スザンヌ",
  "ステラ",
  "ステファニー",
  "ストロベリー",
  "スワン",
  "スーザン",
  "スージー",
  "セイラ",
  "セス",
  "セティ",
  "セネット",
  "セリーヌ",
  "セルフィーナ",
  "セレシュ",
  "ゾーラ",
  "ソフィア",
  "ダイアナ",
  "タバサ",
  "チェリー",
  "テイシア",
  "デイジー",
  "ティア",
  "ティアラ",
  "ディアナ",
  "ディオンヌ",
  "ティティス",
  "ティナ",
  "ティララ",
  "ティート",
  "デミー",
  "テス",
  "テボラ",
  "テレサ",
  "ドナ",
  "ドミニク",
  "ドリス",
  "トレイシー",
  "ドレス",
  "ドロシー",
  "ドローネ",
  "ナスターシャ",
  "ナタリー",
  "ナンシー",
  "ニキータ",
  "ニュート",
  "ニーナ",
  "ネーナ",
  "ノーラ",
  "バイオレット",
  "パッツィ",
  "パトリシア",
  "バニラ",
  "パパイヤ",
  "パメラ",
  "ハンナ",
  "パーサ",
  "バーシア",
  "パーニャ",
  "バーネット",
  "バーバラ",
  "ヒルダ",
  "ビクトリア",
  "ビッキー",
  "ビューティー",
  "フィアナ",
  "フェイ",
  "フラニー",
  "フランソワ",
  "ブリジット",
  "フリージア",
  "プルミア",
  "フローネ",
  "ベアトリーチェ",
  "ペネローペ",
  "ペパーミント",
  "ペリーヌ",
  "ベリンダ",
  "ヘレン",
  "ベロニカ",
  "ポーラ",
  "ホーリー",
  "マーゴ",
  "マチルダ",
  "マデリーヌ",
  "マルガリータ",
  "マルレーン",
  "マロン",
  "マリア",
  "マリアン",
  "マリリン",
  "マーガレット",
  "マンディ",
  "ミシェル",
  "ミスティ",
  "ミネルヴァ",
  "ミランダ",
  "ミリア",
  "ミレーユ",
  "メイ",
  "メアリー",
  "メラニー",
  "モエ",
  "モニカ",
  "ライザ",
  "ラヴィアン",
  "ラミア",
  "ラムダ",
  "リサ",
  "リップ",
  "リプリー",
  "リンダ",
  "ルナ",
  "ルーシー",
  "レイチェル",
  "レダ",
  "レベッカ",
  "ローザ",
  "ローラ"
];

const characterLi = [
  {
    name: "ナイト",
    hp: [4,0],
    job: "Knight",
    special: {
      name: "剣技",
      func: normalFunc({
        operator: '-',
        power: [2,0],
      }),
    },
  },
  {
    name: "イマジナイト",
    hp: [3,2],
    job: "Imagiknight",
    special: {
      name: "斜め切り",
      func: normalFunc({
        operator: '-',
        power: [2,2],
      }),
    },
  },
  {
    name: "ダークナイト",
    hp: [-4,0],
    job: "Dark Knight",
    special: {
      name: "暗黒剣",
      func: normalFunc({
        operator: '-',
        power: [3,0],
      }),
    },
  },
  {
    name: "トレーナー",
    hp: [2,0],
    job: "Trainer",
    special: {
      name: "強化",
      func: normalFunc({
        operator: '*',
        power: [2,0],
      }),
    },
  },
  {
    name: "魔道士",
    hp: [3,0],
    job: "Magician",
    special: {
      name: "属性変化",
      func: normalFunc({
        operator: '*',
        power: [0,1],
      }),
    },
  },
  {
    name: "暗黒魔道士",
    hp: [-3,0],
    job: "Black Mage",
    special: {
      name: "属性逆変化",
      func: normalFunc({
        operator: '*',
        power: [0,-1],
      }),
    },
  },
  {
    name: "道化師",
    hp: [2,1],
    job: "Joker",
    special: {
      name: "変身",
      func: normalFunc({
        operator: '*',
        power: [1,2],
      }),
    },
  },
  {
    name: "ヒーラー",
    hp: [3,0],
    job: "Healer",
    special: {
      name: "超回復",
      func: normalFunc({
        operator: '+',
        power: [2,0],
      }),
    },
  },
  {
    name: "神官",
    hp: [2,0],
    job: "Priest",
    special: {
      name: "完全蘇生",
      func: specialFunc({
        condition: (opts) => {
          return !opts.target.alive;
        },
        calc: () => {
          return [4,0];
        },
      }),
      desc: '戦闘不能のHPを(4,0)にする',
    }
  },
  {
    name: "ゴースト",
    hp: [0,-3],
    job: "Ghost",
    special: {
      name: "怨念",
      func: normalFunc({
        operator: '-',
        power: [2,0],
      }),
    },
  },
  {
    name: "悪魔",
    hp: [0,-4],
    job: "Devil",
    special: {
      name: "投獄",
      func: normalFunc({
        operator: '-',
        power: [0,3],
      }),
    },
  },
  {
    name: "大天使",
    hp: [0,4],
    job: "Angel",
    special: {
      name: "祝福",
      func: normalFunc({
        operator: '+',
        power: [2,0],
      }),
    },
  },
];

export {characterLi, nameArr};