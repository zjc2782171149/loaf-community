import styled from "styled-components";

const width = document.body.clientWidth;
const height = document.body.clientHeight;
console.log(width, height);

export const AllSubscribeStyle = styled.div`
    .myTab {
        font-size: 10px;
        margin-bottom: 16px;
    }
    .myTab a {
        color: #86909c;
        margin: 10px;
        cursor: pointer;
    }
    .myTab a:hover{
        color: #1890FF;
    }
`;
