/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'text-slide': 'text-slide 12.5s cubic-bezier(0.83, 0, 0.17, 1) infinite',
      },
      keyframes: {
          'text-slide': {
              '0%, 16%': {
                  transform: 'translateY(0%)',
              },
              '20%, 36%': {
                  transform: 'translateY(-25.66%)',
              },
              '40%, 56%': {
                  transform: 'translateY(-49.33%)',
              },
              '60%, 76%': {
                  transform: 'translateY(-73%)',
              },
              '80%, 96%': {
                  transform: 'translateY(-99.66%)',
              },
              '100%': {
                  transform: 'translateY(-99.66%)',
              },
          },                    
      },
    },
  },
  plugins: [],
}