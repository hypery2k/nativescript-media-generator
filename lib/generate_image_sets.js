 var q = require('q'),
     path = require('path'),
     fs = require('fs'),
     gm = require('gm').subClass({ imageMagick: true });

 module.exports = function generateImageSets(filename, source, iOSPath) { /*eslint complexity: [error, 22]*/
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