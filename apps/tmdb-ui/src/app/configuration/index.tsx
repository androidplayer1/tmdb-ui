import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { RootRoute, Route } from '@tanstack/react-router';
import React, { FormEvent, useState } from 'react';

function Configuration() {
  const [rdApiKey, setRdApiKey] = useState('');

  const handleApiKeyChange = (e: string) => {
    setRdApiKey(e);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can handle the API key submission logic here
    // For demonstration purposes, we'll just log it
    console.log('Real Debrid API Key:', rdApiKey);
  };

  return (
    <Container>
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Configuration
      </Text>
      <form onSubmit={handleSubmit}>
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
        <Button mt="4" colorScheme="brand" type="submit">
          Install
        </Button>
      </form>
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
