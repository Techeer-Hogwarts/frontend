import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#FE9142',
        gray: '#AEAEAE',
        lightgray: '#D7D7D7',
        darkgray: '#5A5A5A',
        filterbg: '#FAFAFA',
        lightblue: '#CFE2FF',
        blue: '#2D5289',
        lightprimary: '#FFE9CF',
        lightgreen: '#B9EBB9',
        green: '#257D2A',
        lightpink: '#FFD1CF',
        pink: '#89402D',
        lightpurple: '#E7D5FF',
        purple: '#723EB3',
        lightyellow: '#FFF2AB',
        yellow: '#9F7D07',
        darkPrimary: '#DD7E3A',
      },
      fontFamily: {
        logo: ['KartriderExtraBold'],
      },
      boxShadow: {
        custom: '1px 2px 4px 0px rgba(128, 128, 128, 0.73)',
        bgshadow: '0px 0px 8.2px 0px rgba(0, 0, 0, 0.14)',
        cardtop: '0px -1px 4px 0px rgba(0, 0, 0, 0.1)',
        card: '0px -1px 4px 0px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);',
      },
    },
  },
  plugins: [],
}
export default config
