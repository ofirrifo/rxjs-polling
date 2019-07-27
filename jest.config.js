module.exports = {
  preset: "jest-preset-angular",
  roots: ['projects/rxjs-polling/src'],
  setupFilesAfterEnv: ['<rootDir>/projects/rxjs-polling/src/setup-jest.ts'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/projects/rxjs-polling/tsconfig.spec.json'
    },
  },
};

