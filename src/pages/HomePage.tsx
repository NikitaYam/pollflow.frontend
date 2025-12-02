import React from 'react';
import { useNavigate } from 'react-router-dom';
import DemoBanner from '../components/DemoBanner';
import '../styles/App.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <DemoBanner />
      <header>
        <h1>🎯 Система опросов</h1>
        <p>Создавайте и проходите опросы онлайн</p>
      </header>

      <div className="main-content">
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '30px', 
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>
              Выберите действие
            </h2>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '600px'
          }}>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/enter-number')}
              style={{ flex: '1', minWidth: '250px', padding: '30px' }}
            >
              <div>
                <div style={{ fontSize: '2em', marginBottom: '10px' }}>📝</div>
                <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>ПДИ</div>
                <div style={{ fontSize: '0.9em', marginTop: '5px', opacity: 0.9 }}>
                  Пройти опрос
                </div>
              </div>
            </button>

            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/auth')}
              style={{ flex: '1', minWidth: '250px', padding: '30px' }}
            >
              <div>
                <div style={{ fontSize: '2em', marginBottom: '10px' }}>✏️</div>
                <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>СОЗ</div>
                <div style={{ fontSize: '0.9em', marginTop: '5px', opacity: 0.9 }}>
                  Создать опрос
                </div>
              </div>
            </button>
          </div>

          <div style={{ 
            marginTop: '40px', 
            padding: '20px', 
            background: '#f8f9fa', 
            borderRadius: '8px',
            textAlign: 'center',
            maxWidth: '500px'
          }}>
            <p style={{ color: '#666', fontSize: '0.9em', marginBottom: '15px' }}>
              <strong>ПДИ</strong> - Для прохождения существующего опроса<br/>
              <strong>СОЗ</strong> - Для создания нового опроса (требуется регистрация)
            </p>
            <div style={{ 
              background: '#e3f2fd', 
              padding: '15px', 
              borderRadius: '8px',
              marginTop: '15px'
            }}>
              <p style={{ color: '#1565c0', fontSize: '0.85em', margin: 0 }}>
                💡 <strong>Demo Mode:</strong> Доступные ID опросов:<br/>
                <code style={{ 
                  background: 'white', 
                  padding: '2px 6px', 
                  borderRadius: '4px',
                  margin: '0 4px'
                }}>SURVEY-001</code>
                <code style={{ 
                  background: 'white', 
                  padding: '2px 6px', 
                  borderRadius: '4px',
                  margin: '0 4px'
                }}>SURVEY-002</code>
                <code style={{ 
                  background: 'white', 
                  padding: '2px 6px', 
                  borderRadius: '4px',
                  margin: '0 4px'
                }}>SURVEY-003</code>
                <code style={{ 
                  background: 'white', 
                  padding: '2px 6px', 
                  borderRadius: '4px',
                  margin: '0 4px'
                }}>SURVEY-004</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

