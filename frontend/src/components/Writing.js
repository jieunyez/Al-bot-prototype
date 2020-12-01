import React, { useState} from 'react';
import { Input, Collapse, Button,  Tabs, Radio, Typography} from 'antd';
import { Select } from 'antd';
import axios from 'axios';



const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;
const {TabPane } = Tabs;
const { Paragraph } = Typography;

//const modelData = ['Translation', 'Summary'];
const modelData = ['Translation', 'Summarization', 'Completion'];
const paramData = {
      Translation: {language: ['French', 'German'],},
      Summarization: {NoParameterNeeded:[]},
      Completion: {start_pos:['1','2','3','4','5','6','7','8','9','10']},
    };


function Writing() {

    const [writing, setWriting] = useState(''); //存writing input
    const [selections, setSelections] = useState([]);  //存不同model的选项
    const [output,setOutput] = useState(null);
    
    function handleModel(activeKey) {
      console.log(`selected ${activeKey}`);
      const sss = [...selections];
      sss.push(activeKey);
      setSelections(sss);
    }

    function handleChange(value) {
      console.log(`selected ${value}`);
      const sss = [...selections];
      sss.push(value);
      setSelections(sss);
    }


    const sendareq = async() => {
      // delete id later
      const reqData= { model : modelData[selections[0]], writing: writing, id: 1}
      // TO DO : change model 逻辑写在前端
      let here_idx= 1;

      for (let kkkey in paramData[modelData[selections[0]]]) {
        reqData[kkkey]= selections[here_idx];
        here_idx= here_idx +1;
      }
      console.log(selections)
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
        setOutput(response.data.data);
      }).catch(function (error) {
        console.log(error);
      });
      
    } 

    function handleCallBackend(w,s) { 
      console.log(`writing ${w}`);  //how to add w to reqdata also??????????
      console.log(`writing ${s}`);
      //call backend
      sendareq();
      setSelections([]);
    }

    return (
        <>
        <Collapse bordered={false} ghost >
            <Panel header="Open Controller" key="1">
            <Radio.Group value="top" style={{ marginBottom: 5 }}>
            </Radio.Group>
            <Tabs defaultActiveKey="0" tabPosition= "top" style={{ height: 100 }} onChange= {handleModel}>
            {[...Array.from({ length: 3}, (v, i) => i)].map(i => (
            <TabPane tab={`${modelData[i]}`} key={i}>
              {
                Object.entries(paramData[modelData[i]])
                .map( ([pkey, pvalues]) =>
                (<Select
                  key= {pkey}
                  showSearch
                  style={{ width: 200 }}
                  placeholder= {pkey}
                  optionFilterProp="children"
                  onChange={handleChange}
                  //onFocus={onFocus}
                  //onBlur={onBlur}
                  //onSearch={onSearch}
                  filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  >
                   {
                   pvalues.map(pvalue => (
                      <Option 
                      key= {`${pkey}-${pvalue}`}
                      value= {pvalue}
                      >{pvalue}</Option>
                   ))
                   }
                  </Select>)

                 )
              }

            </TabPane>
            ))
          }
            </Tabs>

            </Panel>
        </Collapse>
        <TextArea
              placeholder="Writing here!"
              bordered= {false}
              autoSize
              onChange= {event => setWriting(event.target.value)}
        />
        <Button type= "primary" size= "small" onClick={() => handleCallBackend(writing, selections)}>
              RUN this cell
        </Button>
        {
          output &&
        <Paragraph copyable>{output}</Paragraph>
        }
        </>
    )
}

export default Writing;