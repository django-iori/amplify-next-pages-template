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
  { id: 'gen-002', genre: 'Science' },
  { id: 'gen-003', genre: 'History' },
  { id: 'gen-004', genre: 'Math' },
  { id: 'gen-005', genre: 'Art' }
];

const quizItems = [
  {
    id: 'q-001', genre_code: 'gen-001',
    question: 'What is the capital of Japan?', options1: 'Tokyo', options2: 'Osaka',
    options3: 'Kyoto', options4: 'Nagoya', answer: 'Tokyo',
    Result: 'The capital of Japan is Tokyo.',
    creation_date: new Date().toISOString(), reporting_date: '2024-01-01T00:00:00Z', yobi1: '', yobi2: '', yobi3: ''
  },
  {
    id: 'q-002', genre_code: 'gen-002',
    question: 'What is the speed of light?', options1: '299,792 km/s', options2: '300,000 km/s',
    options3: '150,000 km/s', options4: '199,792 km/s', answer: '299,792 km/s',
    Result: 'The speed of light in a vacuum is 299,792 km/s.',
    creation_date: new Date().toISOString(), reporting_date: '2025-01-01T00:00:00Z', yobi1: '', yobi2: '', yobi3: ''
  },
  {
    id: 'q-003', genre_code: 'gen-003',
    question: 'Who was the first president of the United States?', options1: 'George Washington',
    options2: 'Abraham Lincoln', options3: 'Thomas Jefferson', options4: 'John Adams', answer: 'George Washington',
    Result: 'George Washington was the first president of the United States.',
    creation_date: new Date().toISOString(), reporting_date: '2026-01-01T00:00:00Z', yobi1: '', yobi2: '', yobi3: ''
  },
  {
    id: 'q-004', genre_code: 'gen-004',
    question: 'What is 2+2?', options1: '3', options2: '4', options3: '5', options4: '6', answer: '4',
    Result: '2+2 is equal to 4.', creation_date: new Date().toISOString(), reporting_date: '2027-01-01T00:00:00Z', yobi1: '', yobi2: '', yobi3: ''
  },
  {
    id: 'q-005', genre_code: 'gen-005',
    question: 'What is the main color in Picasso’s Blue Period?', options1: 'Blue', options2: 'Red',
    options3: 'Green', options4: 'Yellow', answer: 'Blue',
    Result: 'The main color in Picasso’s Blue Period is Blue.',
    creation_date: new Date().toISOString(), reporting_date: '2028-01-01T00:00:00Z', yobi1: '', yobi2: '', yobi3: ''
  }
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
