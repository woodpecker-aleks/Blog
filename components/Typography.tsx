import styled from 'styled-components'

interface TypographyProps {
  readonly transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none'
  readonly align?: 'right' | 'left' | 'center' | 'justify'
}

export const Typography = styled.p<TypographyProps>`
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  font-weight: 400;
  margin-block: ${({ theme }) => theme.spacing}px;
  display: inline-flex;
  align: ${({ align }) => align};
  text-transform: ${({ transform }) => transform};
  font-family: ${({ theme }) => theme.fontFamily};
`

export const A = styled(Typography)`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const H1 = styled(Typography)`
  font-size: 2.2rem;
  font-weight: 600;
`

export const H2 = styled(Typography)`
  font-size: 2rem;
  font-weight: 600;
`

export const H3 = styled(Typography)`
  font-size: 1.8rem;
  font-weight: 600;
`

export const H4 = styled(Typography)`
  font-size: 1.6rem;
  font-weight: 600;
`

export const H5 = styled(Typography)`
  font-size: 1.4rem;
  font-weight: 600;
`

export const H6 = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 600;
`
