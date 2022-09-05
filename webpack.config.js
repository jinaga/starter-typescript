const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // Inputs
    entry: {
        index: "./src/client/index.ts"
    },
    resolve: {
        extensions: [".js", ".ts", ".scss"],
        alias: {
            "@shared": path.resolve(__dirname, "./src/shared"),
        }
    },

    // Processing
    mode: "production",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./views/index.html",
            publicPath: "/scripts/",
            filename: "../server/[name].html",
        }),
    ],
    module: {
        rules: [{
            test: /\.ts$/,
            loader: "ts-loader",
            include: [
                path.resolve(__dirname, "./src/client"),
                path.resolve(__dirname, "./src/shared")
            ],
            exclude: [/node_modules/]
        },
        {
            test: /\.(scss|css)$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
            test: /\.js$/,
            enforce: "pre",
            use: ["source-map-loader"]
        }]
    },

    // Outputs
    output: {
        filename: "[name]-[contenthash].js",
        path: path.resolve(__dirname, "dist", "scripts"),
    },
    devtool: "source-map",
};