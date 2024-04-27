import { List, ListItem, ListItemButton, TextField } from '@mui/material';
import { styled } from '@mui/system';

export const ListItemContainer = styled(List)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.palette.neutral.neutral40};
  max-height: 400px; /* Set the maximum height for scrollability */
  overflow-y: auto;
`;

export const StyledListItem = styled(ListItem)`
  border: 1px solid ${({ theme }) => theme.palette.neutral.neutral40};

  &:first-child {
    border-top: none; /* Remove the top border for the first item */
  }

  &:last-child {
    border-bottom: none; /* Remove the bottom border for the last item */
  }
`;

export const StyledListItemButton = styled(ListItemButton)`
  padding: 0;
  &:hover {
    background-color: transparent;
  }
`;

export const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    max-width: 100%;
  }
`;
