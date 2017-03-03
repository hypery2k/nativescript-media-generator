 module.exports = function storeImagesGenerator(config, mediaPath) {
     return [
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
     ];
 }