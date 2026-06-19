/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any other Next.js configurations here if you have them.
  // For example:
  // reactStrictMode: true,
  // experimental: {
  //   serverActions: true,
  // },

  // yahoo-finance2 is a server-side library that often breaks when bundled
  // due to its dynamic nature. Marking it as an external package ensures
  // it is loaded correctly by Node.js at runtime.
  serverExternalPackages: ['yahoo-finance2'],

  turbopack: {
    resolveAlias: {
      // Turbopack equivalent to ignore the Deno-specific testing utility
      // and mock-cache modules required by yahoo-finance2's test-only modules.
      // We point it to 'path' because Turbopack requires a string/target 
      // instead of a boolean to satisfy its configuration schema.
      '@std/testing/mock': 'path',
      '@std/testing/bdd': 'path',
      '@gadicc/fetch-mock-cache/runtimes/deno.ts': 'path',
      '@gadicc/fetch-mock-cache/stores/fs.ts': 'path',
    },
  },

  webpack: (config, { isServer }) => {
    // This plugin is used to ignore specific modules during the Webpack build process.
    // The yahoo-finance2 library includes a test-specific module (fetchCache.js)
    // that attempts to import a Deno-specific testing utility (@std/testing/mock).
    // By ignoring this specific import from createYahooFinance.js, we prevent
    // Webpack from trying to resolve the Deno module, as this code path is
    // typically not used in a production or standard development build.
    config.plugins.push(
      new (require('webpack').IgnorePlugin)({
        resourceRegExp: /^\.\.\/tests\/fetchCache\.js$/, // Matches the imported module path
        contextRegExp: /node_modules[\\/]yahoo-finance2[\\/]esm[\\/]src[\\/]createYahooFinance\.js$/, // Matches the context (importer) of the module
      })
    );

    return config;
  },
};

module.exports = nextConfig;