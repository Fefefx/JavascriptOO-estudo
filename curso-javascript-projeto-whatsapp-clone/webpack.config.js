// Requere o módulo path para evitar que o node se perca ao gerar o output do bundle dos arquivos js
const path = require('path');

module.exports = {
    entry: {
        app: './src/app.js',
        'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname,'dist'),
        publicPath: 'dist'
    }
}