module.exports = {
  roots: ['src/'],
  collectCoverageFrom: ['<rootDir/src/**/*.ts>'],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    '.+\\.ts$': 'ts-jest',
  }
 
};