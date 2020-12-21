import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Descriptions} from 'antd';



function User () {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [Submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    setSubmitted(!Submitted);
  }


  return (
    <>
    {Submitted?
    <Descriptions title="User Info" layout="vertical">
    <Descriptions.Item label="Name">wxc5999@gmail.com</Descriptions.Item>
  </Descriptions>
  :
<Form
//{...layout}
name="basic"
initialValues={{
  remember: true,
}}
onFinish={onFinish}
onFinishFailed={onFinishFailed}
>
<Form.Item
  label="Username"
  name="username"
  rules={[
    {
      required: true,
      message: 'Please input your username!',
    },
  ]}
>
  <Input />
</Form.Item>

<Form.Item
  label="Password"
  name="password"
  rules={[
    {
      required: true,
      message: 'Please input your password!',
    },
  ]}
>
  <Input.Password />
</Form.Item>

<Form.Item  name="remember" valuePropName="checked">
  <Checkbox>Remember me</Checkbox>
</Form.Item>

<Form.Item >
  <Button type="primary" htmlType="submit" onClick = {() => handleSubmit()}>
    Submit
  </Button>
</Form.Item>
</Form>
    }
    

    </>
  )

}
export default User;