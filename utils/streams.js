import fs from 'fs';
import path from 'path';
import program from 'commander';
import csvjson from 'csvjson';
import through from 'through2';
import concat from 'concat';

/**
 * usage:
 * npx babel-node ./utils/streams -a reverse
 * npx babel-node ./utils/streams -a transform
 * npx babel-node ./utils/streams -a outputFile -f ./data/products_data1.csv
 * npx babel-node ./utils/streams -a convertFromFile -f ./data/products_data1.csv
 * npx babel-node ./utils/streams -a convertToFile -f ./data/products_data1.csv
 * npx babel-node ./utils/streams -a cssBundler -l ./css
 */
class Streams {
    constructor() {
        program.option('-a, --action <actionName>', 'takes an action name - reverse|transform|outputFile|convertFromFile|convertToFile|cssBundler')
            .option('-f, --file <csvFilePath>', 'path of the CSV file to transform')
            .option('-l, --location <cssFolderPath>', 'path of folder consisting of css files')
            .parse(process.argv);
        this.doAction();
    }

    doAction() {
        try {
            if (process.argv.length < 3) {
                program.help()
            } else if (process.argv.indexOf('-h') === 2 || process.argv.indexOf('--help') === 2) {
                process.exit(0);
            } else {
                if (!!program.action) {
                    switch (program.action) {
                        case 'reverse':
                            this.reverse();
                            break;
                        case 'transform':
                            this.transform();
                            break;
                        case 'outputFile':
                            this.outputFile(program.file);
                            break;
                        case 'convertFromFile':
                            this.convertFromFile(program.file);
                            break;
                        case 'convertToFile':
                            this.convertToFile(program.file);
                            break;
                        case 'cssBundler':
                            this.cssBundler(program.location);
                            break;
                        default:
                            console.error('Invalid action or argument.');
                            program.help();
                            process.exit(1);
                            break;
                    }
                } else {
                    console.error(`Invalid argument.`);
                    console.log(`Usage: `);
                    program.help();
                    process.exit(1);
                }
            }
        } catch (error) {
            console.error(`An error occured: ${error}`);
            process.exit(1);
        }
    }

    reverse() {
        process.stdout.write('Enter a string: ');
        process.stdin.on('data', function (str) {
            process.stdout.write(`Reverse of ${str.toString()} is: ${str.toString().split("").reverse().join("")} \n`);
        });
    }

    transform() {
        process.stdout.write('Enter a string: ');
        let transToUpperCase = function (str, encoding, next) {
            this.push(`Uppercase of ${str.toString()} is: ${str.toString().toUpperCase()} \n`);
            next();
        }
        process.stdin
            .pipe(through(transToUpperCase))
            .pipe(process.stdout);
    }

    outputFile(filePath) {
        this.validateFilePath(filePath);
        let readableStream = fs.createReadStream(filePath);
        readableStream.pipe(process.stdout);
    }

    convertFromFile(filePath) {
        this.validateFilePath(filePath);
        let readableStream = fs.createReadStream(filePath);
        let toObject = csvjson.stream.toObject();
        let stringify = csvjson.stream.stringify();
        readableStream.pipe(toObject).pipe(stringify).pipe(process.stdout);
    }

    convertToFile(filePath) {
        this.validateFilePath(filePath);
        let readableStream = fs.createReadStream(filePath);
        let writableStream = fs.createWriteStream(filePath.replace('.csv', '.json'));
        let toObject = csvjson.stream.toObject();
        let stringify = csvjson.stream.stringify();
        readableStream.pipe(toObject).pipe(stringify).pipe(writableStream);
    }

    cssBundler(directoryPath) {
        const fullPath = path.join(__dirname, '..', directoryPath);
        const cssBundleFile = path.join(fullPath, 'bundle.css');
        if (fs.existsSync(cssBundleFile)) {
            fs.unlinkSync(cssBundleFile);
        }
        const cssFiles = fs.readdirSync(fullPath).map(file => path.join(fullPath, file));
        let cdnClass = `
                        .cdnClass 
                        {
                            width: 25%;
                            height: 75%;
                        }`;
        concat(cssFiles, cssBundleFile).then(() => {
            fs.appendFileSync(cssBundleFile, cdnClass, 'utf-8');
        });
    }

    validateFilePath(filePath){
        if (!fs.existsSync(filePath)) {
            throw (filePath + " is not a valid file path");
        }
    }
}

export default new Streams();