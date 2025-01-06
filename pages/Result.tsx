import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Text, Button } from '@aws-amplify/ui-react';

interface ResultParams {
  questionNumber: string | undefined;
  answer: string | undefined;
}

interface ResultProps { 
  basePath: string; 
}

const Result: React.FC<ResultProps> = ({ basePath }) => {
  const params = useParams<Record<string, string | undefined>>();
  const navigate = useNavigate(); 

  console.log("params: ", params);
  
  const questionNumber = parseInt(params.questionNumber || "0", 10);
  const answer = params.answer

  const handleNextQuestion = () => {
    const nextQuestion = questionNumber + 1;
    console.log(nextQuestion);
    if (nextQuestion <= 10) {
      navigate(`/${basePath}/quiz/${nextQuestion}`);
    } else {
      navigate('/total-result');
    }
  };

  return (
    <Flex direction="column" alignItems="center" justifyContent="center" height="100vh" gap="1rem">
      <Text>あなたの解答：{answer}</Text>
      <Button variation="primary" onClick={handleNextQuestion}>次の問題へ</Button>
    </Flex>
  );
};

export default Result;
