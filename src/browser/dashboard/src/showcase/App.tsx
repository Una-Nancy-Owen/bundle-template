import { StHorizontalGroup, SquareButton, StVerticalGroup, RoundButton } from '@ui/style'
import styled from 'styled-components'
import {
  ColorStyle,
  colBlue,
  colGreen,
  colSlateGrey,
  colOrange,
  colPurple,
  colRed,
  colRoseRed,
  colSkyGrey,
  colTurquoiseBlue,
  colYellow,
} from '../ui/color'

function App() {
  return (
    <>
      <StWrapper>
        <StLeftColumn>
          <StHorizontalGroup>
            <StVerticalGroup>
              <SquareButton $color={colRed}>Button</SquareButton>
              <SquareButton $color={colRoseRed}>Button</SquareButton>
              <SquareButton $color={colOrange}>Button</SquareButton>
              <SquareButton $color={colYellow}>Button</SquareButton>
              <SquareButton $color={colGreen}>Button</SquareButton>
              <SquareButton $color={colTurquoiseBlue}>Button</SquareButton>
              <SquareButton $color={colBlue}>Button</SquareButton>
              <SquareButton $color={colPurple}>Button</SquareButton>
              <SquareButton $color={colSkyGrey}>Button</SquareButton>
              <SquareButton $color={colSlateGrey}>Button</SquareButton>
            </StVerticalGroup>
            <StVerticalGroup>
              <RoundButton $color={colRed}>Button</RoundButton>
              <RoundButton $color={colRoseRed}>Button</RoundButton>
              <RoundButton $color={colOrange}>Button</RoundButton>
              <RoundButton $color={colYellow}>Button</RoundButton>
              <RoundButton $color={colGreen}>Button</RoundButton>
              <RoundButton $color={colTurquoiseBlue}>Button</RoundButton>
              <RoundButton $color={colBlue}>Button</RoundButton>
              <RoundButton $color={colPurple}>Button</RoundButton>
              <RoundButton $color={colSkyGrey}>Button</RoundButton>
              <RoundButton $color={colSlateGrey}>Button</RoundButton>
            </StVerticalGroup>
          </StHorizontalGroup>
        </StLeftColumn>
        <StCenterColumn>
          <StPanel $color={colRed}>
            <p>Red</p>
          </StPanel>
          <StPanel $color={colRoseRed}>
            <p>RoseRed</p>
          </StPanel>
          <StPanel $color={colOrange}>
            <p>Orange</p>
          </StPanel>
          <StPanel $color={colYellow}>
            <p>Yellow</p>
          </StPanel>
          <StPanel $color={colGreen}>
            <p>Green</p>
          </StPanel>
          <StPanel $color={colTurquoiseBlue}>
            <p>TurquoiseBlue</p>
          </StPanel>
          <StPanel $color={colBlue}>
            <p>Blue</p>
          </StPanel>
          <StPanel $color={colPurple}>
            <p>Purple</p>
          </StPanel>
          <StPanel $color={colSkyGrey}>
            <p>SkyGrey</p>
          </StPanel>
          <StPanel $color={colSlateGrey}>
            <p>Grey</p>
          </StPanel>
        </StCenterColumn>
        <StRightColumn></StRightColumn>
      </StWrapper>
    </>
  )
}

export default App

// #region styles

const StWrapper = styled(StHorizontalGroup)`
  width: 100%;
  max-height: 100vh;
`

const StLeftColumn = styled(StVerticalGroup)`
  width: 33%;
  max-width: 600px;
  flex-grow: 1;
  padding: 20px 10px;
`

const StCenterColumn = styled(StVerticalGroup)`
  width: 34%;
  flex-grow: 1;
  padding: 20px 10px;
`

const StRightColumn = styled(StVerticalGroup)`
  width: 33%;
  flex-grow: 1;
  padding: 20px 10px;
`

const StPanel = styled(StVerticalGroup)<{ $color: ColorStyle }>`
  height: 100px;
  margin: 2px;
  padding: 8px;
  border-radius: 4px;
  background-color: ${(props) => props.$color.normal};

  & p {
    text-align: left;
    padding: 1px 8px;
    font-weight: 700;
  }

  & > p {
    border-top: 1px dashed rgb(255 255 255 /60%);
  }

  & > p:nth-child(1) {
    font-size: 1.2rem;
    font-weight: 900;
    border-top: none;
  }
`

// #endregion styles
