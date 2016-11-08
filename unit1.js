console.log('hey!')
    // creates opening screen
body = $('body');
message = $('#message')
insideoutlogo = $('<img src="insideoutlogo.jpg" class="logo">');
body.append(insideoutlogo)
message.append('<p class="welcome">Welcome to Inside Out : Save Riley\'s Memories Game</p>');
message.append('<button class="rules">Rules</button>');
start = $('<button class="start">Start the Game!</button>')

//these functions animate the sprites when called
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

//this creates the rules page when appropriate button is clicked
$('.rules').on("click", function() {
    $('.first').remove();
    $('.rules').remove();
    $(".welcome").remove();
    message.append('<p>In this game based on Pixar\'s hit film Inside Out (2015), Riley\'s memories are in danger of being lost forever in the Memory Dump. Help Riley save her memories or risk loosing her personality islands forever.</p>');
    message.append('<p>Once the game begins, Riley\'s memories will fall from the top of the screen. Purple memories signal regular memories. In order to save these memories click the memory orb, and gain 10 poinnts; miss one and loose 20 points. Fall below a score of 0 and you loose, or get 100 points to move to the next level! Beat all 3 levels to win the game.</p>');
    message.append('<p>In addition to regular memories, golden core memory orbs will be falling sporadically. These are the most important memories Riley has, and make up her personality. In order to save these, you must double click the orb (you will gain 20 points). Miss one and you automatically loose the game.</p>')
    message.append(start)
})

//creates basic wireframe of game when button is click, calls function for level one to start the game
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

//function that creates regular memories across random poitns on the screen; animates memories to move down screen
function createMems() {

    regmemory = $('<div class="regmemory"></div>')
    body.append(regmemory);
    regmemory.css("left", Math.random() * window.innerWidth);
    regmemory.animate({
        top: '600'

    }, 5000);
//click function to get rid of memories
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
    //function to remove points if they reach bottom of screen
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

//function that creates core memories across random poitns on the screen; animates memories to move down screen
function createCoreMems() {
    coremem = $('<div class="corememory"></div>')
    body.append(coremem);
    coremem.css("left", Math.random() * window.innerWidth);
    coremem.animate({
        top: '600'
    }, 5000);
//click function to get rid of memories
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

//function to check loose properties
function checkToLoose() {
    core = $('.corememory')
    var top = core.css('top');
    core.css('top');
    //checks if core memory reaches bottom of screen, stops game and allows restart
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
        //click function to restart game
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
    //loose function if score is negative
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
        //click function to restart game
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
//check the loosing conditions every milisecond
looseID1 = setInterval(function() {
    checkToLoose();
}, 100)

//begins game
function startLevelOne() {
    memoryID1 = setInterval(function() {
        createMems();
    }, 1000);
    corememoryID1 = setInterval(function() {
        createCoreMems();
    }, 5000);
    $('#message').remove();
    start.remove();
    winID1 = setInterval(function() {
        checkToWinLevelOne();
    }, 100)

}

//function to win level one
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


//starts level 2
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

//checks and allows to win level 2
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

//starts level 3
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

//checks if you won level 3, allows you to restart the game
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
        body.append('<img src="core.png" class="winner">');
        scoreboard.remove();
        $('.score').remove();
        anger.remove();
        sad.remove();
        joy.remove();
        disgust.remove();
        clearInterval(winID3);
        //click function to restart the game
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
            clearInterval(angerID);
            clearInterval(joyID);
            clearInterval(disgustID);
            clearInterval(sadID);
        })
    }
}
