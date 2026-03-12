import { createRoot } from 'react-dom/client';
import './index.css';
import './styles.css';
import './styles/taskItem.css';
import './styles/taskOptions.css';
import './styles/modals.css';
import './styles/responsive.css';
import { App } from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);
