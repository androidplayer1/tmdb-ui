import {
  defineStyleConfig,
  extendTheme,
  withDefaultColorScheme,
  withDefaultSize,
} from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';

const brandColor = {
  '50': '#0d243f',
  '100': '#0c2039',
  '200': '#0a1d32',
  '300': '#09192c',
  '400': '#081626',
  '500': '#071220',
  '600': '#050e19',
  '700': '#040b13',
  '800': '#03070d',
  '900': '#010406',
};

const VStack = defineStyleConfig({
  baseStyle: {
    gap: 10,
    spacing: 10,
  },
});

const HStack = defineStyleConfig({
  baseStyle: {
    gap: 10,
    spacing: 10,
    bg: 'red.500',
  },
});

const Stack = defineStyleConfig({
  baseStyle: {
    gap: 10,
    spacing: 10,
  },
});

export const TmdbTheme = extendTheme(
  {
    colors: {
      brand: brandColor,
    },
    sizes: {
      'viewport-width': '100vw',
    },
    styles: {
      global: (props: StyleFunctionProps) => ({
        html: {
          w: 'full',
          h: 'full',
        },
        body: {
          w: 'full',
          h: 'full',
        },
        '#root': {
          w: 'full',
          h: 'full',
        },
      }),
    },
    components: {
      VStack,
      HStack,
      Stack,
    },
  },
  withDefaultColorScheme({
    colorScheme: 'brand',
  }),
  withDefaultSize({
    size: 'md',
  })
);
