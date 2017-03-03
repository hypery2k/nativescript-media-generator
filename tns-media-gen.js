#!/usr/bin/env node

"use strict";

var gm = require('gm').subClass({ imageMagick: true }),
    mkdirp = require('mkdirp'),
    path = require('path'),
    fs = require('fs'),
    screenshots = require('./screenshots'),
    q = require('q'),
    config,
    mediaPath;

function resize(width, height, bgColour, imagePath, outputFilename, outputPath) {
    var deferred = q.defer(),
        filepath = path.join(process.cwd(), imagePath);
    gm(filepath).size(function(error, size) {

        if (error) {
            console.error("GM Error", error);
            deferred.reject(error);
        } else {

            // current image size
            var imageWidth = size.width;
            var imageHeight = size.height;
            var ratio = width / height,
                imageRatio = imageWidth / imageHeight;
            var image = this;

            if (!isNaN(parseFloat(width))) {
                var percentage = '' + width;
                width = imageWidth * (parseInt(percentage.substring(0, percentage.indexOf("%")), 0) / 100);
            }
            // center placement
            if (ratio >= 1) {
                //Landscape or square
                var newWidth = height * imageRatio;

                if (newWidth >= width) {
                    this.resize(width);
                } else {
                    this.resize(null, height);
                }


            } else {
                var newHeight = width / imageRatio;

                if (newHeight >= height) {
                    this.resize(null, height);
                } else {
                    this.resize(width);
                }

            }

            var x = (width / 2) - (imageWidth / 2);
            var y = (height / 2) - (imageHeight / 2);

            mkdirp(path.join(process.cwd(), "app", "App_Resources", outputPath), function() {
                image.background(bgColour)
                    .gravity('Center')
                    .extent(width, height)
                    .write(path.join(process.cwd(), "app", "App_Resources", outputPath, outputFilename), function(error) {
                        if (error) {
                            console.error("Write file error", error);
                            deferred.reject(error);
                        } else {
                            console.log(this.outname);
                            deferred.resolve(this.outname);
                        }
                    });
            });
        }

    });
    return deferred.promise;
}

function generateIconSets(filename, source, iOSPath) { /*eslint complexity: [error, 22]*/
    return [
        //IOS Icons
        {
            width: 180,
            height: 180,
            path: 'iOS/Assets.xcassets' + (iOSPath ? '/' + iOSPath : ''),
            filename: filename.replace('.', '-60@3x.'),
            source: source
        }, {
            width: 120,
            height: 120,
            path: 'iOS/Assets.xcassets' + (iOSPath ? '/' + iOSPath : ''),
            filename: filename.replace('.', '-60@2x.'),
            source: source
        }, {
            width: 40,
            height: 40,
            path: 'iOS/Assets.xcassets' + (iOSPath ? '/' + iOSPath : ''),
            filename: filename.replace('.', '-40.'),
            source: source
        }, {
            width: 80,
            height: 80,
            path: 'iOS/Assets.xcassets' + (iOSPath ? '/' + iOSPath : ''),
            filename: filename.replace('.', '-40@2x.'),
            source: source
        }, {
            width: 120,
            height: 120,
            path: 'iOS/Assets.xcassets' + (iOSPath ? '/' + iOSPath : ''),
            filename: filename.replace('.', '-40@3x.'),
            source: source
        }, {
            width: 50,
            height: 50,
            path: 'iOS/Assets.xcassets' + (iOSPath ? '/' + iOSPath : ''),
            filename: filename.replace('.', '-50.'),
            source: source
        }, {
            width: 100,
            height: 100,
            path: 'iOS/Assets.xcassets' + (iOSPath ? '/' + iOSPath : ''),
            filename: filename.replace('.', '-50@2x.'),
            source: source
        }, {
            width: 60,
            height: 60,
            path: 'iOS/Assets.xcassets' + (iOSPath ? '/' + iOSPath : ''),
            filename: filename.replace('.', '-60.'),
            source: source
        }, {
            width: 72,
            height: 72,
            path: 'iOS/Assets.xcassets' + (iOSPath ? '/' + iOSPath : ''),
            filename: filename.replace('.', '-72.'),
            source: source
        }, {
            width: 144,
            height: 144,
            path: 'iOS/Assets.xcassets' + (iOSPath ? '/' + iOSPath : ''),
            filename: filename.replace('.', '-72@2x.'),
            source: source
        }, {
            width: 76,
            height: 76,
            path: 'iOS/Assets.xcassets' + (iOSPath ? '/' + iOSPath : ''),
            filename: filename.replace('.', '-76.'),
            source: source
        }, {
            width: 152,
            height: 152,
            path: 'iOS/Assets.xcassets' + (iOSPath ? '/' + iOSPath : ''),
            filename: filename.replace('.', '-76@2x.'),
            source: source
        }, {
            width: 167,
            height: 167,
            path: 'iOS/Assets.xcassets' + (iOSPath ? '/' + iOSPath : ''),
            filename: filename.replace('.', '-83.5@2x.'),
            source: source
        }, {
            width: 120,
            height: 120,
            path: 'iOS/Assets.xcassets' + (iOSPath ? '/' + iOSPath : ''),
            filename: filename.replace('.', '-120.'),
            source: source
        }, {
            width: 29,
            height: 29,
            path: 'iOS/Assets.xcassets' + (iOSPath ? '/' + iOSPath : ''),
            filename: filename.replace('.', '-29.'),
            source: source
        }, {
            width: 58,
            height: 58,
            path: 'iOS/Assets.xcassets' + (iOSPath ? '/' + iOSPath : ''),
            filename: filename.replace('.', '-29@2x.'),
            source: source
        }, {
            width: 87,
            height: 87,
            path: 'iOS/Assets.xcassets' + (iOSPath ? '/' + iOSPath : ''),
            filename: filename.replace('.', '-29@3x.'),
            source: source
        }, {
            width: 57,
            height: 57,
            path: 'iOS/Assets.xcassets' + (iOSPath ? '/' + iOSPath : ''),
            filename: filename.replace('.', '-57.'),
            source: source
        }, {
            width: 114,
            height: 114,
            path: 'iOS/Assets.xcassets' + (iOSPath ? '/' + iOSPath : ''),
            filename: filename.replace('.', '-57@2x.'),
            source: source
        },

        //Android
        {
            width: 72,
            height: 72,
            path: "Android/drawable-hdpi",
            filename: filename,
            source: source
        }, {
            width: 48,
            height: 48,
            path: "Android/drawable-mdpi",
            filename: filename,
            source: source
        }, {
            width: 96,
            height: 96,
            path: "Android/drawable-xhdpi",
            filename: filename,
            source: source
        }, {
            width: 144,
            height: 144,
            path: "Android/drawable-xxhdpi",
            filename: filename,
            source: source
        }, {
            width: 345,
            height: 345,
            path: "Android/drawable-xxxhdpi",
            filename: filename,
            source: source
        }

    ]
}

