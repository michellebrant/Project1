console.log('hey!')
    // creates opening screen
body = $('body');
message = $('#message')
insideoutlogo = $('<img src="insideoutlogo.jpg" class="logo">');
body.append(insideoutlogo)
message.append('<p class="welcome">Welcome to Inside Out : Save Riley\'s Memories Game</p>');
message.append('<button class="rules">Rules</button>');
start = $('<button class="start">Start the Game!</button>')

function Anger() {
 angerID = setInterval(function() {
      anger.toggleClass('anger-2');
    }, 250)
}

function Sad() {
 sadID = setInterval(function() {
      sad.toggleClass('sad-2');
    }, 250)
}


function Disgust() {
 disgustID = setInterval(function() {
      disgust.toggleClass('disgust-2');
    }, 250)
}

function Joy() {
   joyID = setInterval(function() {
      joy.toggleClass('joy-2');
    }, 250)

}

$('.rules').on("click", function() {
    $('.first').remove();
    $('.rules').remove();
    $(".welcome").remove();
    message.append('<p>In this game based on Pixar\'s hit film Inside Out (2015), Riley\'s memories are in danger of being lost forever in the Memory Dump. Help Riley save her memories or risk loosing her personality islands forever.</p>');
    message.append('<p>Once the game begins, Riley\'s memories will fall from the top of the screen. Purple memories signal regular memories. In order to save these memories click the memory orb, and gain 10 points. These memories will not cause a total removal of a personality island, but will dock 20 points from your score. Fall below a score of 0 and you loose!</p>');
    message.append('<p>In addition to regular memories, golden core memory orbs will be falling sporadically. These are the most important memories Riley has, and make up her personality. In order to save these, you must double click the orb (you will gain 20 points). Miss one, and Riley looses a personality island and you automatically loose the game.</p>')
    message.append(start)
})

start.on("click", function() {
    body.append('<div class="joy-1" id="JOY"></div>');
    joy = $('.joy-1')
    body.append('<div class="disgust-1" id="DISGUST"></div>');
    disgust = $('.disgust-1')
    body.append('<div class="sad-1" id="SAD"></div>');
    sad = $('.sad-1');
    body.append('<div class="anger-1" id="ANGER" ></div>');
    anger = $('.anger-1');
    body.append('<div class="score"></div>');
    $('.score').append('<p class = "points">You have 0 points and have saved 0 memories! </p>');
    startLevelOne();
    insideoutlogo.remove();

})

function createMems() {

    regmemory = $('<div class="regmemory"></div>')
    body.append(regmemory);
    regmemory.css("left", Math.random() * window.innerWidth);
    regmemory.animate({
        top: '600'

    }, 5000);

    regmemory.click(function() {
        $(this).remove();
        scoreboard = $('.points')
        splitBoard = scoreboard.text().split(' ');
        oldPoints = parseInt(splitBoard[2])
        newPoints = oldPoints + 10
        oldMemories = parseInt(splitBoard[7])
        newMemories = oldMemories + 1
        scoreboard.text("You have " + newPoints + " points and have saved " + newMemories + " memories!");

    })
    $('.regmemory').each(function(i) {
        var top = $(this).css('top');
        $(this).css('top')
        if (top === '600px') {
            scoreboard = $('.points')
            splitBoard = scoreboard.text().split(' ');
            oldPoints = parseInt(splitBoard[2])
            newPoints = oldPoints - 20;
            newMemories = splitBoard[7]
            scoreboard.text("You have " + newPoints + " points and have saved " + newMemories + " memories!")
            $(this).remove();
            return;
        } else {}
    });
}


function createCoreMems() {
    coremem = $('<div class="corememory"></div>')
    body.append(coremem);
    coremem.css("left", Math.random() * window.innerWidth);
    coremem.animate({
        top: '600'
    }, 5000);

    coremem.dblclick(function() {
        $(this).remove();
        scoreboard = $('.points')
        splitBoard = scoreboard.text().split(' ');
        oldPoints = parseInt(splitBoard[2])
        newPoints = oldPoints + 20
        oldMemories = parseInt(splitBoard[7])
        newMemories = oldMemories + 1
        scoreboard.text("You have " + newPoints + " points and have saved " + newMemories + " memories!")
    })
}

