import { useCallback, useState } from 'react';

import TorrentiePlugin from '../../assets/torrentie.json';
import { downloadJsonStringAsFile, encodeQueryData } from '../../util';
import {
  Container,
  HStack,
  Stack,
  VStack,
} from '../../components/styled-system/jsx';
import { Text } from '../../components/text.tsx';
import { Button } from '../../components/button.tsx';
import { Checkbox } from '../../components/checkbox.tsx';
import { Field } from '../../components/field.tsx';
import { RadioGroup } from '../../components/radio-group.tsx';
import { Card } from '../../components/card.tsx';
import { Link as RouterLink } from 'react-router-dom';

type TorrentSorting = 'none' | 'quality_seeder' | 'quality_size' | 'seeder';

type TorrentieExtractorConfig = Readonly<{
  rdApiKey?: string;
  providers?: string[];
  sorting?: TorrentSorting;
  excludeKeywords?: string[];
}>;

declare const anPlayer: {
  getConfiguration(): string;
  setConfiguration(configuration: string): boolean;
  finish(): void;
};

const torrentProviders = [
  {
    id: '1337x',
    url: 'https://1337x.to',
  },
  {
    id: 'kickass',
    url: 'https://kickasstorrent.cr',
  },
  {
    id: 'eztv',
    url: 'https://eztv.re',
  },
  {
    id: 'tpb',
    url: 'https://tpb.party',
  },
  {
    id: 'nyaa',
    url: 'https://nyaa.si',
  },
];

const loadConfiguration: TorrentieExtractorConfig = (() => {
  try {
    return JSON.parse(anPlayer.getConfiguration()) as TorrentieExtractorConfig;
  } catch (e) {
    console.error(e);
    return {
      rdApiKey: '',
      sorting: 'quality_seeder',
      providers: torrentProviders.map((x) => x.id),
    };
  }
})();

const saveConfiguration = (configuration: TorrentieExtractorConfig) => {
  const configurationJson = JSON.stringify(configuration);
  const result = anPlayer.setConfiguration(configurationJson);
  if (result) {
    anPlayer.finish();
  }
};

const isLoadedFromAnPlayer = (() => {
  try {
    return !!anPlayer;
  } catch (e) {
    console.error(e);
    return false;
  }
})();

