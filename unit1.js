console.log('hey!')
    // creates opening screen
body = $('body');
message = $('#message')
message.append('<p class ="first">Welcome to Inside Out! Read the rules before you play!</p>');
message.append('<button class="rules">Rules</button>');
start = $('<button class="start">Start the Game!</button>')


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
            scoreboard.text("You have " + newPoints + " points and have saved " + newMemories + " memories!")

        })
        $('.regmemory').each(function(i) {
            var top = $(this).css('top');
            $(this).css('top')
            if (top === '600px') {
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
        })
    }, 10000)
}

function checkToLoose() {
    core = $('.corememory')
    var top = core.css('top');
    core.css('top');
    if (top === '600px') {
        clearInterval(coreIntervalId);
        clearInterval(memoryIntervalID);
        $('.message_text').text('You Loose!')
        clearInterval(looseID);
        return;
    }
    if (newPoints < 0){
         clearInterval(coreIntervalId);
        clearInterval(memoryIntervalID);
        $('.message_text').text('You Loose!')
        clearInterval(looseID);
        return;
    }
    else {}
};
looseID = setInterval(function() {
    checkToLoose();
}, 100)
