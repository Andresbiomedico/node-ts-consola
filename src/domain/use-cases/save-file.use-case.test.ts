import { SaveFile } from './save-file.use-case';
import fs, { mkdir, write } from 'fs';
import exp from 'constants';

describe('SaveFileUseCase', () => {

    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs',
        fileName: 'custom-table-name'
    }
    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;
    // limpiar el directorio antes de cada prueba eliminar antes y despues el archivo
    beforeEach(() => {
        fs.rmSync('outputs', { recursive: true, force: true });
        fs.rmSync(customOptions.fileDestination, { recursive: true, force: true });
        // limpiar todos los mocks
        jest.clearAllMocks;
    });

    afterEach(() => {
        fs.rmSync('outputs', { recursive: true, force: true });
        fs.rmSync(customOptions.fileDestination, { recursive: true, force: true });
    });


    test('should save file with default values', () => {
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'test content',

        }
        const result = saveFile.execute(options);
        // se evalua que el archivo se haya creado
        expect(result).toBe(true);

        // se evalua que el archivo exista
        const checkFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, 'utf8');

        expect(checkFile).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    });

    test('should save file with custom values', () => {
        const saveFile = new SaveFile();

        const result = saveFile.execute(customOptions);
        // se evalua que el archivo se haya creado
        expect(result).toBe(true);

        // se evalua que el archivo exista
        const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;
        const checkFile = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, 'utf8');

        expect(checkFile).toBe(true);
        expect(fileContent).toBe(customOptions.fileContent);
    });

    test('should return false if directory could not be created', () => {
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
            throw new Error('this is a custom error mesagge from testing');
        });
        const result = saveFile.execute(customOptions);
       
        // se evalua que el archivo se haya creado
        expect(result).toBe(false);
        // limpia el mock
        mkdirSpy.mockRestore();

    });
    test('should return false if file could not be created', () => {

        const saveFile = new SaveFile();
        const writeFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
            throw new Error('this is a custom  writing error mesagge from testing');
        });
        const result = saveFile.execute({fileContent:'hola'});
       
        // se evalua que el archivo se haya creado
        expect(result).toBe(false);

        writeFileSync.mockRestore();

    });
})