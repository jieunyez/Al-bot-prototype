import React, { useState} from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

function Note() {//存writing input
    const [writing, setWriting] = useState('');
    const HRmv = () => {
        setWriting('');
        console.log(writing);
        console.log(`rm!!!!!!!!`);
    }
    return (
        <>
        <TextArea
              placeholder="Typing your note!"
              bordered= {false}
              //value= {writing}
              style= {{color: "gray"}}
              autoSize
              //onChange= {event => setWriting(event.target.value)}
            />
        </>
    )
}

export default Note;
