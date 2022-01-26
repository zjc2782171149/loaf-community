import React, { useState } from "react";
import { Card, Row, Col, Button } from 'antd';

const { Meta } = Card;

const Subscribes = ({
    data = [],
    setFatherData,
}) => {
    const cols = [];
    const follow = "已关注";
    const unFollow = "关注";
    const [curFol, setCurFol] = useState([...data])

    function click ( id ){
        const newFol = curFol.map(item => {
            if(item.id === id){
                item.followed = !item.followed;
            }
            return item;
        });
        setCurFol(newFol);
        ()=>{ setFatherData(newFol) }
    }

    for(let i=0 ; i<curFol.length ; i++){
        cols.push(
            <Col span={6} >
                <Card style={{ width:180 }}
                bodyStyle={{ textAlign: 'center' }}
                headStyle={{ textAlign: 'center' }}
                actions={[
                <Button key={ curFol[i].id }
                type="primary"
                ghost= { !curFol[i].followed }
                onClick={() => click( curFol[i].id )}> { curFol[i].followed ? follow : unFollow }
                </Button> ]}>
                <Meta
                title={curFol[i].title}
                description="This is the description"
                />
                </Card>
            </Col>
        );
    }

    return(
        <div className="container">
         <Row justify="start" gutter={[24, 32]}>
            {cols}
        </Row>
        </div>
    )
  };

export default Subscribes;