var mediaGen = require('../../tns-media-gen');

describe('main app', function () {
    describe('resize', function () {
        it('should not error out', function (done) {
            mediaGen.__resize(10, 10, "#fff", "images/icon.png", "output.png", "../../.tmp")
                .then(function (result) {
                    expect(result).toBeDefined();
                    done();
                })
                .catch(done);
        })
    });

    describe('generate', function () {
        it('should not error out', function (done) {
            mediaGen.__generate()
                .then(function (result) {
                    done();
                })
                .catch(done)
        })
    });

    describe('genConfig', function () {
        it('should not error out', function (done) {
            mediaGen.__genConfig()
                .then(function (result) {
                    expect(result).toBe('success');
                    done();
                })
                .catch(done);
        })
    })
});
