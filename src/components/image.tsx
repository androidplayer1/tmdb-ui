import { ark } from '@ark-ui/react';
import { forwardRef } from 'react';
import { ComponentProps } from './styled-system/types';
import { styled } from './styled-system/jsx';

type StyledImageProps = ComponentProps<typeof StyledImage>;
const StyledImage = styled(ark.img, {});

export type ImageProps = StyledImageProps & {
  src?: string;
};

export const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  return <StyledImage ref={ref} {...props} />;
});

Image.displayName = 'Image';
