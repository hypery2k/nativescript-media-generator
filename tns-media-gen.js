#!/usr/bin/env node

"use strict";

var gm = require('gm').subClass({ imageMagick: true }),
    mkdirp = require('mkdirp'),
    path = require('path'),
    fs = require('fs'),
    screenshots = require('./screenshots'),
    q = require('q'),
    resize = require('./lib/resize'),
    generateImageSets = require('./lib/generate_image_sets'),
    generateIconSets = require('./lib/generate_icon_sets'),
    storeImagesGenerator = require('./lib/store_images'),
    splashImagesGenerator = require('./lib/splash_images'),
    config,
    mediaPath;


function generate() {
    var deferred = q.defer();

    fs.readdir(path.join(process.cwd(), "app", "App_Resources", "iOS"), function(err, result) { /*eslint complexity: [error, 55]*/

        if (err) {
            throw err;
        } else {

            if (!config && config.image) config.image = {
                filename: "./icon.png"
            };

            var storeImages = storeImagesGenerator(config, mediaPath),
                splashImages = splashImagesGenerator(config, mediaPath),
                images = generateIconSets('icon.png', process.argv[2] || config.icon || config.image, 'AppIcon.appiconset')
                // .concat(storeImages) // FIXME allow skip of store image
                .concat(splashImages);

            if (config.screenshots && config.screenshots.length) {
                screenshots.pages = config.screenshots;
            }


            if (config.images) {
                config.images.forEach(function(item) {
                    var additionalImages = generateImageSets(item.alias ? item.alias : item.filename, { filename: item.filename });
                    additionalImages.forEach(function(additionalImage) {
                        images.push(additionalImage);
                    });
                });
            }

            if (config.customImages) {
                config.customImages.forEach(function(item) {
                    images.push(item);
                });
            }


            if (!process.argv[2] && !config.image && (!config.icon && !config.splash)) {
                console.log('You must specify a filename as the second argument, or in a config file');
            } else if (!process.argv[3] && !config.background && (!config.icon && !config.splash)) {
                console.log("Please specify a background colour in hex values as the third argument, or in a config file");
            } else {

                var totalImages = images.length + (screenshots.pages.length * screenshots.screenshots.length);
                console.log("------------------------------");
                console.log("   nativescript-media-generator");
                console.log("------------------------------");
                console.log("Generating " + totalImages + " images so you don't have to");
                console.log("------------------------------");
                screenshots.generateAll();
                images.forEach(function(image) {
                    var background, sourceImage;
                    if (process.argv[2]) {
                        /*
                         Legacy Configuration
                         */
                        if (process.argv[3]) {
                            background = process.argv[3];
                        } else {
                            background = config.background;
                        }
                        if (process.argv[2]) {
                            sourceImage = process.argv[2];
                        } else {
                            sourceImage = config.image;
                        }
                    } else {
                        if (image.source) {
                            sourceImage = image.source.filename;
                            background = image.source.background;
                        }
                    }
                    if (sourceImage) {
                        resize(image.width, image.height, '#' + background, sourceImage, image.filename, image.path);

                    }
                });
                deferred.resolve();
            }
        }
    });
    return deferred.promise;
}

function genConfig() {
    var deferred = q.defer();
    var destFile = path.join(process.cwd(), "mediagen-config.json");

    fs.writeFile(destFile, JSON.stringify({
        "icon": { "filename": "icon.png", "background": "fff" },
        "splash": { "filename": "splash.png", "background": "fff" },
        "customImages": [{
            "width": 120,
            "height": 120,
            "path": "../../" + mediaPath + "/custom",
            "filename": "outputFilename.png",
            "source": { "filename": "image.png", "background": "fff" }
        }],
        "screenshots": [{ "url": "http://www.google.com", "name": "homepage" }]
    }, null, 4), function() {
        deferred.resolve("success");
    });
    console.log("Created `mediagen-config.json` file in the current directory.");
    return deferred.promise;
}

try { /*eslint global-require: off*/
    config = require(process.cwd() + "/mediagen-config");
    mediaPath = config.mediaPath || 'Media';
} catch (e) {
    if (process.argv[2] !== "init") {
        console.log("Could not find configuration file. To create one run `$ mediagen init`");
    }
}

switch (process.argv[2]) {
    case "init":
        genConfig();
        break;
    default:
        generate();
}

module.exports = {
    __resize: resize,
    __generate: generate,
    __genConfig: genConfig
};