import codspeedPlugin from '@codspeed/vitest-plugin';
import {coverageConfigDefaults, defineConfig} from 'vitest/config';

export default defineConfig({
  plugins: [codspeedPlugin()],
  test: {
    coverage: {
      provider: 'istanbul',
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**/*.bench.ts', // Ignore benchmarks
      ],
    },
  },
});
