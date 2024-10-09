// process.argv = ['node', 'app.ts', '-b', '5', '-l', '10', '-s', '-n', 'table'];
// import './app';

import { Server } from "http";
import { ServerApp } from './presentation/server-app';

describe('Test App.ts', () => {
    
    test('should call server.run with values', async() => {
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;

        process.argv = ['node', 'app.ts', '-b', '5', '-l', '10', '-s', '-n', 'table', '-d', 'outputs'];

        await import('./app');

        expect(serverRunMock).toHaveBeenCalledWith(
            { base: 5,
             limit: 10, 
             showTable: true, 
             fileName: 'table', 
             fileDestination: 'outputs' 
            });
    });
});


