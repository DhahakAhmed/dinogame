let devhk = {
    windowResize : ()=>{
       screen_reso = 0
        window_height = Number($('#full-area').innerHeight())
        window_width = Number($('#full-area').innerWidth())
        game_height = Number($('#game-area').innerHeight())
        game_width = Number($('#game-area').innerWidth())
        diff1 = window_width - window_width*screen_reso;
        diff2 = window_height - window_height*screen_reso;
        scale1 = diff1 / game_width
        scale2 = diff2 / game_height
        scale1 < scale2 ? $("#game-area").css({"transform":"translate(-50%,-50%) scale("+scale1+")"}) : $("#game-area").css({"transform":"translate(-50%,-50%) scale("+scale2+")"})
        screen_reso = 0
        game_height = Number($('#web3-popup .content').innerHeight())
        game_width = Number($('#web3-popup .content').innerWidth())
        screen_reso = 0.1
        diff1 = window_width - window_width*screen_reso;
        diff2 = window_height - window_height*screen_reso;
        scale1 = diff1 / game_width
        scale2 = diff2 / game_height
        if( scale1 > 0.9){ scale1 = .9}
        if( scale2 > 0.9){ scale2 = .9}
        scale1 < scale2 ? $("#web3-popup .content").css({"transform":" scale("+scale1+")"}) : $("#web3-popup .content").css({"transform":" scale("+scale2+")"})
    },
    meet : (e1,e2)=>{ // (element1,element2)
        if(e1.length && e2.length){
            // Get elements positions
            e1.w = Number(e1.css("width").split("px").slice(0, -1)) ;e2.w = Number(e2.css("width").split("px").slice(0, -1))
            e1.h = Number(e1.css("height").split("px").slice(0, -1)); e2.h = Number(e2.css("height").split("px").slice(0, -1))
            e1.x = Number(e1.css("left").split("px").slice(0, -1)); e2.x = Number(e2.css("left").split("px").slice(0, -1))
            e1.y = Number(e1.css("top").split("px").slice(0, -1)); e2.y = Number(e2.css("top").split("px").slice(0, -1))

            // Start searching for a meet
            if ( ((e1.x+e1.w) >= e2.x && e1.x < (e2.x+e2.w)) && ((e1.y+e1.h) >= e2.y && e1.y < (e2.y+e2.h)) ){
                return true;
            }
            // No meet
            return false;
        }
    },
    mutedAudio : false,
    playAudio : (e,a,x,v) => {
        e.attr('src','./media/audio/'+a+'.'+x)
        e[0].pause();
        e[0].volume=v;
        e[0].currentTime=0;
        if(e.attr('src') != "" && !devhk.mutedAudio){
            e[0].play();
        }
    },
    resumeAudio : (e) => {
        if(e.attr('src') != "" && !devhk.mutedAudio){
            e[0].play();
        }
    },
    pauseAudio : (e) => {
        e[0].pause();
    },
    emptyAudioSource : (e) => {
        e.attr('src','')
    },
    muteAudio : () => {
        if( devhk.mutedAudio ){
            devhk.mutedAudio = false
            if ( game.status ){
                devhk.resumeAudio($("#bg-audio"))
            }
            if( $("#fixed-audio")[0].currentTime < $("#fixed-audio")[0].duration){
                devhk.resumeAudio($("#fixed-audio"))
            }
            $(".audio-btn img").attr('src','./media/svg/volume-up-fill.svg')
        }
        else{
            devhk.mutedAudio = true
            if ( game.status ){
                devhk.pauseAudio($("#bg-audio"))
            }
            devhk.pauseAudio($("#fixed-audio"))
            $(".audio-btn img").attr('src','./media/svg/volume-mute-fill.svg')
        }
    },
    randomize : (min,max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    },
    getCSS : (el,prop) => {
        return Number(el.css(prop).replace('px',''))
    },
    toMMSS : (s) => {
        let minutes = Math.floor(s / 60);
        let seconds = s - (minutes * 60);
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return minutes+':'+Math.trunc(seconds);
    },
    sqr : (x) => {
        return x * x;
    },  
    Distance : (e1,e2) => {
        x1 = devhk.getTranslateValues(e1).x
        y1 = devhk.getTranslateValues(e1).y
        x2 = devhk.getTranslateValues(e2).x
        y2 = devhk.getTranslateValues(e2).y
        return Math.sqrt(devhk.sqr(y2 - y1) + devhk.sqr(x2 - x1));
    },  
    nbOcurrance : (word,letter) => {
        return word.toUpperCase().split(letter.toUpperCase()).length - 1
    },
    getTranslateValues : (elem) => {
        return {
            x: Number(elem.css('transform').split(/[()]/)[1].split(',')[4]),
            y: Number(elem.css('transform').split(/[()]/)[1].split(',')[5])
        }
    },
    getRotationDegrees(el) {
        var matrix = el.css('transform')
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.atan2(b, a);
        var degrees = angle * (180 / Math.PI);
        return degrees;
    },
    arrayOcurrance : (a,string) => {
        let _O =  a.filter(x => x === string).length;
        return _O
    },
    containsOnlyLetters(str) {
        return /^[a-z]+$/i.test(str);
    },
    loadFullScreenAPI : () => {
        onFullScreen = false
        _fRequestFullScreen = null;
        _fCancelFullScreen = null;
        doc = window.document;
        docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
    },
    requestFullScreen : () => {
        if(onFullScreen) { 
            _fCancelFullScreen.call(window.document);
            onFullScreen = false;
        }else{
            _fRequestFullScreen.call(window.document.documentElement);
            onFullScreen = true;
        }
    },
    loadGameAssets : () => {
        currLoad = 5;
        laodInt = setInterval(()=>{
            currLoad += devhk.randomize(5,25)
            if( currLoad >80){
                if( windowLoaded ){
                    currLoad = 100
                    clearInterval(laodInt)
                }
                else{
                    currLoad = 80
                }
            }
            $("#loader-progress-progress").css({"width":currLoad+"%","transition":".4s"})
            if( currLoad == 100 ){
                setTimeout(()=>{
                    $("#loader-area").hide()
                    $("#game-area").fadeIn(300)
                },500)
            }
        },700)
    },
}

devhk.windowResize()

$(window).on('resize',()=>{
    devhk.windowResize()
 })