import React from "react";
import Section from "./section/section.jsx";
import { DraftBoxStyle } from "./draftBox";

const DraftBox = () => {
    return(
        <DraftBoxStyle>
            <div className="container">
                <div className="main">
                <Section />
                </div>
            </div>
        </DraftBoxStyle>
    )
}


export default DraftBox;