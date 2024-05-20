window.addEventListener('keydown', function(e){
    switch(e.key){
        case 'ArrowUp':
        case 'w':
            man.move('up');
            break;
        case 'ArrowDown':
        case 's':
            man.move('down');
            break;
        case 'ArrowLeft':
        case 'a':
            man.move('left');
            break;
        case 'ArrowRight':
        case 'd':
            man.move('right');
            break;
        case 'Enter':
            man.changeImage();
            break;
    }
});

window.addEventListener('keydown', function(e){
    if(e.key === 'Shift'){
        man.speed *= 5; 
    }
});

window.addEventListener('keyup', function(e){
    if(e.key === 'Shift'){
        man.speed /= 5; 
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    const backgroundMusic = document.getElementById('backgroundMusic');

    playButton.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            playButton.textContent = 'Pause Music'; 
        } else {
            backgroundMusic.pause();
            playButton.textContent = 'Play Music'; 
        }
    });
});