function generateImageSets(filename, source, iOSPath) { /*eslint complexity: [error, 22]*/
    return [
        //IOS Images
        {
            width: "24.5%", // max 466
            path: 'iOS',
            filename: filename,
            source: source
        }, {
            width: "49%", // max 932
            path: 'iOS',
            filename: filename.replace('.', '@2x.'),
            source: source
        }, {
            width: "73.6%", // max 1398
            path: 'iOS',
            filename: filename.replace('.', '@3x.'),
            source: source
        },

        //Android
        {
            width: "75%", // max 1425
            path: "Android/drawable-hdpi",
            filename: filename,
            source: source
        }, {
            width: "50%", // max 950
            path: "Android/drawable-mdpi",
            filename: filename,
            source: source
        }, {
            width: "100%", // max 1900
            path: "Android/drawable-xhdpi",
            filename: filename,
            source: source
        }, {
            width: "70%", // max 1331
            path: "Android/drawable-xxhdpi",
            filename: filename,
            source: source
        }, {
            width: "93.4%", // max 1775
            path: "Android/drawable-xxxhdpi",
            filename: filename,
            source: source
        }

    ]
}

function generate() {
    var deferred = q.defer();

    fs.readdir(path.join(process.cwd(), "app", "App_Resources", "iOS"), function(err, result) { /*eslint complexity: [error, 55]*/

        if (err) {
            throw err;
        } else {

            if (!config && config.image) config.image = {
                filename: "./icon.png"
            };

            var storeImages = [
                    //Android Store Icons
                    {
                        width: 512,
                        height: 512,
                        path: "../../" + mediaPath + "/android/store",
                        filename: "512.png",
                        source: process.argv[2] || config.icon || config.image
                    }, {
                        width: 1024,
                        height: 500,
                        path: "../../" + mediaPath + "/android/store",
                        filename: "1024x500.png",
                        source: process.argv[2] || config.splash || config.image
                    }, {
                        width: 180,
                        height: 120,
                        path: "../../" + mediaPath + "/android/store",
                        filename: "180x120.png",
                        source: process.argv[2] || config.splash || config.image
                    },

                    //Apple store icons
                    {
                        width: 1024,
                        height: 1024,
                        path: "../../" + mediaPath + "/ios/store",
                        filename: "1024x1024-AppIcon.jpg",
                        source: process.argv[2] || config.icon || config.image
                    }
                ],
                splashImages = [
                    //iOS Splash
                    {
                        width: 640,
                        height: 1136,
                        path: "iOS/Assets.xcassets/LaunchImage.launchimage",
                        filename: "Default-568h@2x.png",
                        source: process.argv[2] || config.splash || config.image
                    }, {
                        width: 1024,
                        height: 768,
                        path: "iOS/Assets.xcassets/LaunchImage.launchimage",
                        filename: "Default-Landscape.png",
                        source: process.argv[2] || config.splash || config.image
                    }, {
                        width: 1536,
                        height: 2048,
                        path: "iOS/Assets.xcassets/LaunchImage.launchimage",
                        filename: "Default-Portrait@2x.png",
                        source: process.argv[2] || config.splash || config.image
                    }, {
                        width: 768,
                        height: 1024,
                        path: "iOS/Assets.xcassets/LaunchImage.launchimage",
                        filename: "Default-Portrait.png",
                        source: process.argv[2] || config.splash || config.image
                    }, {
                        width: 640,
                        height: 960,
                        path: "iOS/Assets.xcassets/LaunchImage.launchimage",
                        filename: "Default@2x.png",
                        source: process.argv[2] || config.splash || config.image
                    }, {
                        width: 320,
                        height: 480,
                        path: "iOS/Assets.xcassets/LaunchImage.launchimage",
                        filename: "Default.png",
                        source: process.argv[2] || config.splash || config.image
                    }, {
                        width: 750,
                        height: 1344,
                        path: "iOS/Assets.xcassets/LaunchImage.launchimage",
                        filename: "Default-667h.png",
                        source: process.argv[2] || config.splash || config.image
                    }, {
                        width: 1242,
                        height: 2208,
                        path: "iOS/Assets.xcassets/LaunchImage.launchimage",
                        filename: "Default-736h.png",
                        source: process.argv[2] || config.splash || config.image
                    }, {
                        width: 2208,
                        height: 1242,
                        path: "iOS/Assets.xcassets/LaunchImage.launchimage",
                        filename: "Default-Landscape-736h.png",
                        source: process.argv[2] || config.splash || config.image
                    }, {
                        width: 768,
                        height: 1024,
                        path: "iOS/Assets.xcassets/LaunchScreen.AspectFill.imageset",
                        filename: "LaunchScreen-AspectFill.png",
                        source: process.argv[2] || config.splash || config.image
                    }, {
                        width: 1536,
                        height: 2048,
                        path: "iOS/Assets.xcassets/LaunchScreen.AspectFill.imageset",
                        filename: "LaunchScreen-AspectFill@2x.png",
                        source: process.argv[2] || config.splash || config.image
                    }, {
                        width: 384,
                        height: 512,
                        path: "iOS/Assets.xcassets/LaunchScreen.Center.imageset",
                        filename: "LaunchScreen-Center.png",
                        source: process.argv[2] || config.splash || config.image
                    }, {
                        width: 768,
                        height: 1024,
                        path: "iOS/Assets.xcassets/LaunchScreen.Center.imageset",
                        filename: "LaunchScreen-Center@2x.png",
                        source: process.argv[2] || config.splash || config.image
                    },
                    // Android
                    {
                        width: 480,
                        path: "Android/drawable-mdpi",
                        filename: "splash.png",
                        source: process.argv[2] || config.splash || config.image
                    },
                    {
                        width: 800,
                        path: "Android/drawable-hdpi",
                        filename: "splash.png",
                        source: process.argv[2] || config.splash || config.image
                    }, {
                        width: 960,
                        path: "Android/drawable-xhdpi",
                        filename: "splash.png",
                        source: process.argv[2] || config.splash || config.image
                    }, {
                        width: 1600,
                        path: "Android/drawable-xxhdpi",
                        filename: "splash.png",
                        source: process.argv[2] || config.splash || config.image
                    }, {
                        width: 1920,
                        path: "Android/drawable-xxxhdpi",
                        filename: "splash.png",
                        source: process.argv[2] || config.splash || config.image
                    }

                ];
            var images = generateIconSets('icon.png', process.argv[2] || config.icon || config.image, 'AppIcon.appiconset')
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
        "icon": {
            "filename": "icon.png",
            "background": "fff"
        },
        "splash": {
            "filename": "splash.png",
            "background": "fff"
        },
        "customImages": [{
            "width": 120,
            "height": 120,
            "path": "../../" + mediaPath + "/custom",
            "filename": "outputFilename.png",
            "source": {
                "filename": "image.png",
                "background": "fff"
            }
        }],
        "screenshots": [{
            "url": "http://www.google.com",
            "name": "homepage"
        }]
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