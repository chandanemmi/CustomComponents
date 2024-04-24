import { styled } from '@mui/system';

export const LoaderContainer = styled('div')`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #3535f3;
    // background:
    //   radial-gradient(farthest-side, #fff 94%, #0000) top/8px 8px no-repeat,
    //   conic-gradient(#0000 30%, #fff);
    -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
    animation: loader 1s infinite linear;

    @keyframes loader {
      100% {
        transform: rotate(1turn);
      }
    }
  }
`;
