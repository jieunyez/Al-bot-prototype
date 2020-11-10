import React, { useState } from 'react';
import { Input, Affix, Button } from 'antd';
import {UserOutlined } from '@ant-design/icons'
import Note from  './components/Note';
import Writing from  './components/Writing';
import axios from 'axios';
import './App.css';


function App() {
  const [fields, setFields] = useState([]);
  const [isNotes, setIsNotes] = useState([]);
  const [top, setTop] = useState(10);

  const [id_input, setid] = useState(''); 

  function handleAddNote() {
    const cell_types = [...isNotes];
    cell_types.push(true);
    setIsNotes(cell_types);

    const values = [...fields];
    values.push({ value: null });
    setFields(values);

    console.log(values);
  }

  function handleAddWrite() {
    const cell_types = [...isNotes];
    cell_types.push(false);
    setIsNotes(cell_types);

    const values = [...fields];
    values.push({ value: null });
    setFields(values);

    console.log(values);
  }



  function handleBRemove(i) {
    console.log(``);
    const values = [...fields];
    const cell_types = [...isNotes];


  
    values.splice(i, 1);
    setFields(values);
    cell_types.splice(i, 1);
    setIsNotes(cell_types);
    //handleNoteRm();
  }

  function handleID(w) {
    console.log(`writing ${w}`); 

    const reqData= { ID: id_input}
    // TO DO : change model 逻辑写在前端
  
    console.log(reqData)
    //const response = await axios.post("http://0.0.0.0:5000/", reqData);
    var config = { headers: {  
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'}
      }

    axios.post("http://127.0.0.1:5000/test",reqData, config).then(function (response) {
      console.log('response is');
      console.log(response);
      console.log(response.data.data);
      //setOutput(response.data.data);
    }).catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="App">
    <Affix offsetTop={top}>
      <Input
      placeholder="Enter your username here please"
      prefix={<UserOutlined className="site-form-item-icon" />}
      onChange= {event => setid(event.target.value)}
        />
      <Input
      placeholder="Enter your password here please"
      />
      <Button type="primary" onClick={() => handleID(id_input)}>Sign In</Button>
        <Button type="dashed" onClick={() => handleAddWrite()}>+Write</Button>
        <Button type= "dashed" onClick={() => handleAddNote()}>+Note</Button>
    </Affix>
    {/* <Button type="dashed" onClick={() => handleAddWrite()}>+Write</Button> */}
    {/* <Button type= "dashed" onClick={() => handleAddNote()}>+Note</Button> */}
    {fields.map((field, idx) => {
        return (
          <div key={`${field}-${idx}`}>
            {isNotes[idx]? 
            <Note />
            : <Writing />}
            <Button type= "dashed" size= "small" onClick={() => handleBRemove(idx)} danger>
              x Delete the Above Section {idx}
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
