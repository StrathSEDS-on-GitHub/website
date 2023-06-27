const main = () => {
    let playbackConst = 500;
    let setHeight = document.getElementById("jumbotron");
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
        // if (images.length != 137) {
        //     window.requestAnimationFrame(frame);
        //     return;
        // }
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