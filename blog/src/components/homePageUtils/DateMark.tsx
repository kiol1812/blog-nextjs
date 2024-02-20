'use client'
import styled from "styled-components"
const FullCatainter =  styled.div`
    width: 100%;
    display: flex;
    align-items: center,
    justify-content: center,
`;
export default function DateMarkBar({
    dateList,
}:{
    dateList: React.ReactNode,
}){
    return (
        <FullCatainter>{dateList}</FullCatainter>
    );
}