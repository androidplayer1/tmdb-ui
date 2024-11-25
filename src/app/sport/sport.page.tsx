import { Container, HStack, Stack } from '../../components/styled-system/jsx';
import { Button } from '../../components/button.tsx';
import SportPlugin from '../../assets/sport.json';
import { downloadJsonStringAsFile, encodeQueryData } from '../../util';
import { Card } from '../../components/card.tsx';
import { Text } from '../../components/text.tsx';

export function SportPage() {
  const handleOnDownload = () => {
    const configuredPlugin = {
      ...SportPlugin,
    };

    downloadJsonStringAsFile(JSON.stringify(configuredPlugin), 'sport.json');
  };

  const handleOnInstall = () => {
    const downloadUrl =
      'https://androidplayer1.github.io/tmdb-ui/assets/sport.json';

    const queryData = encodeQueryData({
      downloadUrl,
    });

    window.open(`anplayer://plugin/install?${queryData}`, '_blank');
  };

  return (
    <Container maxW="2xl" p="4">
      <Stack gap="4">
        <Card.Root variant="outline" w="full" h="sm">
          <Card.Body justifyContent="center" alignItems="center">
            <Text>Configuration coming soon...</Text>
          </Card.Body>
        </Card.Root>
        <HStack gap="3">
          <Button flex="1" variant="outline" onClick={handleOnDownload}>
            Download
          </Button>
          <Button flex="1" onClick={handleOnInstall}>
            Install
          </Button>
        </HStack>
      </Stack>
    </Container>
  );
}
