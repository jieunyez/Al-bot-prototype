import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

function Note() {
    
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
