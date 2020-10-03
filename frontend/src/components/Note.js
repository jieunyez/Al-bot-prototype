import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

function Note() {
    return (
        <TextArea
              placeholder="Typing your note!"
              bordered= {false}
              style= {{color: "gray"}}
              autoSize
            />
    )
}

export default Note;