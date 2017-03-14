 var q = require('q'),
     path = require('path'),
     fs = require('fs'),
     gm = require('gm').subClass({ imageMagick: true }),
     mkdirp = require('mkdirp');

 module.exports = function resize(width, height, bgColour, imagePath, outputFilename, outputPath) {
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
