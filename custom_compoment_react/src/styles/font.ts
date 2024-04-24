import localFont from 'next/font/local';

export const jioType = localFont({
  src: [
    {
      path: '../assets/fonts/JioType-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../assets/fonts/JioType-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/JioType-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/JioType-Light.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
});
