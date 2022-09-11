const main = () => {
    let playbackConst = 500;
    let setHeight = document.getElementById("jumbotron");
    // let vid = document.getElementById('launch-video');      
    // vid.load();

    // // dynamically set the page height according to video length
    // vid.addEventListener('loadedmetadata', function () {
    //     console.log("set height to ", Math.floor(vid.duration) * playbackConst + "px");
    //     setHeight.style.height = Math.floor(vid.duration) * playbackConst + "px";
    // });

    // let sameAsPrevious = 0;
    // let previousPos = -1;
    // // Use requestAnimationFrame for smooth playback
    // function scrollPlay() {
    //     var frameNumber = window.pageYOffset / playbackConst;
    //     vid.currentTime = frameNumber;
    //     previousPos = frameNumber;
    //     if (previousPos == frameNumber) {
    //         sameAsPrevious++;
    //     }

    //     if (sameAsPrevious < 10) {
    //         window.requestAnimationFrame(scrollPlay);
    //     } else {
    //         sameAsPrevious = 0;
    //     }

    //     console.log(frameNumber);
    // }

    // window.addEventListener("scroll", () => {
    //     window.requestAnimationFrame(scrollPlay);
    // }, false);
    // window.requestAnimationFrame(scrollPlay);
    let images = [];

    fetch("assets/launch.tar").then(response => {
        return response.arrayBuffer();
    })
        .then(buffer => untar(buffer))
        .then(files => {
            files.forEach((file) => {
                let img = new Image();
                img.src = file.getBlobUrl();
                images.push(img);
            });
        });

    let jumbotron = document.getElementById("jumbotron-sticky");


    let frame = () => {
        if (images.length != 137) {
            window.requestAnimationFrame(frame);
            return;
        }
        let scrolled = document.body.scrollTop;
        let jumboStart = jumbotron.offsetTop;
        let jumboEnd = jumbotron.offsetTop + jumbotron.offsetHeight;
        let scrolledPastJumbo = (jumboStart - scrolled) / (jumboEnd - jumboStart);
        let currentFrame = Math.floor(scrolledPastJumbo * (images.length - 1));
        let img = images[currentFrame];
        img.decode().then(() => {
            jumbotron.style.backgroundImage = `url(${img.src})`;
        });
        window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
}

window.onload = main;