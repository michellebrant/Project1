console.log('hey!')
// creates opening screen
body = $('body');
message = $('#message')
message.append('<p>Welcome to Inside Out! Ready to play?</p>');
message.append('<button class="openbutton">Ready to Play!</button>');

//function to click button and start game
$("button").on("click", function(){
    createMems();
    createCoreMems();
})

function createMems(){
 setInterval(function(){
  regmemory = $('<div class="regmemory"></div>')
  body.append(regmemory);
  regmemory.css("left", Math.random()*window.innerWidth);
  regmemory.animate({top: '+=500'}, 5000);
  regmemory.click(function(){
    $( this ).remove();
  })
 },1000)
}

function createCoreMems(){
 setInterval(function(){
  coremem = $('<div class="coremem"></div>')
  body.append(coremem);
  coremem.css("left", Math.random()*window.innerWidth);
  coremem.animate({top: '+=500'}, 5000);
  coremem.click(function(){
    $( this ).remove();
  })
 },5000)
}




    // 11. Attaches a "click" handler that adds the "shot" class to the duck
