import styled from 'styled-components'
import { ColorStyle } from './color'

export const Button = styled.button`
  background-color: rgb(109, 151, 201);
  color: rgb(255, 255, 255);
  padding: 5px 20px;
  margin: 6px 10px;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 250px;
  min-height: 38px;
  &:hover {
    cursor: pointer;
    background-color: rgb(153, 199, 255);
  }

  &:active {
    background-color: rgb(60, 90, 125);
  }

  &:disabled {
    color: rgb(207 207 207);
    background-color: rgb(123 123 123);
  }
`

export const RoundButton = styled(Button)<{ $color: ColorStyle }>`
  background-color: ${(col) => col.$color.normal};
  border-radius: 19px;
  &:hover {
    background-color: ${(col) => col.$color.hover};
  }
  &:active {
    background-color: ${(col) => col.$color.active};
  }
  &:disabled {
    color: rgb(207 207 207);
    background-color: rgb(123 123 123);
    pointer-events: none;
  }
`

export const SquareButton = styled(Button)<{ $color: ColorStyle }>`
  background-color: ${(col) => col.$color.normal};
  border-radius: 4px;
  &:hover {
    background-color: ${(col) => col.$color.hover};
  }
  &:active {
    background-color: ${(col) => col.$color.active};
  }
  &:disabled {
    color: rgb(207 207 207);
    background-color: rgb(123 123 123);
    pointer-events: none;
  }
`

export const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 5px;
  cursor: pointer;
  & > span {
    font-weight: 700;
  }
`

export const ToggleSwitch = styled.div`
  position: relative;
  width: 60px;
  height: 28px;
  background: #b3b3b3;
  border-radius: 32px;
  padding: 4px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: '';
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 35px;
    top: 50%;
    left: 4px;
    background: white;
    transform: translate(0, -50%);
  }
`

export const ToggleInput = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${ToggleSwitch} {
    background-color: #4bd865;

    &:before {
      transform: translate(24px, -50%);
    }
  }
`

export const ToggleButton = styled.label`
  display: inline-block;
  position: relative;
  width: 60px;
  height: 28px;
  border-radius: 30px;
  background-color: #dddddd;
  cursor: pointer;
  transition: background-color 0.4s;

  &:has(:checked) {
    background-color: #4bd865;
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    box-shadow: 0 0 5px rgb(0 0 0 / 20%);
    background-color: #fff;
    content: '';
    transition: left 0.4s;
  }

  &:has(:checked)::after {
    left: 32px;
  }

  & input {
    display: none;
  }
`

export const StVerticalGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const StHorizontalGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
