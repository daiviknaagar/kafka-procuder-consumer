import React from 'react';
import './App.css';
import Textbar from './components/textBar';
import Table from './components/table';
// import io from 'socket.io-client';

// const socket = io('http://localhost:8080');

function App() {


  return (
    <div>
      <Textbar />
      <Table />
    </div >
  );
}

export default App;
