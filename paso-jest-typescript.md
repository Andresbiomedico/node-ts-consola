# Pasos para usar Jest con TypeScript 



1. Instalaciones de desarrollo (super test es útil para probar Express)
```
npm install -D jest @types/jest ts-jest supertest
```
2. Crear archivo de configuración de Jest
```
npx jest --init
```

3. En el archivo jest.config.js configurar
```
preset: 'ts-jest',
testEnvironment: "jest-environment-node",
// Opcional - The paths to modules that run some
// code to configure or set up the testing
// environment before each test
// setupFiles: ['dotenv/config'],
```

4. Crear scripts en el package.json
```
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage",
```

4. para realizar debug de los test
CTRL SHIFT P
elegimos debug npm script 
elecjimos test:watch