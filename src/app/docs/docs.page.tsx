import { FC } from 'react';
import {
  Container,
  HStack,
  Stack,
  VStack,
} from '../../components/styled-system/jsx';
import { Text } from '../../components/text';
import { Link } from '../../components/link';
import { Image } from '../../components/image';
import { Button } from '../../components/button.tsx';

export const DocsPage: FC = () => {
  return (
    <Container w="2xl">
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Installing TMDB
      </Text>

      <Stack gap="12">
        <Stack gap="4">
          <Button variant="outline" asChild>
            <Link
              href="https://play.google.com/store/apps/details?id=com.xeinebiu.anplayer"
              target="_blank"
            >
              Download AN Player from PlayStore
            </Link>
          </Button>

          <Image src="./tutorial/1.jpg" />
        </Stack>

        <Stack gap="4">
          <Text>Accept terms and conditions of the app</Text>
          <Image src="./tutorial/2.jpg" />
        </Stack>

        <Stack gap="4">
          <Stack>
            <Text>
              After the application has been installed and terms have been
              accepted, visit
            </Text>
            <Button variant="outline" asChild>
              <Link
                href="https://androidplayer1.github.io/tmdb-ui/"
                target="_blank"
              >
                URL
              </Link>
            </Button>
          </Stack>
          <Image src="./tutorial/3.jpg" />
        </Stack>

        <Stack gap="4">
          <Text>
            On the configuration page, we have to fill the form. Write the Real
            Debrid API Key and press Install. You may be prompted to open a link
            with AN Player, please accept it. Otherwise, you may download the
            configured plugin and install it manually through the application.
          </Text>
          <Image src="./tutorial/4.jpg" />
        </Stack>

        <Stack gap="4">
          <Text>
            AN Player is installing our plugin. Open the application manually
            when the installation is done.
          </Text>
          <Image src="./tutorial/5.jpg" />
        </Stack>

        <Stack gap="4">
          <Text>
            On the home page of the application, we can already see our
            installed plugin.
          </Text>
          <Image src="./tutorial/6.jpg" />
        </Stack>

        <Stack gap="4">
          <Text>
            Configurations can be modified at any time through the application
            by going to Settings/Plugins/tmdb/Configuration
          </Text>
          <Image src="./tutorial/7.jpg" />
          <Image src="./tutorial/8.jpg" />
        </Stack>
      </Stack>
    </Container>
  );
};
