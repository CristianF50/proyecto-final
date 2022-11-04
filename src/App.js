import logo from './logo.svg';

import './App.css';
import { Rate, Col } from 'antd';

function App() {
  return (
    <div className="App">
      <Col>
        <Rate allowHalf defaultValue={2.5} />
      </Col>
    </div>
  );
}

export default App;
