// import yarg from 'yargs';

const runCommand = async(args:string[]) => {
    process.argv = [ ...process.argv, ...args];
    const {yarg}= await import('./yargs.plugin');
    return yarg
}
describe('Test yarggs.plugin.ts', () => {
    const originalArgv = process.argv;
    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    })
    test('should return default values', async () => {
        const argv = await runCommand(['-b', '5'])
        expect(argv.b).toBe(5)
        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'table',
        }))
    })
    test('should return configuration with customvalues', async () => {
        const argv = await runCommand(['-b', '5', '-l', '20', '-s', '-n', 'table'])
        expect(argv.b).toBe(5)
        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 20,
            s: true,
            n: 'table',
        }))
    })
});