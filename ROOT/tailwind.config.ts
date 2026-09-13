import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ayo: {
          green: '#008751',
          light: '#00A85F',
          black: '#000000',
          white: '#FFFFFF',
        },
        nigeria: {
          green: '#008751',
          white: '#FFFFFF',
        }
      },
      backgroundImage: {
        'ayo-gradient': 'linear-gradient(135deg, #008751 0%, #FFFFFF 100%)',
        'naija': 'linear-gradient(90deg, #008751 33%, #FFFFFF 33%, #FFFFFF 66%, #008751 66%)',
      },
      animation: {
        'pulse-green': 'pulse-green 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-green': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        }
      }
    },
  },
  plugins: [],
}
export default config
