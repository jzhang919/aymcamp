import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";

import accomplishmentTypes from "../constants/accomplishmentTypes";

import theme from "./theme";

const StyledContainer = styled.div`
  position: relative;
  top: 10px;
  text-align: center;

  h1 {
    color: ${theme.colors.burgundy};
  }
`;

const AccomplishmentTable = ({ accomplishments }) => {
  const types = {};

  accomplishmentTypes.forEach((type) => {
    const filteredAccomplishments = accomplishments.filter(
      (acc) => acc.type === type.value
    );
    types[type.value] = {
      count: filteredAccomplishments.length,
      filteredAccomplishments,
      ...type,
    };
  });

  return (
    <StyledContainer>
      <h1>Camp-wide Goal Progress</h1>
      {Object.keys(types).map((type, index) => (
        <ProgressBar type={types[type]} key={index} />
      ))}
    </StyledContainer>
  );
};

const OuterBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  margin: 10px auto;
  width: 100%;
  max-width: 806px;
  height: 50px;
  border-radius: 50px;

  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.fadedPink};
  color: white;

  h2 {
    flex: 1;
    z-index: 2;
    text-align: center;

    font-size: 24px;
    line-height: 30px;
    font-weight: bold;
    color: ${theme.colors.burgundy};
  }
`;

const InnerBar = styled.div`
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 10px;

  width: ${(props) => `calc(${props.width}% - 20px)`};
  height: 30px;
  border-radius: 30px;
  background: ${theme.colors.fadedGreen};
`;

const Expand = styled.h1`
  color: ${theme.colors.burgundy};
  line-height: 30px;
  z-index: 2;
  padding-right: 10px;
  cursor: pointer;
`;

const HighlightedGoalsContainer = styled.div`
  width: 100%;
  max-width: 795px;
  margin: 10px auto;
  display: flex;
  flex-flow: row wrap;
  padding: 8px 16px;
  border-radius: 10px;

  border: 1px solid;
  background: ${theme.colors.white};
  border-color: ${theme.colors.fadedPink};
`;

const Goal = styled.div`
  width: 33%;
  min-width: 200px;
  font-size: 12px;
  height: auto;
  padding: 20px;
  border-right: 1px solid #e9e9e9;
  color: ${theme.colors.burgundy}

  text-align: left;
  p span {
    margin-left: 10px;
    color: ${theme.colors.fadedPink};
  }

  &&:nth-child(3n) {
    border: none;
  }

  &&:nth-child(n+4) {
    border-top: 1px solid #e9e9e9;
  }
`;

const ProgressBar = ({
  type: { count, goalCount, pbDescription, filteredAccomplishments },
}) => {
  const [expanded, setExpanded] = useState(false);
  const minBarWidth = 8;
  let barWidth = (count / goalCount) * 100;

  if (barWidth < minBarWidth) barWidth = minBarWidth;

  const highlightedGoals = filteredAccomplishments.filter(
    (goal) => goal.highlighted
  );

  const canExpand = highlightedGoals.length > 0;

  return (
    <div>
      <OuterBar
        onClick={() => {
          if (canExpand) {
            setExpanded(!expanded);
          }
        }}
      >
        <div style={{ width: "30px", visibility: "none" }} />
        <h2>
          {count}/{goalCount} {pbDescription}
        </h2>
        {canExpand && <Expand>{expanded ? "-" : "+"}</Expand>}
        <InnerBar width={barWidth}></InnerBar>
      </OuterBar>
      {expanded && (
        <HighlightedGoalsContainer>
          {highlightedGoals.map((goal, index) => (
            <Goal key={index} highlighted={goal.highlighted}>
              <h3>"{goal.note}"</h3>
              <p>
                {`- ${goal.initials} `}
                <span>{moment(goal.date_created).format("MMM D")}</span>
              </p>
            </Goal>
          ))}
        </HighlightedGoalsContainer>
      )}
    </div>
  );
};

export default AccomplishmentTable;
