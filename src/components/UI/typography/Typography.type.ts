import type { TypographyProps } from '@mui/material';

type OmittedTypographyProps = 'variant';

export type UITypographyProps = Omit<TypographyProps, OmittedTypographyProps> & {
  variant?:
    | 'heading-xl'
    | 'heading-l'
    | 'heading-m'
    | 'heading-s'
    | 'heading-xs'
    | 'heading-xxs'
    | 'overline'
    | 'body-l'
    | 'body-l-bold'
    | 'body-l-link'
    | 'body-m'
    | 'body-m-reg'
    | 'body-m-bold'
    | 'body-m-link'
    | 'body-s'
    | 'body-s-reg'
    | 'body-s-bold'
    | 'body-s-link'
    | 'body-xs'
    | 'body-xs-reg'
    | 'body-xs-bold'
    | 'body-xs-link'
    | 'body-xxs'
    | 'body-xxs-reg'
    | 'body-xxs-bold'
    | 'body-xxs-link'
    | 'list-title'
    | 'button'
    | 'code'
    | 'body-checkbox'
    | string;
};
