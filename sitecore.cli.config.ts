import { defineCliConfig } from '@sitecore-content-sdk/nextjs/config-cli';
import {
  generateSites,
  generateMetadata,
  writeImportMap,
} from '@sitecore-content-sdk/nextjs/tools';
import scConfig from './sitecore.config';

export default defineCliConfig({
  build: {
    commands: [
      generateMetadata(),
      generateSites({
        scConfig,
      }),
      writeImportMap({
        paths: ['src/components'],
        scConfig,
      }),
    ],
  },
  componentMap: {
    paths: ['src/components'],
    exclude: ['src/components/content-sdk/*'],
  },
});
