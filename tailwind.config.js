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
                transform: 'translateY(-20.66%)',
            },
            '40%, 56%': {
                transform: 'translateY(-40.33%)',
            },
            '60%, 76%': {
                transform: 'translateY(-60%)',
            },
            '80%, 96%': {
                transform: 'translateY(-80.66%)',
            },
            '100%': {
                transform: 'translateY(-80.66%)',
            },
          },                    
      },
    },
  },
  plugins: [],
}