import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Text, Button } from '@aws-amplify/ui-react';

const TotalResult: React.FC = () => (
  <Flex direction="column" alignItems="center" justifyContent="center" height="100vh" gap="1rem">
    <Text>第1問から第10問までの総合結果がここに表示されます。</Text>
    <Link to="/"><Button variation="primary">ホームへ</Button></Link>
  </Flex>
);

export default TotalResult;
