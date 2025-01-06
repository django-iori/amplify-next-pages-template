import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, View, Button } from '@aws-amplify/ui-react';

const Home: React.FC = () => (
  <Flex direction="column" alignItems="center" justifyContent="center" height="100vh" gap="1rem">
    <View as="h2">クイズを選択してください。</View>
    <Flex direction="row" gap="1rem">
      <Link to="/this-week"><Button variation="primary">今週</Button></Link>
      <Link to="/last-week"><Button variation="primary">先週</Button></Link>
      <Link to="/week-before-last"><Button variation="primary">先々週</Button></Link>
    </Flex>
  </Flex>
);

export default Home;