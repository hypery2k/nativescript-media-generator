 var q = require('q'),
     path = require('path'),
     fs = require('fs'),
     gm = require('gm').subClass({ imageMagick: true });

 module.exports = function generateIconSets(filename, source, iOSPath) { /*eslint complexity: [error, 22]*/
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