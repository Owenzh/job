describe("DBAPI", function() {
    var DB = require('../../DBUtils/DBAPI.js').MGDAO;
    var dbObj = null;
    //Clear tb_test
    beforeEach(function(){
        dbObj = new DB('tb_test');
    });
    it("should be able to open mongodb connect", function() {
        dbObj.openDB();
        expect(dbObj.db).not.toBeNull();
    });
    it("should be able to find documents", function() {
        //var res = null;
        console.dir(dbObj);
        console.dir(dbObj.findDocuments);
        dbObj.findDocuments({},function(err,r){
            //res = r;
            console.log(res.length);

        });
        //expect(res.length).toEqual(13);

    });

/*
    describe("when song has been paused", function() {
        beforeEach(function() {
            player.play(song);
            player.pause();
        });

        it("should indicate that the song is currently paused", function() {
            expect(player.isPlaying).toBeFalsy();

            // demonstrates use of 'not' with a custom matcher
            expect(player).not.toBePlaying(song);
        });

        it("should be possible to resume", function() {
            player.resume();
            expect(player.isPlaying).toBeTruthy();
            expect(player.currentlyPlayingSong).toEqual(song);
        });
    });

    // demonstrates use of spies to intercept and test method calls
    it("tells the current song if the user has made it a favorite", function() {
        spyOn(song, 'persistFavoriteStatus');

        player.play(song);
        player.makeFavorite();

        expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
    });

    //demonstrates use of expected exceptions
    describe("#resume", function() {
        it("should throw an exception if song is already playing", function() {
            player.play(song);

            expect(function() {
                player.resume();
            }).toThrowError("song is already playing");
        });
    });*/
});
