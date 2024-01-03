import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { RootRoute, Route } from '@tanstack/react-router';
import React, { useCallback, useState } from 'react';

import TmdbPlugin from '../../assets/tmdb.json';
import { downloadJsonStringAsFile, encodeQueryData } from '../../util';

type TorrentSorting = 'none' | 'quality_seeder' | 'quality_size' | 'seeder';

type TmdbExtractorConfig = Readonly<{
  rdApiKey?: string;
  providers?: string[];
  sorting?: TorrentSorting;
  excludeKeywords?: string[];
  includePeopleOnFeed: boolean;
  includeTvShowsOnFeed: boolean;
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
    id: 'magnetdl',
    url: 'https://www.magnetdl.com',
  },
  {
    id: 'nyaa',
    url: 'https://nyaa.si',
  },
];

const loadConfiguration: TmdbExtractorConfig = (() => {
  try {
    return JSON.parse(anPlayer.getConfiguration()) as TmdbExtractorConfig;
  } catch (e) {
    console.error(e);
    return {
      rdApiKey: '',
      sorting: 'quality_seeder',
      providers: torrentProviders.map((x) => x.id),
      includePeopleOnFeed: true,
      includeTvShowsOnFeed: true,
    };
  }
})();

const saveConfiguration = (configuration: TmdbExtractorConfig) => {
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

function Configuration() {
  const [rdApiKey, setRdApiKey] = useState(loadConfiguration.rdApiKey);

  const [includePeopleOnFeed, setIncludePeopleOnFeed] = useState(
    loadConfiguration.includePeopleOnFeed
  );

  const [includeTvShowsOnFeed, setIncludeTvShowsOnFeed] = useState(
    loadConfiguration.includeTvShowsOnFeed
  );

  const [providers, setProviders] = useState(
    torrentProviders.map((x) => ({
      ...x,
      checked: loadConfiguration.providers?.indexOf(x.id) !== -1,
    }))
  );

  const [sorting, setSorting] = useState<TorrentSorting>(
    loadConfiguration.sorting ?? 'seeder'
  );

  const [excludeKeywords, setExcludeKeywords] = useState(
    loadConfiguration.excludeKeywords?.join(',') ?? ''
  );

  const createConfig = useCallback(() => {
    const config: TmdbExtractorConfig = {
      rdApiKey,
      sorting,
      providers: providers.filter((x) => x.checked).map((x) => x.id),
      excludeKeywords: excludeKeywords ? excludeKeywords.split(',') : undefined,
      includePeopleOnFeed,
      includeTvShowsOnFeed,
    };
    return config;
  }, [
    excludeKeywords,
    includePeopleOnFeed,
    includeTvShowsOnFeed,
    providers,
    rdApiKey,
    sorting,
  ]);

  const handleOnSave = useCallback(() => {
    const config = createConfig();
    saveConfiguration(config);
  }, [createConfig]);

  const handleOnDownload = useCallback(() => {
    const config = createConfig();

    const configuredPlugin = {
      ...TmdbPlugin,
      config: JSON.stringify(config),
    };

    downloadJsonStringAsFile(
      JSON.stringify(configuredPlugin),
      'tmdb-ui-' + (rdApiKey ?? '') + '.json'
    );
  }, [createConfig, rdApiKey]);

  const handleOnInstall = useCallback(() => {
    const config = createConfig();

    const downloadUrl =
      'https://androidplayer1.github.io/tmdb-ui/assets/tmdb.json';

    const queryData = encodeQueryData({
      config: JSON.stringify(config),
      downloadUrl,
    });

    window.open(`anplayer://plugin/install?${queryData}`, '_blank');
  }, [createConfig]);

  return (
    <Container p="4">
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold" mb="4">
          Configuration
        </Text>

        <FormControl id="providers">
          <FormLabel>Providers</FormLabel>
          <Stack spacing={2} direction="column">
            {providers.map((x) => (
              <Checkbox
                key={x.id}
                isChecked={x.checked}
                onChange={(e) => {
                  const newProviders = [...providers];
                  const index = newProviders.indexOf(x);
                  newProviders[index] = {
                    ...x,
                    checked: e.target.checked,
                  };
                  setProviders(newProviders);
                }}
              >
                {x.url}
              </Checkbox>
            ))}
          </Stack>
        </FormControl>

        <FormControl id="sorting">
          <FormLabel>Providers</FormLabel>
          <RadioGroup
            onChange={(e) => setSorting(e as TorrentSorting)}
            value={sorting}
          >
            <Stack spacing={2} direction="column">
              <Radio value="quality_seeder">Quality then seeder</Radio>
              <Radio value="quality_size">Quality then size</Radio>
              <Radio value="seeder">Seeder</Radio>
              <Radio value="none">None</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl id="excludeKeywords">
          <FormLabel>Excluded Keywords (comma separated)</FormLabel>
          <RadioGroup
            onChange={(e) => setSorting(e as TorrentSorting)}
            value={sorting}
          >
            <Input
              placeholder="480p, BRRip ..."
              value={excludeKeywords}
              onChange={(e) => setExcludeKeywords(e.target.value)}
            />
          </RadioGroup>

          <Text mt="4" fontSize="sm" color="gray.500">
            Filter out all torrents that contain any of specified keywords
          </Text>
        </FormControl>

        <FormControl id="feeds">
          <FormLabel>Feed</FormLabel>
          <Stack spacing={2} direction="column">
            <Checkbox
              isChecked={includeTvShowsOnFeed}
              onChange={(e) => setIncludeTvShowsOnFeed(e.target.checked)}
            >
              TV Shows
            </Checkbox>

            <Checkbox
              isChecked={includePeopleOnFeed}
              onChange={(e) => setIncludePeopleOnFeed(e.target.checked)}
            >
              People
            </Checkbox>
          </Stack>

          <Text mt="4" fontSize="sm" color="gray.500">
            Select what content to be shown on feeds
          </Text>
        </FormControl>

        <FormControl id="rdApiKey">
          <FormLabel>Real Debrid API Key</FormLabel>
          <Input
            type="text"
            name="rdApiKey"
            value={rdApiKey}
            onChange={(e) => setRdApiKey(e.target.value)}
            placeholder="Enter your Real Debrid API key"
          />

          <HStack gap="4">
            <Text mt="4" fontSize="sm" color="gray.500">
              Your Real Debrid API key is only stored on the device where the
              plugin is installed and is not shared or stored elsewhere.
            </Text>

            <Button
              variant="link"
              colorScheme="facebook"
              as={Link}
              href="https://real-debrid.com/apitoken"
              isExternal
            >
              Get key
            </Button>
          </HStack>
        </FormControl>

        <HStack mt="4" gap="4">
          {isLoadedFromAnPlayer ? (
            <Button colorScheme="blue" type="submit" onClick={handleOnSave}>
              Save
            </Button>
          ) : (
            <>
              <Button
                colorScheme="blue"
                type="submit"
                onClick={handleOnDownload}
              >
                Download
              </Button>
              <Button
                colorScheme="brand"
                type="submit"
                onClick={handleOnInstall}
              >
                Install
              </Button>
            </>
          )}
        </HStack>
      </VStack>
    </Container>
  );
}

export function getConfigurationRoute(root: RootRoute) {
  return new Route({
    path: '/configuration',
    getParentRoute: () => root,
    component: Configuration,
  });
}
