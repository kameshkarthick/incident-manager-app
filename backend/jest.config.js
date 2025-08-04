module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './src',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  setupFiles: ['dotenv/config'],
};