export function TorrentiePageTsx() {
  const [rdApiKey, setRdApiKey] = useState(loadConfiguration.rdApiKey);

  const [providers, setProviders] = useState(
    torrentProviders.map((x) => ({
      ...x,
      checked: loadConfiguration.providers?.indexOf(x.id) !== -1,
    })),
  );

  const [sorting, setSorting] = useState<TorrentSorting>(
    loadConfiguration.sorting ?? 'seeder',
  );

  const [excludeKeywords, setExcludeKeywords] = useState(
    loadConfiguration.excludeKeywords?.join(',') ?? '',
  );

  const createConfig = useCallback(() => {
    const config: TorrentieExtractorConfig = {
      rdApiKey,
      sorting,
      providers: providers.filter((x) => x.checked).map((x) => x.id),
      excludeKeywords: excludeKeywords ? excludeKeywords.split(',') : undefined,
    };
    return config;
  }, [excludeKeywords, providers, rdApiKey, sorting]);

  const handleOnSave = useCallback(() => {
    const config = createConfig();
    saveConfiguration(config);
  }, [createConfig]);

  const handleOnDownload = useCallback(() => {
    const config = createConfig();

    const configuredPlugin = {
      ...TorrentiePlugin,
      config: JSON.stringify(config),
    };

    downloadJsonStringAsFile(
      JSON.stringify(configuredPlugin),
      'torrentie-ui-' + (rdApiKey ?? '') + '.json',
    );
  }, [createConfig, rdApiKey]);

  const handleOnInstall = useCallback(() => {
    const config = createConfig();

    const downloadUrl =
      'https://androidplayer1.github.io/tmdb-ui/assets/torrentie.json';

    const queryData = encodeQueryData({
      config: JSON.stringify(config),
      downloadUrl,
    });

    window.open(`anplayer://plugin/install?${queryData}`, '_blank');
  }, [createConfig]);

  return (
    <Container maxW="2xl" p="4">
      <VStack gap={4} alignItems="stretch">
        <Text fontSize="2xl" fontWeight="bold" mb="4">
          Configuration
        </Text>

        <Card.Root variant="outline">
          <Card.Header>
            <Card.Title>Providers</Card.Title>
          </Card.Header>

          <Card.Body>
            <Stack gap={2}>
              {providers.map((x) => (
                <Checkbox
                  key={x.id}
                  checked={x.checked}
                  onCheckedChange={({ checked }) => {
                    const newProviders = [...providers];
                    const index = newProviders.indexOf(x);
                    newProviders[index] = {
                      ...x,
                      checked: checked === true,
                    };
                    setProviders(newProviders);
                  }}
                >
                  {x.url}
                </Checkbox>
              ))}
            </Stack>
          </Card.Body>
        </Card.Root>

        <Card.Root variant="outline">
          <Card.Header>
            <Card.Title>Sorting</Card.Title>
          </Card.Header>
          <Card.Body>
            <RadioGroup.Root
              value={sorting}
              onValueChange={({ value }) => setSorting(value as TorrentSorting)}
            >
              <RadioGroup.Item value="quality_seeder">
                <RadioGroup.ItemControl />
                <RadioGroup.ItemText>Quality then seeder</RadioGroup.ItemText>
                <RadioGroup.ItemHiddenInput />
              </RadioGroup.Item>
              <RadioGroup.Item value="quality_size">
                <RadioGroup.ItemControl />
                <RadioGroup.ItemText>Quality then size</RadioGroup.ItemText>
                <RadioGroup.ItemHiddenInput />
              </RadioGroup.Item>
              <RadioGroup.Item value="seeder">
                <RadioGroup.ItemControl />
                <RadioGroup.ItemText>Seeder</RadioGroup.ItemText>
                <RadioGroup.ItemHiddenInput />
              </RadioGroup.Item>
              <RadioGroup.Item value="none">
                <RadioGroup.ItemControl />
                <RadioGroup.ItemText>None</RadioGroup.ItemText>
                <RadioGroup.ItemHiddenInput />
              </RadioGroup.Item>
            </RadioGroup.Root>
          </Card.Body>
        </Card.Root>

        <Card.Root variant="outline">
          <Card.Header>
            <Card.Title>Excluded Keywords (comma separated)</Card.Title>
          </Card.Header>
          <Card.Body>
            <Stack>
              <Field.Input
                placeholder="480p, BRRip ..."
                value={excludeKeywords}
                onChange={(e) => setExcludeKeywords(e.target.value)}
              />
              <Field.HelperText>
                Filter out all torrents that contain any of specified keywords
              </Field.HelperText>
            </Stack>
          </Card.Body>
        </Card.Root>

        <Card.Root variant="outline">
          <Card.Header>
            <Card.Title>Real Debrid API Key</Card.Title>
          </Card.Header>
          <Card.Body>
            <Stack>
              <Field.Input
                type="text"
                name="rdApiKey"
                value={rdApiKey}
                onChange={(e) => setRdApiKey(e.target.value)}
                placeholder="Enter your Real Debrid API key"
              />

              <Button variant="outline" asChild>
                <RouterLink
                  to="https://real-debrid.com/apitoken"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get key
                </RouterLink>
              </Button>

              <Field.HelperText mt="4" flex="1">
                Your Real Debrid API key is only stored on the device where the
                plugin is installed and is not shared or stored elsewhere.
              </Field.HelperText>
            </Stack>
          </Card.Body>
        </Card.Root>

        <HStack mt="4" gap="4">
          {isLoadedFromAnPlayer ? (
            <Button flex="1" onClick={handleOnSave}>
              Save
            </Button>
          ) : (
            <>
              <Button flex="1" variant="outline" onClick={handleOnDownload}>
                Download
              </Button>
              <Button flex="1" onClick={handleOnInstall}>
                Install
              </Button>
            </>
          )}
        </HStack>
      </VStack>
    </Container>
  );
}
