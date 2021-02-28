import styled from 'styled-components'

interface DividerProps {
  variant: 'vertical' | 'horizontal'
}

const Divider = styled.div<DividerProps>`
  width: ${({ variant }) => (variant === 'horizontal' ? '100%' : '2px')};
  height: ${({ variant }) => (variant === 'vertical' ? '100%' : '2px')};
  background-color: ${({ theme }) => theme.backgroundColor};
`

export default Divider
