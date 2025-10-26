// tailwind.config.js
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        ubuntuMono: ['"Ubuntu Mono"', 'monospace'],
        luckiest: ['"Luckiest Guy"', 'cursive'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-fast': 'spin 500ms linear infinite',
      },
    },
  },
}
