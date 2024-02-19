'use client'
import styled from 'styled-components';

const FullContainer_ = styled.div`
  position: relative;
  z-index: -10;
`;
const TopDashBoard_ = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LeftSide_ = styled.div`
`;
const CenterSide_ = styled.div`
`;
const RightSide_ = styled.div`
`;

export default function HomepageFullContainer({
  leftsideElement,
  centersideElement,
  rightsideElement,
}:{
  leftsideElement: React.ReactNode,
  centersideElement: React.ReactNode,
  rightsideElement: React.ReactNode,
}){
    return (
        <FullContainer_>
          <TopDashBoard_>
            <LeftSide_>{leftsideElement}</LeftSide_>
            <CenterSide_>{centersideElement}</CenterSide_>
            <RightSide_>{rightsideElement}</RightSide_>
          </TopDashBoard_>
        </FullContainer_>
    );
}