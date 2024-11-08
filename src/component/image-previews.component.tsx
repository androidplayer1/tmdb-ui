import { FC, ReactNode, useEffect, useState } from 'react';

export type ImagePreviewsProps = Readonly<{
  children: ReactNode[];
  interval: number;
}>;

export const ImagePreviews: FC<ImagePreviewsProps> = ({
  children,
  interval,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      let nextImageIndex = currentImageIndex + 1;
      if (nextImageIndex >= children.length) {
        nextImageIndex = 0;
      }
      setCurrentImageIndex(nextImageIndex);
    }, interval);

    return () => clearInterval(intervalRef);
  }, [currentImageIndex, children.length, interval]);

  return children[currentImageIndex];
};
