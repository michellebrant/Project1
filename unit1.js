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
    message.append('<p>Help Riley save her memories! Collect points by clicking on memories before they fall into the memory dump. Purple memory orbs are regular memories worth 10 points. The yellow memories are core memories- loose more than three, and game over!</p>')
    message.append(start)
})

start.on("click", function() {
    createMems();
    createCoreMems();
    body.append('<div class="score"></div>')
    $('.score').append('<p class = "points">You have 0 points and have saved 0 memories! </p>')

})

function createMems() {

    setInterval(function() {
        regmemory = $('<div class="regmemory"></div>')
        body.append(regmemory);
        regmemory.css("left", Math.random() * window.innerWidth);
        //why is this delayed?
        $('.regmemory').each(function(i) {
            var top = $(this).css('top');
            $(this).css('top')
            if (top === '600px') {
                console.log('you loose!');
            } else {}
        });
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


    }, 1000)
}




function createCoreMems() {
    setInterval(function() {
        coremem = $('<div class="corememory"></div>')
        body.append(coremem);
        coremem.css("left", Math.random() * window.innerWidth);
        coremem.animate({
            top: '1000'
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



// ask someone about this!!!!

//  setInterval(function() {$('.regmemory').each(function(i){
//               var top = $(this).css('top');
//              $(this).css('top')
//           if (top === '1000px'){
//           console.log('you did it!');
//           start.on("click", function() {
//     })
//         }
//           else {}
//   });

// }, 1)



// $('.regmemory').each(function(i){
//                 var top = $(this).css('top');
//                $(this).css('top')
//             if (top === '1000px'){
//             console.log('you did it!');
//           }
//             else {}
//     });


// setInterval(function() {
//      coremem = $('<div class="corememory"></div>')
//      body.append(coremem);
//      coremem.css("left", Math.random() * window.innerWidth);
//      coremem.animate({
//          top: '1000'
//      }, 5000);

//    var top = $('.regmemory').css('top');
//     $('.regmemory').css('top')
//     if (top === '1000px') {
//         console.log('you did it!');
//     } else {}
// }
