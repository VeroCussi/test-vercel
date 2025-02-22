import localFont from 'next/font/local'

export const inter = localFont({
  src: [
    {
      path: '../public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter/Inter-Italic-VariableFont_opsz,wght.ttf',
      style: 'italic',
    },
  ],
  variable: '--font-inter',
})

export const ovink = localFont({
  src: [
    {
      path: '../public/fonts/Ovink/Ovink_Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Ovink/Ovink_Regular_Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/Ovink/Ovink_Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Ovink/Ovink_Bold_Italic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/Ovink/Ovink_Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/Ovink/Ovink_Black_Italic.otf',
      weight: '900',
      style: 'italic',
    },
    {
      path: '../public/fonts/Ovink/Ovink_Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Ovink/Ovink_Light_Italic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/Ovink/Ovink_Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Ovink/Ovink_Medium_Italic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/Ovink/Ovink_SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Ovink/Ovink_SemiBold_Italic.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../public/fonts/Ovink/Ovink_Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/Ovink/Ovink_Thin_Italic.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../public/fonts/Ovink/Ovink_UltraBlack.otf',
      weight: '950',
      style: 'normal',
    },
    {
      path: '../public/fonts/Ovink/Ovink_UltraBlack_Italic.otf',
      weight: '950',
      style: 'italic',
    },
    {
      path: '../public/fonts/Ovink/Ovink_UltraLight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/Ovink/Ovink_UltraLight_Italic.otf',
      weight: '200',
      style: 'italic',
    },
  ],
  variable: '--font-ovink',
})
