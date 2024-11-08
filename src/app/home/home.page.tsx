import { FC } from 'react';

import { ImagePreviews } from '../../component/image-previews.component';
import { Container, HStack, VStack } from '../../components/styled-system/jsx';
import { Text } from '../../components/text';
import { Image } from '../../components/image';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '../../components/button.tsx';

export const HomePage: FC = () => {
  return (
    <Container w="2xl">
      <VStack gap="4">
        <HStack flexDirection={{ base: 'column', md: 'row' }} gap="4">
          <Text fontSize="xl">
            Discover TMDB for AN Player and unlock a world of cinematic
            exploration, with the power to enjoy movies like never before when
            paired with Real Debrid.
          </Text>
          <ImagePreviews interval={5000}>
            <Image h="480px" src="./preview_1.png" alt="preview_1" />
            <Image h="480px" src="./preview_2.png" alt="preview_2" />
            <Image h="480px" src="./preview_3.png" alt="preview_3" />
            <Image h="480px" src="./preview_4.png" alt="preview_4" />
            <Image h="480px" src="./preview_5.png" alt="preview_5" />
          </ImagePreviews>
        </HStack>

        <HStack gap="4">
          <Image h="100px" src="./git.png" alt="git" />
          <Text fontSize="xl">
            Explore with peace of mind! TMDB is fully open source and safeguards
            your data by not storing it on any third-party servers. Your movie
            journey, your privacy, our promise.
          </Text>
        </HStack>

        <Button mt="4" asChild>
          <RouterLink to="/configuration">Get TMDB Plugin</RouterLink>
        </Button>
      </VStack>
    </Container>
  );
};
