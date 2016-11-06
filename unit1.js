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
    createMems();
    createCoreMems();
    body.append('<div class="score"></div>')
    $('.score').append('<p class = "points">You have 0 points and have saved 0 memories! </p>')

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
        clearInterval(looseID);
        return;

    }
    scoreboard = $('.points')
    splitBoard = scoreboard.text().split(' ');
    points = parseInt(splitBoard[2])
    if (points < 0) {
        Anger();
        clearInterval(coreIntervalId);
        clearInterval(memoryIntervalID);
        $('.message_text').text('You Loose!')
        clearInterval(looseID);
        return;

    } else {}
};
looseID = setInterval(function() {
    checkToLoose();
}, 100)
