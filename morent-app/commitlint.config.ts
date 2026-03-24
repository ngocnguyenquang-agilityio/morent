import type { UserConfig } from '@commitlint/types';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(?:\[#[^\]]+\]\s)?(\w+)(?:\((.+)\))?:\s(.+)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
};

export default config;
