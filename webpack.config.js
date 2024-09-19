const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        globalObject: 'this',
        publicPath: '/images/',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx'],
    },
    externals: {
        react: 'react',
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg|mp3)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 50000,
                            name: '[name].[ext]',
                            outputPath: 'images/',
                            publicPath: '/images/',
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(ts|tsx)?$/i,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
        ],
    },
};