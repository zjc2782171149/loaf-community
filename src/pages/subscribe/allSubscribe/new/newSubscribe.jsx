import React from "react";
import Subscribes from "../../../../components/subscribe/subscribes.jsx"

const NewSubscribe = ({
    data = [],
}) => {
    let newSubs = data.filter((item)=> { if(item.tag === "new") return item })

    return (
        <div className="container">
          <Subscribes
             data= {newSubs}
            />
        </div>
    );
  };

export default NewSubscribe;


