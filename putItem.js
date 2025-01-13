const AWS = require('aws-sdk');
require('dotenv').config(); // dotenvをロードして環境変数を読み込む

// AWSのアクセスキーとシークレットキーを設定
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION // 必要に応じてリージョンを設定
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const genreItems = [
  { id: 'gen-001', genre: 'IT' },
  { id: 'gen-002', genre: 'Economy' },
  { id: 'gen-003', genre: 'International' }
];

const quizItems = [
  {
    id: 'q-001', genre_code: 'gen-001',
    question: 'Nintendo Switch 2の特徴について、正しいものはどれでしょうか？', options1: 'Nintendo Switch 2には、PlayStation 5と同等のパワーがある。', options2: 'Nintendo Switch 2には、NVIDIA製の特別なSoC「T234」が搭載される。',
    options3: '初代Nintendo Switchは、4K解像度をサポートしていた。', options4: 'Nintendo Switch 2には、4K対応の可能性がある。', answer_no: 4, answer: 'Nintendo Switch 2には、4K対応の可能性がある。',
    explanation: 'ニュース記事によると、Nintendo Switchの後継機、通称「Nintendo Switch 2」は、NVIDIA製の特別なSoC「T239」が搭載されると噂されています。このSoCはもともと「T234」というチップを改良したもので、Switch 2に適した形に変更されています。また、Switch 2は4K対応の可能性があり、これが実現すると初代Switchの4倍の解像度を出力できることになります。初代Switchは720pから最大1080pの解像度をサポートしており、4K解像度はサポートしていませんでした。PlayStation 4も初期モデルでは4Kをサポートしておらず、2016年に登場したPS4 Proから4Kがサポートされるようになりました。',
    creation_date: new Date().toISOString(), reporting_date: '2024-01-08T00:00:00Z', URL: 'https://news.yahoo.co.jp/articles/771079a4d6271eefe4c95e92d9d4389fd36dcd3d'
  },
  {
    id: 'q-002', genre_code: 'gen-001',
    question: 'メタがファクトチェックのプログラムを終了し、「コミュニティノート」を導入する理由として正しいものはどれでしょうか？', options1: 'ファクトチェックのコストが高すぎたため。', options2: 'ファクトチェックにおけるバイアスを問題視したため。',
    options3: 'コミュニティノートの方が迅速に情報を検証できるため。', options4: 'ファクトチェックの精度が低かったため。', answer_no: 2, answer: 'ファクトチェックにおけるバイアスを問題視したため。',
    explanation: 'ニュース記事によると、メタはファクトチェックのプログラムを終了し、「コミュニティノート」を導入することを発表しました。その理由として、ファクトチェックにおけるバイアスが問題視されていることが挙げられています。ファクトチェックの原則には「非党派性と公正性」がありますが、専門家も人間である以上、完全にバイアスを排除することは難しいとされています。メタは、より多様な視点を持つ人々が参加することでバイアスがかかりにくい「コミュニティノート」を導入することで、より公正な情報検証を目指しています。',
    creation_date: new Date().toISOString(), reporting_date: '2024-01-08T00:00:00Z', URL: 'https://news.yahoo.co.jp/pickup/6525307'
  },
  {
    id: 'q-003', genre_code: 'gen-001',
    question: '次世代電気自動車「Honda 0」シリーズについて、正しいものはどれでしょうか？', options1: 'Honda 0シリーズは、2024年に市場投入される予定である。', options2: 'Honda 0シリーズは、ガソリンエンジンを搭載している。',
    options3: 'Honda 0シリーズのビークルOSは、「ASIMO OS」と呼ばれる。', options4: 'Honda 0シリーズは、「Thick, Heavy, and Smart」というコンセプトで開発されている。', answer_no: 3, answer: 'Honda 0シリーズのビークルOSは、「ASIMO OS」と呼ばれる。',
    explanation: 'ニュース記事によると、Honda 0シリーズは、ホンダが2026年より市場投入を予定している次世代電気自動車（EV）です。ビークルOSには「ASIMO OS」が採用され、E＆Eアーキテクチャーの上で車両を制御し、ドライバーとの仲立ちを務めます。Honda 0シリーズは「Thin, Light, and Wise.（薄い、軽い、賢い）」というコンセプトで開発されており、高度に知能化された車両制御や運転支援システムを実現しています。',
    creation_date: new Date().toISOString(), reporting_date: '2024-01-08T00:00:00Z', URL: 'https://news.yahoo.co.jp/articles/9f2cbb1b0415a30bb879e0c69ac3158bd020acb4'
  },
  {
    id: 'q-004', genre_code: 'gen-002',
    question: '京王線の車内で発生した問題について、正しいものはどれでしょうか？', options1: '車掌がスマホでゲームをしていることは許可されている。', options2: '2人の車掌は、車内でのスマホゲームが原因で処分される予定である。',
    options3: '1月6日午前7時10分ごろに問題が発生した。', options4: '京王電鉄は、スマホの使用に関する規定を緩和する予定である。', answer_no: 2, answer: '2人の車掌は、車内でのスマホゲームが原因で処分される予定である。',
    explanation: 'ニュース記事によると、京王線の車内で車掌が私物のスマートフォンを使用してゲームをしていた事案が2件相次いで発覚しました。これにより、京王電鉄は2人の車掌をそれぞれ処分する方針です。1件目は昨年12月31日午前7時10分ごろに新宿行き普通電車で、2件目は今年1月6日午後3時25分ごろに京王八王子行き特急電車で発生しました。社内規定では私物のスマホの持ち込みや操作は原則禁止されているため、規定の徹底が求められています。',
    creation_date: new Date().toISOString(), reporting_date: '2024-01-09T00:00:00Z', URL: 'https://news.yahoo.co.jp/articles/810bbb7a12d60d0924e5420d43e42c650c79d2a4'
  },
  {
    id: 'q-005', genre_code: 'gen-002',
    question: '実質賃金が4か月連続でマイナスとなっている主な理由として正しいものはどれでしょうか？', options1: '物価が下がっているため。', options2: '賃金が増加しているため。',
    options3: '食品の値上げラッシュが続いているため。', options4: 'ガソリンの価格が下がっているため。', answer_no: 3, answer: '食品の値上げラッシュが続いているため。',
    explanation: 'ニュース記事によると、実質賃金が4か月連続でマイナスとなっている主な理由は、食品の値上げラッシュが続いているためです。キャベツや大根、お米といった基本的な食品の価格が平年の2倍から3倍にまで上昇し、特に主食のお米が大幅に値上がりしています。また、今後もパンやコーヒー、ビールなどの値上げが予定されており、家計の負担が増えています。賃上げがあったとしても、この強烈な物価高にはなかなか追いつくことが難しい状況です。',
    creation_date: new Date().toISOString(), reporting_date: '2024-01-09T00:00:00Z', URL: 'https://news.yahoo.co.jp/articles/e23daf6653bc10a72ef9d6b7001f9c4f2ca74126'
  },
  {
    id: 'q-006', genre_code: 'gen-002',
    question: '最近の新入社員の初任給引き上げに関する説明として正しいものはどれでしょうか？', options1: '明治安田生命は、2025年度の初任給を27万円から24万円に引き下げる。', options2: 'ファーストリテイリングは、今年春入社の社員の初任給を33万円にする。',
    options3: '三井住友銀行は、2025年4月に入行する新卒社員の初任給を30万円に引き上げる。', options4: '新入社員の初任給引き上げは、大手金融機関に限られている。', answer_no: 2, answer: 'ファーストリテイリングは、今年春入社の社員の初任給を33万円にする。',
    explanation: 'ニュース記事によると、人手不足などを背景に、新入社員の獲得競争が激しくなる中で、初任給の引き上げが相次いでいます。明治安田生命は2025年度の初任給を24万円から27万円に引き上げ、ファーストリテイリングは今年春入社の社員の初任給を33万円にする予定です。三井住友銀行は2026年4月に入行する新卒社員の初任給を30万円に引き上げる方針です。このように、初任給の引き上げは大手金融機関だけでなく、他の大手企業でも見られます。',
    creation_date: new Date().toISOString(), reporting_date: '2024-01-09T00:00:00Z', URL: 'https://news.yahoo.co.jp/articles/53ec2f22bb75b99bb5a199842240b043a0e001c7'
  },
  {
    id: 'q-007', genre_code: 'gen-003',
    question: 'レバノンの新大統領に選出されたジョセフ・アウン氏について、正しいものはどれでしょうか？', options1: 'ジョセフ・アウン氏は、イスラム教スンニ派の指導者である。', options2: 'ジョセフ・アウン氏は、レバノン軍の司令官である。',
    options3: 'ジョセフ・アウン氏は、ヒズボラの指導者である。', options4: 'ジョセフ・アウン氏は、イスラエルの軍事顧問である。', answer_no: 2, answer: 'ジョセフ・アウン氏は、レバノン軍の司令官である。',
    explanation: 'ニュース記事によると、レバノン議会は2025年1月9日にレバノン軍司令官のジョセフ・アウン氏を大統領に選出しました。前大統領の任期が2022年10月に終了して以来、後任選びで政党間の折り合いがつかず、大統領の座が空席となっていました。アウン氏の選出により、長年の政治混乱の収束に向けて一歩踏み出した形です。また、アウン氏は選出後の演説で、軍事力を持つのは国軍に限定すると強調し、イスラエルとの停戦合意を尊重することを述べました.',
    creation_date: new Date().toISOString(), reporting_date: '2024-01-09T00:00:00Z', URL: 'https://news.yahoo.co.jp/articles/2dad861633a962c7c4d8cdd43d3c027026f8a0b8'
  },
  {
    id: 'q-008', genre_code: 'gen-003',
    question: 'トランプ次期大統領がメキシコ湾の名称を「アメリカ湾」に変更すると主張した理由として正しいものはどれでしょうか？', options1: 'メキシコ湾の名称が古すぎるため。', options2: 'メキシコ湾の名称が国際的に認知されていないため。',
    options3: 'メキシコ湾の名称を変更することで、アメリカの存在感をアピールするため。', options4: 'メキシコ湾の名称が美しくないため。', answer_no: 3, answer: 'メキシコ湾の名称を変更することで、アメリカの存在感をアピールするため。',
    explanation: 'ニュース記事によると、トランプ次期大統領はメキシコ湾の名称を「アメリカ湾」に変更すると主張しました。この発言は、アメリカの存在感をアピールするための挑発的な発言とされています。また、トランプ次期大統領はグリーンランドの買収やパナマ運河の所有権についても言及し、就任前から波紋を広げています。これらの発言は、国家安全保障や戦略的な目的を強調するものであり、アメリカの影響力を示す意図があると考えられます。',
    creation_date: new Date().toISOString(), reporting_date: '2024-01-09T00:00:00Z', URL: 'https://news.yahoo.co.jp/articles/ad91e2fa392327498c6f8a8d9cb08ba16586a9c7'
  },
  {
    id: 'q-009', genre_code: 'gen-003',
    question: '北朝鮮が韓国内で運営するスパイ組織に対して送った指令文の内容として正しいものはどれでしょうか？', options1: '韓国の経済成長を促進するよう指示した。', options2: '韓国と日本の友好関係を強化するよう指示した。',
    options3: '福島第一原発の処理水放出に関して反日行為を扇動するよう指示した。', options4: '韓国の文化交流を促進するよう指示した。', answer_no: 3, answer: '福島第一原発の処理水放出に関して反日行為を扇動するよう指示した。',
    explanation: 'ニュース記事によると、北朝鮮が韓国内で運営するスパイ組織に対し、福島第一原発の処理水放出に関して反日行為を扇動するよう指示する指令文を送っていたことが判明しました。指令文には、反日世論をあおり、日韓対立を激化させる戦術案を立てるよう具体的な指示が含まれていました。これにより、北朝鮮が反日機運を利用し、韓国内の分断と日韓対立をあおっている実態が浮かび上がりました。',
    creation_date: new Date().toISOString(), reporting_date: '2024-01-09T00:00:00Z', URL: 'https://news.yahoo.co.jp/articles/8ad715d195f0819056761d4c662e7b63a0d8fd4c'
  },
  {
    id: 'q-010', genre_code: 'gen-003',
    question: 'マクドナルドの英国事業に関する集団提訴の内容として正しいものはどれでしょうか？', options1: '提訴されたのは、勤務時に30歳未満だった現・元従業員である。', options2: '提訴の理由は、給与の未払いである。',
    options3: '提訴されたハラスメントには、差別やホモフォビアが含まれている。', options4: '提訴されたのは、マクドナルドの米国事業運営会社である。', answer_no: 3, answer: '提訴されたハラスメントには、差別やホモフォビアが含まれている。',
    explanation: 'ニュース記事によると、英法律事務所リー・デイは、米ファストフード大手マクドナルドの英国事業運営会社を相手取り、若手従業員700人以上が各種のハラスメントを受けたとして集団提訴しました。提訴されたハラスメントには、差別、ホモフォビア（同性愛嫌悪）、人種差別、エイブルイズム（非障害者優先主義）、ハラスメントが含まれています。被害者は勤務時に20歳未満だった現・元従業員で、損害賠償の支払いを求めています。',
    creation_date: new Date().toISOString(), reporting_date: '2024-01-09T00:00:00Z', URL: 'https://news.yahoo.co.jp/articles/a2cb3b255c2d8f5cc4d0802a9f103ebf39c65674'
  },
];

const batchWrite = (tableName, items) => {
  const params = {
    RequestItems: {
      [tableName]: items.map(item => ({
        PutRequest: {
          Item: item
        }
      }))
    }
  };

  dynamodb.batchWrite(params, (err, data) => {
    if (err) {
      console.error(`Unable to add items to ${tableName}. Error JSON:`, JSON.stringify(err, null, 2));
    } else {
      console.log(`Added items to ${tableName}:`, JSON.stringify(data, null, 2));
    }
  });
};

batchWrite('Genre-3n6ornxttvb7dm2wop7e2omzja-NONE', genreItems);
batchWrite('Quiz-3n6ornxttvb7dm2wop7e2omzja-NONE', quizItems);
