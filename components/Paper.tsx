import styled from 'styled-components'

const Paper = styled.div`
  display: flex;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  padding: ${({ theme }) => theme.spacing * 2}px;
  background-color: ${({ theme }) => theme.secondaryColor};
  color: ${({ theme }) => theme.textColor};
`

export default Paper
