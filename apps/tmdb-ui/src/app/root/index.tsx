import { Box, Flex, Heading, HStack, Link, VStack } from '@chakra-ui/react';
import { Link as TanstackLink } from '@tanstack/react-router';
import { Outlet, RootRoute } from '@tanstack/react-router';
import React, { FC } from 'react';

const Header: FC = () => {
  return (
    <HStack w="full" h="16" p={4} gap={4} bg="brand.500" color="white">
      <Heading as={TanstackLink} to="/">
        TMDB
      </Heading>

      <Box flex={1}></Box>

      <Link color="white.500" as={TanstackLink} to="/">
        Home
      </Link>

      <Link color="white" as={TanstackLink} to="/faq">
        FAQ
      </Link>

      <Link color="white" as={TanstackLink} to="/github">
        Github
      </Link>

      <Link color="white" as={TanstackLink} to="/docs">
        Docs
      </Link>

      <Link color="white" as={TanstackLink} to="/releases">
        Releases
      </Link>
    </HStack>
  );
};

const Root: FC = () => {
  return (
    <VStack w="full" h="full" gap={0}>
      <Header />
      <Box
        w="full"
        h="full"
        bg="whitesmoke"
        display="flex"
        flexDirection="column"
        overflow="auto"
      >
        <Outlet />
      </Box>
    </VStack>
  );
};

export function getRootRoute() {
  return new RootRoute({
    component: Root,
  });
}
