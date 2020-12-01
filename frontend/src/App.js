import React, { useState } from 'react';
import { Input, Affix, Button, Layout, Menu, Collapse } from 'antd';
import {UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
import Note from  './components/Note';
import Writing from  './components/Writing';
import User from  './components/User';
import axios from 'axios';
import './App.css';

const { Header, Sider, Content } = Layout;
const { Panel } = Collapse;

function App() {
  const [fields, setFields] = useState([]);
  const [isNotes, setIsNotes] = useState([]);
  const [top, setTop] = useState(10);
  const [id_input, setid] = useState(''); 
  const [isCollapsed, setCollapsed] = useState(false);

  function handleCollapsed() {
    setCollapsed(!isCollapsed);
  }

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

  //send ID to backend
  function handleID(w) {
    console.log(`writing ${w}`); 

    const reqData= { ID: id_input}
    
  
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
      <Layout>
        <Sider collapsible>
          <div className="logo" />
          <Menu defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
            User log-in
            </Menu.Item>
            <User />
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background">
          <MenuUnfoldOutlined className="trigger" onClick= {() => handleCollapsed()}/> 
            {isCollapsed ? 
            <MenuUnfoldOutlined className="trigger" onClick= {() => handleCollapsed()}/> 
            : <MenuFoldOutlined className="trigger" onClick= {() => handleCollapsed()}/>
            }
          </Header>
          <Content
            className="site-layout-background"
          >
          {/* original content here */}
          <Affix offsetTop={top}>
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
          </Content>
        </Layout>
      </Layout>

    </div>
  );
}

export default App;