function checkToLoose() {
    core = $('.corememory')
    var top = core.css('top');
    core.css('top');
    if (top === '600px') {
        Anger();
        Joy();
        Disgust();
        Sad();
        if (typeof memoryID1 === "number") {
            clearInterval(memoryID1);
            clearInterval(corememoryID1);
        }
        if (typeof memoryID2 === "number") {
            clearInterval(memoryID2);
            clearInterval(corememoryID2);
        }
        if (typeof memoryID3 === "number") {
            clearInterval(memoryID3);
            clearInterval(corememoryID3);
        }
        $('.corememory').remove();
        $('.regmemory').remove();

        body.append('<div class="loosermessage"></div>');
        $('.loosermessage').append('<p class="loosermessagetext"></p>');
        $('.loosermessagetext').text('You lost! Press below to play again!')
        $('.loosermessage').append('<button id="restart">Play Again!</button>');
        restartbutton = $('#restart')
        $('.score').remove();
        restartbutton.on("click", function() {
            $('.loosermessage').remove();
            clearInterval(angerID);
            clearInterval(joyID);
            clearInterval(disgustID);
            clearInterval(sadID);
            restartbutton.remove();
            body.append(joy);
            body.append(disgust);
            body.append(sad);
            body.append(anger);
            body.append('<div class="score"></div>');
            $('.score').append('<p class = "points">You have 0 points and have saved 0 memories! </p>');
            startLevelOne();
        })
    }
    scoreboard = $('.points')
    splitBoard = scoreboard.text().split(' ');
    points = parseInt(splitBoard[2])
    memories = parseInt(splitBoard[7])
    if (points < 0) {
        if (typeof memoryID1 === "number") {
            clearInterval(memoryID1);
            clearInterval(corememoryID1);
        }
        if (typeof memoryID2 === "number") {
            clearInterval(memoryID2);
            clearInterval(corememoryID2);
        }
        if (typeof memoryID3 === "number") {
            clearInterval(memoryID3);
            clearInterval(corememoryID3);
        }
        Anger();
        Sad();
        Joy();
        Disgust();
        $('.corememory').remove();
        $('.regmemory').remove();
        clearInterval(memoryID1);
        clearInterval(corememoryID1);
        body.append('<div class="loosermessage"></div>');
        $('.loosermessage').append('<p class="loosermessagetext"></p>');
        $('.loosermessagetext').text('You lost! Press below to play again!')
        $('.loosermessage').append('<button id="restart">Play Again!</button>');
        restartbutton = $('#restart');
        $('.score').remove();
        restartbutton.on("click", function() {
            clearInterval(angerID);
            clearInterval(joyID);
            clearInterval(disgustID);
            clearInterval(sadID);

            $('.loosermessage').remove();
            restartbutton.remove();
            body.append(joy);
            body.append(disgust);
            body.append(sad);
            body.append(anger);
            body.append('<div class="score"></div>');
            $('.score').append('<p class = "points">You have 0 points and have saved 0 memories! </p>');
            startLevelOne();
        })
    }

};
looseID1 = setInterval(function() {
    checkToLoose();
}, 100)

function startLevelOne() {
    memoryID1 = setInterval(function() {
        createMems();
    }, 1000);
    corememoryID1 = setInterval(function() {
        createCoreMems();
    }, 5000);
    $('#message').remove();
    start.remove();

}

function checkToWinLevelOne() {
    scoreboard = $('.points')
    splitBoard = scoreboard.text().split(' ');
    points = parseInt(splitBoard[2])
    if (points >= 100) {
        clearInterval(memoryID1);
        clearInterval(corememoryID1);
        $('.corememory').remove();
        $('.regmemory').remove();
        body.append('<div class="levelmessage"></div');
        $('.levelmessage').append('<p class="levelmessage">You beat level 1! Level 2 starts in 3 seconds</p>');
        Anger();
        Sad();
        Joy();
        Disgust();
        clearInterval(winID1);
        setTimeout(startLevelTwo, 3000);
    }
}
winID1 = setInterval(function() {
    checkToWinLevelOne();
}, 100)

function startLevelTwo() {
              clearInterval(angerID);
            clearInterval(joyID);
            clearInterval(disgustID);
            clearInterval(sadID);
    $('#message').remove();
    $('.levelmessage').remove();
    memoryID2 = setInterval(function() {
        createMems();
    }, 1000);
    corememoryID2 = setInterval(function() {
        createCoreMems();
    }, 2000);
    scoreboard.text("You have 0 points and have saved " + newMemories + " memories!");
    secondcore = createCoreMems();
    winID2 = setInterval(function() {
        checkToWinLevelTwo();
    }, 100)

}

function checkToWinLevelTwo() {
    scoreboard = $('.points')
    splitBoard = scoreboard.text().split(' ');
    points = parseInt(splitBoard[2])
    if (points >= 100) {
        clearInterval(memoryID2);
        clearInterval(corememoryID2);
        clearInterval(secondcore);
        $('.corememory').remove();
        $('.regmemory').remove();
        body.append('<div class="levelmessage"></div');
        $('.levelmessage').append('<p class="levelmessage">You beat level 2! Level 3 starts in 3 seconds</p>');
        setTimeout(startLevelThree, 3000);
        Anger();
        Sad();
        Joy();
        Disgust();
        clearInterval(winID2);
    }
}

function startLevelThree() {
              clearInterval(angerID);
            clearInterval(joyID);
            clearInterval(disgustID);
            clearInterval(sadID);
    $('#message').remove();
    $('.levelmessage').remove();
    memoryID3 = setInterval(function() {
        createMems();
    }, 900);
    corememoryID3 = setInterval(function() {
        createCoreMems();
    }, 1900);
    scoreboard.text("You have 0 points and have saved " + newMemories + " memories!");
    createCoreMems();
    winID3 = setInterval(function() {
        checkToWinLevelThree();
    }, 100)

}

function checkToWinLevelThree() {
    scoreboard = $('.points')
    splitBoard = scoreboard.text().split(' ');
    points = parseInt(splitBoard[2])
    if (points >= 100) {
        clearInterval(corememoryID3);
        clearInterval(memoryID3);
        $('.corememory').remove();
        $('.regmemory').remove();
                Anger();
        Sad();
        Joy();
        Disgust();
        body.append('<div class="winnermessage"></div>');
        $('.winnermessage').append('<p class="winnermessagetext"></p>');
        $('.winnermessagetext').text('Congrats, you helped Riley save ' + newMemories + ' of her memories! Click below to play again!')
        $('.winnermessage').append('<button id="restart">Play Again!</button>');
        restartbutton = $('#restart')
        restartbutton.on("click", function() {
            $('.winnermessage').remove();
            $('.winner').remove();
            body.append(joy);
            body.append(disgust);
            body.append(sad);
            body.append(anger);
            body.append('<div class="score"></div>');
            $('.score').append('<p class = "points">You have 0 points and have saved 0 memories! </p>');
            startLevelOne();
        })
        body.append('<img src="core.png" class="winner">');
        scoreboard.remove();
        $('.score').remove();
        anger.remove();
        sad.remove();
        joy.remove();
        disgust.remove();
        clearInterval(winID3);
    }
}
