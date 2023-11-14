import { StHorizontalGroup, StVerticalGroup } from '@ui/style'
import { keyframes, styled } from 'styled-components'

function App() {
  return (
    <StWrapper>
      <StHorizontalGroup>
        <p>standby</p>
        <StDotAnim1>.</StDotAnim1>
        <StDotAnim2>.</StDotAnim2>
        <StDotAnim3>.</StDotAnim3>
      </StHorizontalGroup>
    </StWrapper>
  )
}

export default App

// #region styles

const StWrapper = styled(StVerticalGroup)`
  width: 1920px;
  height: 1080px;
  background-image: url('polka_dots.jpg');
  align-items: center;
  justify-content: center;
  font-size: 3.8rem;
  font-weight: 900;
`

const Bounce = keyframes`
  0% {transform: translateY(0px);}
  10% {transform: translateY(-10px) scale(1.3) ;}
  20% {transform: translateY(5px);}
  30% {transform: translateY(-3px);}
  40% {transform: translateY(1px);}
  50% {transform: translateY(0px);}
`

const StDotAnim1 = styled.p`
  animation: 2s ease ${Bounce} infinite;
`

const StDotAnim2 = styled.p`
  animation: 2s ease ${Bounce} 0.5s infinite;
`

const StDotAnim3 = styled.p`
  animation: 2s ease ${Bounce} 1s infinite;
`

// #endregion styles
