import React, { useState } from 'react';
import { Button } from 'antd';
import Note from  './components/Note';
import Writing from  './components/Writing';
import './App.css';



function App() {
  const [fields, setFields] = useState([]);
  const [isNotes, setIsNotes] = useState([]);

  function handleAddNote() {
    const cell_types = [...isNotes];
    cell_types.push(true);
    setIsNotes(cell_types);

    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleAddWrite() {
    const cell_types = [...isNotes];
    cell_types.push(false);
    setIsNotes(cell_types);

    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
    
    const cell_types = [...isNotes];
    cell_types.splice(i, 1);
    setIsNotes(cell_types);
  }

  return (
    <div className="App">
    <Button type="dashed" onClick={() => handleAddWrite()}>+Write</Button>
    <Button type= "dashed" onClick={() => handleAddNote()}>+Note</Button>
    {fields.map((field, idx) => {
        return (
          <div key={`${field}-${idx}`}>
            {isNotes[idx]? <Note />: <Writing />}
            <Button type= "dashed" size= "small" onClick={() => handleRemove(idx)} danger>
              x Delete the Above Section
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
