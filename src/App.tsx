
import SurveyGenerator from './components/SurveyGenerator';

function App() {
  return (
    <div className="container">
      <header>
        <h1>🎯 Генератор опросов с Mixtral 8x7B</h1>
        <p>Мощный AI для создания профессиональных опросов</p>
        <div className="model-info">
          <span className="model-badge">Mixtral 8x7B</span>
          <span className="model-badge">32K контекст</span>
          <span className="model-badge">Serveo туннель</span>
        </div>
      </header>
      
      <SurveyGenerator />
    </div>
  );
}

export default App;