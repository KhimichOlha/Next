import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(
    {
        plugins: [tsconfigPaths(), react()],
        test: {
            globals: true,
            setupFiles: ['./setupTests.ts'],
            include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
            coverage: {
                enabled: true, 
                provider: 'v8',
                reporter: ['text', 'json', 'html'],
                reportsDirectory: './coverage',
                clean: true, 
                cleanOnRerun: true,
                thresholds: {
                    lines: 40,
                    functions: 40,
                    branches: 40,
                    statements: 40
                },
                exclude: [ 
                    '**/*.d.ts',
                    '**/*.stories.{js,jsx,ts,tsx}',
                    '**/*.config.{js,ts,mjs,mts}',
                    '**/setupTests.ts',
                    '**/main.{js,ts,jsx,tsx}',
                    '**/__mocks__/**',
                    '**/__test__/**',
                    '**/.next/**'
                ],
            },
            environment: 'jsdom',
        },
    }
)