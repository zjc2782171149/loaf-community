import React, { useState } from "react";
//import Subscribes from "../../../components/subscribe/subscribes.jsx"
import { AllSubscribeStyle } from "./allSubscribe";
import HotSubscribe from "./hot/hotSubscribe.jsx";
import NewSubscribe from "./new/newSubscribe.jsx";


const AllSubscribe = ({
   data = [],
}) => {
    const [curTag, setTag] = useState("hot")

    function changeTag(event,str){
        if(str === "new"){
            setTag("new")
            //setTagSubs(newSubs)
        }else if(str === "hot"){
            setTag("hot")
            //setTagSubs(hotSubs)
        }
    }

    return (
        <AllSubscribeStyle>
        <div className="container">
          <div  className="myTab" key={curTag}>
            <a onClick={e => {changeTag(e,"hot")}} style={{ color: (curTag == "hot" ? "#1890FF" : "#86909c")}}>最热</a>
            <a onClick={e => {changeTag(e,"new")}} style={{ color: (curTag == "new" ? "#1890FF" : "#86909c")}}>最新</a>
          </div>
          {/* <Subscribes
             data= {data}
            /> */}
            { curTag === "new" ? <NewSubscribe data={data} /> :  <HotSubscribe data={data} /> }
        </div>
        </AllSubscribeStyle>
    );
  };

export default AllSubscribe;


