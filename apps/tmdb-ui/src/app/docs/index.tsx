import { Container, HStack, Image, Link, Text, VStack } from '@chakra-ui/react';
import { RootRoute, Route } from '@tanstack/react-router';
import React, { FC } from 'react';

const Docs: FC = () => {
  return (
    <Container>
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Installing TMDB
      </Text>

      <VStack gap="4">
        <HStack gap="4">
          <Link
            href="https://play.google.com/store/apps/details?id=com.xeinebiu.anplayer"
            target="_blank"
          >
            Download AN Player from PlayStore
          </Link>
          <Image src="./tutorial/1.jpg" height="480px" />
        </HStack>

        <HStack gap="4">
          <Image src="./tutorial/2.jpg" height="480px" />
          <Text>Accept terms and conditions of the app</Text>
        </HStack>

        <HStack gap="4">
          <Text>
            After the application has been installed and terms have been
            accepted, visit the{' '}
            <Link
              href="https://androidplayer1.github.io/tmdb-ui/"
              target="_blank"
            >
              URL
            </Link>
          </Text>
          <Image src="./tutorial/3.jpg" height="480px" />
        </HStack>

        <HStack gap="4">
          <Image src="./tutorial/4.jpg" height="480px" />
          <Text>
            On the configuration page, we have to fill the form. Write the Real
            Debrid API Key and press Install. You may be prompted to open a link
            with AN Player, please accept it. Otherwise, you may download the
            configured plugin and install it manually through the application.
          </Text>
        </HStack>

        <VStack gap="4">
          <Text>
            AN Player is installing our plugin. Open the application manually
            when the installation is done.
          </Text>
          <Image src="./tutorial/5.jpg" height="480px" />
        </VStack>

        <HStack gap="4">
          <Image src="./tutorial/6.jpg" height="480px" />
          <Text>
            On the home page of the application, we can already see our
            installed plugin.
          </Text>
        </HStack>

        <VStack gap="4">
          <Text>
            Configurations can be modified at any time through the application
            by going to Settings/Plugins/tmdb/Configuration
          </Text>
          <HStack>
            <Image src="./tutorial/7.jpg" height="480px" />
            <Image src="./tutorial/8.jpg" height="480px" />
          </HStack>
        </VStack>
      </VStack>
    </Container>
  );
};

export function getDocsRoute(root: RootRoute) {
  return new Route({
    path: '/docs',
    getParentRoute: () => root,
    component: Docs,
  });
}
