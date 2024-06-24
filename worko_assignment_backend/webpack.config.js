const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => {
  const mode = argv.mode || 'production';

  return {
    mode: mode, // Set mode to 'development' or 'production' based on the CLI argument
    entry: './config/index.js', // Replace with the entry point of your app
    target: 'node', // Indicate that we are building for Node.js
    externals: [nodeExternals()], // Exclude Node.js modules from the bundle
    output: {
      path: path.resolve(__dirname, 'dist'), // Output directory
      filename: 'bundle.js', // Output file name
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader', // Transpile JavaScript files using Babel
            options: {
              presets: ['@babel/preset-env'], // Use the env preset
            },
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js'],
    },
  };
};
