import { defineConfig, defineGlobalStyles } from '@pandacss/dev';
import { createPreset } from '@park-ui/panda-preset';

export default defineConfig({
  preflight: true,
  presets: [
    '@pandacss/preset-base',
    '@park-ui/panda-preset',
    createPreset({
      additionalColors: ['*'],
      // accentColor: 'red',
      // grayColor: 'sand',
      // borderRadius: 'md',
    }),
    // typographyPreset({
    //   recipe: {
    //     sizes: ['base'],
    //     notProse: {
    //       className: 'not-prose',
    //     },
    //   },
    // }),
  ],
  include: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  exclude: [],
  globalCss: defineGlobalStyles({
    'html, body, #root': {
      w: 'full',
      h: 'full',
      minW: '0',
      overflow: 'hidden',
    },
  }),
  patterns: {
    extend: {
      stack: {
        defaultValues: {},
      },
    },
  },
  theme: {
    extend: {
      slotRecipes: {
        card: {
          variants: {
            variant: {
              outline: {
                root: {
                  boxShadow: 'none',
                  borderWidth: '1px',
                },
              },
            },
          },
        },
        dialog: {
          base: {
            content: {
              w: {
                base: '16rem', // Default for mobile devices
                md: '24rem', // Medium screens (tablets)
                lg: '32rem', // Large screens (desktops)
                xl: '40rem', // Extra-large screens (wide desktops)
                '2xl': '48rem', // 2XL screens (ultra-wide monitors)
              },
            },
          },
        },
        drawer: {
          base: {
            positioner: {
              w: {
                base: '100vw', // Default for mobile devices
                // md: "24rem", // Medium screens (tablets) [Cover full screen for MD or lower)
                lg: '32rem', // Large screens (desktops)
                xl: '40rem', // Extra-large screens (wide desktops)
                '2xl': '48rem', // 2XL screens (ultra-wide monitors)
              },
            },
          },
        },
      },
      recipes: {
        text: {
          variants: {
            variant: {
              column: {
                fontSize: 'xs',
                textTransform: 'uppercase',
                letterSpacing: 'wider',
                fontWeight: 'bold',
              },
            },
          },
        },
      },
    },
  },
  jsxFramework: 'react', // or 'solid' or 'vue'
  outdir: './src/components/styled-system',
});
