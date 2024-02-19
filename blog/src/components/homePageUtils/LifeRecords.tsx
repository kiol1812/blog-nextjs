'use client'
import styled from "styled-components";

const FullCatainter =  styled.div`
    display: flex;
    position: relative;
    width: 100%;
`;
const Records = styled.div`
    display: flex;
    flex-direction: column;
`;
const RecordsGraph = styled.div`
    min-width: 150px;
    min-height: 100px;
    display: flex;
    justify-content: center;    
    align-items: center;  
    border-radius: 5px;
    border: #005f7577 solid 2px
`;
const RecordsText = styled.div`
    font-size: 16px;
`;

export default function LifeRecoedsBar({
    gold,
    records,
}:{
    gold: React.ReactNode,
    records: React.ReactNode,
}){
    return (
        <FullCatainter>
            <Records>
                <RecordsGraph>{records}</RecordsGraph>
                <RecordsText>{gold}</RecordsText>
            </Records>
        </FullCatainter>
    );
}