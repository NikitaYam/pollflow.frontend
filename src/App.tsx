import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EnterNumberPage from './pages/EnterNumberPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ConstructorPage from './pages/ConstructorPage';
import SurveyPage from './pages/SurveyPage';
import ResultsPage from './pages/ResultsPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/enter-number" element={<EnterNumberPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/constructor" element={<ConstructorPage />} />
        <Route path="/survey/:surveyId" element={<SurveyPage />} />
        <Route path="/results/:surveyId" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

