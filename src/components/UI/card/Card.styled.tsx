import { Grid } from '@mui/material';
import { styled } from '@mui/system';

interface CardContainerProps {
  isSelected: boolean;
}

export const CardContainer = styled(Grid)<CardContainerProps>`
  position: relative;
  display: flex;
  width: 270px;
  min-width: 20%;
  padding: ${({ theme }) => theme.spacing(4)} 0 ${({ theme }) => theme.spacing(4)}
    ${({ theme }) => theme.spacing(4)};
  align-items: flex-start;
  border-radius: ${({ theme }) => theme.spacing(6)};
  border: 1px solid ${({ theme }) => theme.palette.neutral.neutral40};
  background: ${({ theme }) => theme.palette.common.white};

  ${({ isSelected, theme }) =>
    isSelected &&
    `
      border: 0.125rem solid ${theme.palette.primary.main};
    `}

  .TickMark {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: ${({ theme }) => theme.spacing(6)};
    height: ${({ theme }) => theme.spacing(6)};
    background-color: ${({ theme }) => theme.palette.primary.main};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.palette.common.white};
    font-size: 0.875rem;
    font-weight: bold;
  }
  /* media queries */
  @media (max-width: ${({ theme }) => theme.breakpoints.values.xs}px) {
    width: 100%;
  }
`;

export const Logo = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: ${({ theme }) => theme.spacing(4)};
`;

export const ContentContainer = styled(Grid)`
  display: flex;
  padding: 0 ${({ theme }) => theme.spacing(4)};
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1 0 0;
  /* align-self: stretch; */
  margin-top: 2%;
  overflow: hidden;
  .typography {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
