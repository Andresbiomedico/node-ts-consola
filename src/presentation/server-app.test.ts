import { SERVFAIL } from 'dns';
import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { ServerApp } from './server-app';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

describe('Server App', () => {
    const options = {
        base: 5,
        limit: 10,
        showTable: false,
        fileName: 'test-filename',
        fileDestination: 'test-destinantion'
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create ServerApp instance', () => {

        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });

    test('should run ServerApp with values', () => {
        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');
        
        ServerApp.run(options);
        expect(logSpy).toHaveBeenCalledTimes(3);
        expect(logSpy).toHaveBeenCalledWith('Server running...');
        expect(logSpy).toHaveBeenCalledWith('file created!');

        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({base: options.base, limit: options.limit});

        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName
        });
    });
    test('should run  with custom values mocked', () => {
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 1 = 1');
        const saveFileMock = jest.fn().mockReturnValue(true);

        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;
        console.log = logMock;
        console.error = logErrorMock;

        ServerApp.run(options);   

        expect(logMock).toHaveBeenCalledWith('Server running...');
        expect(createMock).toHaveBeenCalledWith({base: options.base, limit: options.limit});
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: '1 x 1 = 1',
            fileDestination: options.fileDestination,
            fileName: options.fileName  
        });
        expect(logMock).toHaveBeenCalledWith('file created!');
        expect(logErrorMock).not.toHaveBeenCalled();
    });
})
