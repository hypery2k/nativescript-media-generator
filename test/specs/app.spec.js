var mediaGen = require('../../tns-media-gen');

describe('main app', function () {
    describe('__resize', function () {
        it('should not error out', function (done) {
            mediaGen.__resize(10, 10, "#fff", "images/icon.png", "../media/output.png", "./")
                .then(function (result) {
                    expect(result).to.exist;
                    done();
                })
                .catch(done)
        })
    });

    describe('__generate', function () {
        it('should not error out', function (done) {
            mediaGen.__generate()
                .then(function (result) {
                    done()
                })
                .catch(done)
        })
    });

    describe('__genConfig', function () {
        it('should not error out', function (done) {
            mediaGen.__genConfig()
                .then(function (result) {
                    expect(result).to.equal("success");
                    done();
                })
                .catch(done);
        })
    })
});
