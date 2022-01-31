import React from "react";
import Subscribes from "../../../../components/subscribe/subscribes.jsx"

const HotSubscribe = ({
   data = [],
}) => {
    let hotSubs = data.filter((item)=> { if(item.tag === "hot") return item })
    return (
        <div className="container">
          <Subscribes
             data= {hotSubs}
            />
        </div>
    );
  };

export default HotSubscribe;


