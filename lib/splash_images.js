module.exports = function splashImagesGenerator(config, mediaPath) {
    return [
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
        }, {
            width: 1125,
            height: 2436,
            path: "iOS/Assets.xcassets/LaunchImage.launchimage",
            filename: "Default-2436h.png",
            source: process.argv[2] || config.splash || config.image
        }, {
            width: 2436,
            height: 1125,
            path: "iOS/Assets.xcassets/LaunchImage.launchimage",
            filename: "Default-Landscape-2436h.png",
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
}