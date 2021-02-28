import styled, { keyframes } from 'styled-components'

const Rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Progress = styled.div`
  display: inline-flex;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  border: 4px solid ${({ theme }) => theme.primaryColor};
  border-left-color: transparent;
  animation: ${Rotate} 750ms linear infinite;
`

export default Progress
