console.log('hey!')
    // creates opening screen
body = $('body');
message = $('#message')
message.append('<p class ="first">Welcome to Inside Out! Read the rules before you play!</p>');
message.append('<button class="rules">Rules</button>');
start = $('<button class="start">Start the Game!</button>')
body.append('<div class="joy-1" id="JOY"></div>');
joy = $('.joy-1')
body.append('<div class="disgust-1" id="DISGUST"></div>');
disgust = $('.disgust-1')
body.append('<div class="sad-1" id="SAD"></div>');
sad = $('.sad-1')
body.append('<div class="anger-1" id="ANGER" ></div>');
anger = $('.anger-1')

function Anger() {
    var counter = 0
    angerInterval = setInterval(function() {
        if (counter <= 7) {
            counter = counter + 1
            anger.attr('class', 'anger-' + counter)
        }
        if (counter >= 8) {
            anger.attr('class', 'anger-1')
        }
    }, 250)
}

function Sad() {
    var counter = 0
    sadInterval = setInterval(function() {
        if (counter <= 2) {
            counter = counter + 1
            sad.attr('class', 'sad-' + counter)
        }
        if (counter >= 3) {
            sad.attr('class', 'sad-1')
        }
    }, 250)
}


function Disgust() {
    var counter = 0
    disgustInterval = setInterval(function() {
        if (counter <= 2) {
            counter = counter + 1
            disgust.attr('class', 'disgust-' + counter)
        }
        if (counter >= 3) {
            disgust.attr('class', 'disgust-1')
        }
    }, 250)
}

function Joy() {
    var counter = 0
    joyInterval = setInterval(function() {
        if (counter <= 2) {
            counter = counter + 1
            joy.attr('class', 'joy-' + counter)
        }
        if (counter >= 3) {
            joy.attr('class', 'joy-1')
        }
    }, 250)
}



$('.rules').on("click", function() {
    $('.first').remove();
    $('.rules').remove();
    message.append('<p class="message_text">Help Riley save her memories! Collect points by clicking on memories before they fall into the memory dump. Purple memory orbs are regular memories worth 10 points. The yellow memories are core memories- loose more than three, and game over!</p>')
    message.append(start)
})

start.on("click", function() {
   startLevelOne();

})

function createMems() {

    memoryIntervalID = setInterval(function() {
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
                Sad();
                Disgust();
                scoreboard = $('.points')
                splitBoard = scoreboard.text().split(' ');
                oldPoints = parseInt(splitBoard[2])
                newPoints = oldPoints - 20
                scoreboard.text("You have " + newPoints + " points and have saved " + newMemories + " memories!")
                $(this).remove();
                return;
            } else {}
        });

    }, 1000)
}


function createCoreMems() {
    coreIntervalId = setInterval(function() {
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
            Joy();
        })
    }, 10000)
}

function checkToLoose() {
    core = $('.corememory')
    var top = core.css('top');
    core.css('top');
    if (top === '600px') {
        Anger();
        clearInterval(coreIntervalId);
        clearInterval(memoryIntervalID);
        $('.message_text').text('You Loose!')
        clearInterval(looseID1);
        return;

    }
    scoreboard = $('.points')
    splitBoard = scoreboard.text().split(' ');
    points = parseInt(splitBoard[2])
    memories = parseInt(splitBoard[7])
    if (points < 0) {
        Anger();
        clearInterval(coreIntervalId);
        clearInterval(memoryIntervalID);
        body.append(message);
        $('.message_text').text('You Loose!')
        clearInterval(looseID1);
        return;

    }

    }
;
looseID1 = setInterval(function() {
    checkToLoose();
}, 100)

function startLevelOne(){
  createMems();
  createCoreMems();
   $('#message').remove();
    start.remove();
    body.append('<div class="score"></div>')
    $('.score').append('<p class = "points">You have 0 points and have saved 0 memories! </p>');
}

function checkToWinLevelOne(){
    scoreboard = $('.points')
    splitBoard = scoreboard.text().split(' ');
    points = parseInt(splitBoard[2])
    if (points >=100 ){
      $('.corememory').remove();
      $('.regmemory').remove();
      clearInterval(coreIntervalId);
      clearInterval(memoryIntervalID);
      body.append(message);
      $('.message_text').text('You beat level 1! Level 2 starts in 3 seconds');
      Anger();
      Sad();
      Joy();
      Disgust();
      clearInterval(winID1);
      setTimeout (startLevelTwo, 3000);
      }
}
winID1 = setInterval(function() {
    checkToWinLevelOne();
}, 100)

function startLevelTwo(){
    $('#message').remove();
    start.remove();
    createMems();
    scoreboard.text("You have 0 points and have saved " + newMemories + " memories!");
    createCoreMems();
    winID2 = setInterval(function() {
    checkToWinLevelTwo();
}, 100)

}
function checkToWinLevelTwo(){
    scoreboard = $('.points')
    splitBoard = scoreboard.text().split(' ');
    points = parseInt(splitBoard[2])
    if (points >=100 ){
      $('.corememory').remove();
      $('.regmemory').remove();
      clearInterval(coreIntervalId);
      clearInterval(memoryIntervalID);
      body.append(message);
      $('.message_text').text('You beat level 2! Level 3 starts in 3 seconds');
       setTimeout (startLevelThree, 3000);
      Anger();
      Sad();
      Joy();
      Disgust();
      clearInterval(winID2);
      }
}

function startLevelThree(){
    $('#message').remove();
    start.remove();
    createMems();
    scoreboard.text("You have 0 points and have saved " + newMemories + " memories!");
    createCoreMems();
    winID3 = setInterval(function() {
    checkToWinLevelThree();
}, 100)

}
function checkToWinLevelThree(){
    scoreboard = $('.points')
    splitBoard = scoreboard.text().split(' ');
    points = parseInt(splitBoard[2])
    if (points >=100 ){
      $('.corememory').remove();
      $('.regmemory').remove();
      clearInterval(coreIntervalId);
      clearInterval(memoryIntervalID);
      body.append('<div class="winnermessage"></div>');
      $('.winnermessage').append('<p>Congrats! You helped Riley save all her core memories!</p>')
      $('.winnermessage').append('<p>To play again, click below.</p>')
      $('.winnermessage').append('<button>Play Again!</button>')
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





