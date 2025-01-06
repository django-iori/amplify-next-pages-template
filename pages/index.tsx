import React from 'react'; 
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams, Navigate } from 'react-router-dom'; 
import { Flex, View, Button, Text } from '@aws-amplify/ui-react'; 
import '@aws-amplify/ui-react/styles.css'; 
import Home from './Home'; 
import Quiz from './Quiz'; 
import Result from './Result';
import TotalResult from './TotalResult';

const App = () => ( 
  <Router>
    <Routes> 
      <Route path="/" element={<Home />} /> 
      <Route path="/this-week/*" element={<QuizRoutes basePath="this-week" />} /> 
      <Route path="/last-week/*" element={<QuizRoutes basePath="last-week" />} /> 
      <Route path="/week-before-last/*" element={<QuizRoutes basePath="week-before-last" />} /> 
      <Route path="/total-result" element={<TotalResult />} />
    </Routes> 
  </Router> 
  ); 

const QuizRoutes: React.FC<{ basePath: string }> = ({ basePath }) => (
  <Routes> 
    <Route path="/" element={<Navigate to={`/${basePath}/quiz/1`} replace />} />
    {Array.from({ length: 10 }, (_, i) => (
      <Route key={i + 1} path={`/quiz/${i + 1}`} element={<Quiz title={`第${i + 1}問`} questionNumber={i + 1} basePath={basePath} />} /> 
    ))} 
    {Array.from({ length: 10 }, (_, i) => (
      <Route key={i + 1} path={`result/:questionNumber/:answer`} element={<Result basePath={basePath} />} /> 
    ))} 
  </Routes> );
  
export default App