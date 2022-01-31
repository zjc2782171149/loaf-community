import React from "react";
import Subscribes from "../../../components/subscribe/subscribes.jsx"
import { Empty } from 'antd';


const Subscribed = ({
  data = [],
  changedata,
}) => {
    //筛选data
    function fliterFoled(data){
        let newobj = data.filter((item) => {
            if(item.followed) return item
        })
        return newobj
    }
    //筛选data中是否有已关注 渲染数据
    function toShow(nums){
        if(nums.length){
            return <Subscribes data={fliterFoled(data)} updateData={changedata} />
        }else{
            return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"暂无关注的标签"}/>
        }
    }

    return (
        <div>
            { toShow(fliterFoled(data)) }
        </div>
    );
  };

export default Subscribed;