var screenshots = require('../../screenshots'),
  fs = require('fs');

var settings = {
  url: 'http://www.google.com',
  width: 1280,
  height: 720,
  path: "images/Google",
  fileName: '7Inch.png'
};

xdescribe('Screenshots', function () {
  describe('generate', function () {
    it('should return no errors', function (done) {
      screenshots.generate(settings.url, settings.width, settings.height, 1, settings.path, settings.fileName)
        .then(function (result) {
          console.log('==>' + result)
          expect(result.success).toBeDefined();
        })
        .catch(function (error) {
          throw new error;
        })
        .done(function () { done() });
    }, 30000);

    it('should have created a file', function (done) {
      fs.exists(settings.path + "/" + settings.fileName, function (result) {
        expect(result).toBeTruthy();
        done();
      });
    }, 30000);

    it('should die when nothing is supplied', function (done) {
      screenshots.generate()
        .then(function (result) {
          fail("Should not have worked");
        })
        .catch(function (err) {
          expect(err).toBeDefined();
          done();
        });
    }, 30000);
  });

  describe('generate all', function () {
    screenshots.pages.push({ url: "http://www.google.com", name: "home" });

    it('should return', function (done) {
      expect(screenshots.generateAll()).toBeTruthy();
      done();
    }, 30000);

    it('should have created a file', function (done) {
      fs.exists("Media/android/screenshots/10in/android-10in-1280x720-google.png", function (result) {
        expect(result).toBeTruthy();
        done();
      });
    }, 30000);
  });

});
