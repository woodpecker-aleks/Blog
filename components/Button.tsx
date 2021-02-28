import styled from 'styled-components'

const Button = styled.button`
  display: inline-flex;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  border: none;
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 500;
  text-transform: uppercase;
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

  &:disabled {
    opacity: 0.5;
  }
`

export default Button
