let fs = require('fs'),
    commonPath = require('./commonPath'),
    webpack = require('webpack'),
    config = require('./webpack.prod.conf');


webpack(config, function (err, stats) {
    // show build info to console
    console.log(stats.toString({chunks: false, color: true}));

    // save build info to file
    fs.writeFile(
        commonPath.path.join(commonPath.dist, '__build_info__'),
        stats.toString({color: false})
    );
});
