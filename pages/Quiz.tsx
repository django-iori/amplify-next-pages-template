import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, View, Button, Text } from '@aws-amplify/ui-react';

interface QuizProps {
  title: string;
  questionNumber: number;
  basePath: string;
}

const Quiz: React.FC<QuizProps> = ({ title, questionNumber, basePath }) => {
  const navigate = useNavigate();

  const handleButtonClick = (answer: number) => {
    navigate(`/${basePath}/result/${questionNumber}/${answer}`);
  };

  return (
    <Flex direction="column" alignItems="center" justifyContent="center" height="100vh" gap="1rem">
      <View as="h2">{title}</View>
      <Text>問題文がここに表示されます。</Text>
      <Flex direction="column" gap="0.5rem" width="100%">
        <Text>1. ~~~~~</Text>
        <Text>2. ~~~~~</Text>
        <Text>3. ~~~~~</Text>
        <Text>4. ~~~~~</Text>
      </Flex>
      <Flex direction="row" gap="1rem">
        <Button variation="primary" onClick={() => handleButtonClick(1)}>1</Button>
        <Button variation="primary" onClick={() => handleButtonClick(2)}>2</Button>
        <Button variation="primary" onClick={() => handleButtonClick(3)}>3</Button>
        <Button variation="primary" onClick={() => handleButtonClick(4)}>4</Button>
      </Flex>
    </Flex>
  );
};

export default Quiz;
