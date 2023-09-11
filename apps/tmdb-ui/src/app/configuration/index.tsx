import {
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
} from '@chakra-ui/react';
import { RootRoute, Route } from '@tanstack/react-router';
import React, { useCallback, useState } from 'react';

import TmdbPlugin from '../../assets/tmdb.json';
import { downloadJsonStringAsFile, encodeQueryData } from '../../util';

function Configuration() {
  const [rdApiKey, setRdApiKey] = useState('');

  const handleApiKeyChange = useCallback((e: string) => {
    setRdApiKey(e);
  }, []);

  const handleOnDownload = useCallback(() => {
    const configuredPlugin = {
      ...TmdbPlugin,
      config: JSON.stringify({ rdApiKey: rdApiKey }),
    };

    downloadJsonStringAsFile(
      JSON.stringify(configuredPlugin),
      'tmdb-ui-' + (rdApiKey ?? '') + '.json'
    );
  }, [rdApiKey]);

  const handleOnInstall = useCallback(() => {
    const config = JSON.stringify({ rdApiKey: rdApiKey });
    const downloadUrl = 'https://androidplayer1.github.io/tmdb-ui/assets/tmdb.json';

    const queryData = encodeQueryData({
      config,
      downloadUrl,
    });

    window.open(`anplayer://plugin/install?${queryData}`, '_blank');
  }, [rdApiKey]);

  return (
    <Container>
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Configuration
      </Text>
      <FormControl id="rdApiKey">
        <FormLabel>Real Debrid API Key</FormLabel>
        <Input
          type="text"
          name="rdApiKey"
          value={rdApiKey}
          onChange={(e) => handleApiKeyChange(e.target.value)}
          placeholder="Enter your Real Debrid API key"
        />
      </FormControl>
      <HStack mt="4" gap="4">
        <Button colorScheme="blue" type="submit" onClick={handleOnDownload}>
          Download
        </Button>
        <Button colorScheme="brand" type="submit" onClick={handleOnInstall}>
          Install
        </Button>
      </HStack>
      <Text mt="4" fontSize="sm" color="gray.500">
        Your Real Debrid API key is only stored on the device where the plugin
        is installed and is not shared or stored elsewhere.
      </Text>
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
