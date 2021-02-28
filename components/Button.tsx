import styled from 'styled-components'

const Button = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius}px;
  border: none;
  cursor: pointer;
  user-select: none;
  background-color: ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.primaryTextColor};
  padding-inline: ${({ theme }) => theme.spacing * 2}px;
  padding-block: ${({ theme }) => theme.spacing}px;
  border: 2px solid transparent;
  transition: border-color ${({ theme }) => `${theme.transitionDuration}ms ${theme.transitionTimingFunction}`};

  &:hover {
    border-color: ${({ theme }) => theme.backgroundColor};
  }
`

export default Button
