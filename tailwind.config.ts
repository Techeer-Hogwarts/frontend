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
        project: 'url(../../src/assets/images/project.png)',
      },
      colors: {
        primary: '#FE9142',
        gray: '#AEAEAE',
        lightgray: '#D7D7D7',
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
      },
    },
  },
  plugins: [],
}
export default config
