import { FC } from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { Box, HStack, VStack } from '../../components/styled-system/jsx';
import { Link } from '../../components/link.tsx';
import { Image } from '../../components/image.tsx';

const Header: FC = () => {
  return (
    <HStack w="full" h="16" p="4" gap="6" bg="red.9" justifyContent="center">
      <RouterLink to="/">
        <Link>Home</Link>
      </RouterLink>

      <RouterLink to="/docs">
        <Link>Tutorial</Link>
      </RouterLink>

      <RouterLink to="/tmdb">
        <Link>TMDB</Link>
      </RouterLink>

      <RouterLink to="/sport">
        <Link>SPORT</Link>
      </RouterLink>

      <Link href="https://github.com/androidplayer1/tmdb-ui" target="_blank">
        <Image src="./github.png" h="8" w="8" />
      </Link>
    </HStack>
  );
};

export const RootPage: FC = () => {
  return (
    <VStack w="full" h="full" gap="0">
      <Header />
      <Box w="full" h="full" overflow="auto" p="4">
        <Outlet />
      </Box>
    </VStack>
  );
};
