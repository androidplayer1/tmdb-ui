import { FC } from 'react';
import { Container, HStack } from '../../components/styled-system/jsx';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '../../components/button.tsx';

export const HomePage: FC = () => {
  return (
    <Container maxW="2xl">
      <HStack gap="4">
        <Button mt="4" flex="1" h="sm" asChild>
          <RouterLink to="/tmdb">The Movie Database</RouterLink>
        </Button>

        <Button mt="4" flex="1" h="sm" asChild>
          <RouterLink to="/sport">Sport</RouterLink>
        </Button>
      </HStack>
    </Container>
  );
};
