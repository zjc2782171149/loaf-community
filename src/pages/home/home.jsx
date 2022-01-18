import React, { useState } from 'react';
import { Button } from 'antd';

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>You clicked {count} times</p>
      <Button type="primary" onClick={() => setCount(count + 1)}>Click me</Button>
    </>
  )
}

export default Home