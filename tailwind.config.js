/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens:{ 
      xl:{'max':'1440px'},
      lg:{'max':'976px'},
      md:{'max':'800px'},
      tablet:{'max':'740px'},
      tabletMini:{'max':'630px'},
      sm:{'max':'480px'},
    },
    
    extend: {
      colors:{    
        cornflowerBlue:'hsla(252, 94%, 67%, 1)',
        heliotrope:'hsla(252, 100%, 73%, 1)',
        mirage:'hsla(233, 31%, 17%, 1)',
        mirageDark:'hsla(233, 30%, 11%, 1)',
        ebonyClay:'hsla(233, 30%, 21%, 1)',
        selago:'hsla(231, 75%, 93%, 1)',
        baliHai:'hsla(231, 20%, 61%, 1)',
        shipCove:'hsla(231, 36%, 63%, 1)',
        vulkan:'hsla(231, 28%, 7%, 1)',
        burntSienna:'hsla(0, 80%, 63%, 1)',
        monaLisa:'hsla(0, 100%, 80%, 1)',
        whisper:'hsla(240, 27%, 98%, 1)',
        polar:'hsla(158, 67%, 95%,1)',
        pizazz:'hsla(33.6, 100%, 95%,1)',
        athensGray:'hsla(240, 8%, 93%)',
        shamrock:'hsla(160, 67%, 52%, 1)',
        serenade:'hsla(34, 100%, 50%, 1)',
        oxfordBlue:'hsla(231, 20%, 27%, 1)',
        fiord:'hsla(231, 20%, 36%, 1)',
        victoria:'hsla(231, 38%, 45%, 0.1)',
        shamrockDark:'hsla(160, 67%, 52%, .1)',
        serenadeDark:'hsla(34, 100%, 50%, .1)',
        athensGrayDark:'hsla(231, 75%, 93%, .1)',
        selagoLight:'hsla(231, 67%, 99%, 1)',
        overlay:'hsla(0, 0%, 20.2%, 0.5)'
        
      },

      spacing:{
        '60':'15rem',
         '187':'46.98rem',
         '25':'6.48rem',
         '6.5':'1.625rem'
      }
    },
  },
  plugins: [],
}

