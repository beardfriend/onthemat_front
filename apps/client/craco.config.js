const path = require('path');
module.exports = {
    webpack: {
        alias: {
            '@Features': path.resolve(__dirname, 'src/features'),
            '@Shared': path.resolve(__dirname, 'src/shared'),
            '@Assets': path.resolve(__dirname, 'src/assets'),
            '@Libs': path.resolve(__dirname, '../../src/libs')
        }
    }
};
