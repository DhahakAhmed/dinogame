let jumpInt, started = false, modeTimeOut
let game = {
    menu : true,
    runner : -1,
    Trex : -1,
    avail : false,
    mode : "light",
    start : () => {
        if( !started ){
            started = true
        }
        $.ajax({
            type: "POST",
            url: './gameParam/start.php',
            data: {},
            success: function(data){
                game.lightMode()
                // $("#slogan").fadeIn(200)
                $("#menu").fadeOut(200)
                $("canvas").css({"display":"flex"})
                game.menu = false;
                game.runner = new Runner()
                game.runner.playIntro()
                game.runner.loadSounds();
                game.runner.playing = true;
                game.runner.update();
                game.runner.tRex.startJump(5)
                clearInterval(jumpInt)
                jumpInt = setInterval(()=>{
                    if( game.runner.tRex.jumpCount == 0 ){
                        game.runner.tRex.startJump(5)
                    }
                    else{
                        clearInterval(jumpInt)
                    }
                },800)
            } 
        });
    },
    darkMode : () => {
        if( game.mode == "light" ){
            clearTimeout(modeTimeOut)
            game.mode = "dark"
            $("#full-area").css({
                "background":"url('./media/bg.png') #0d0d0d",
                "transition":"1s ease-in"
            })
            $("canvas").css({
                "background":"#0d0d0d",
                "transition":"1s ease-in"
            })
            $("#slogan p").css({'color':"white"})
        }
    },
    lightMode : () => {
        if( game.mode == "dark" ){
            clearTimeout(modeTimeOut)
            game.mode = "light"
            $("#full-area").css({
                "background":"url('./media/bg.png') white",
                "transition":"1s ease-in"
            })
            $("canvas").css({
                "background":"white",
                "transition":"1s ease-in"
            })
            $("#slogan p").css({'color':"black"})
        }
    }
}

// setTimeout(()=>{game.start()},500)

