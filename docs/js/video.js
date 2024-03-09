const main = async () => {
    let images = [];

    // Check if browser is mobile or desktop
    let file = "launch-horz.tar"
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        console.log("Using mobile launch images")
        file = "launch-vert.tar"
    } else {
        console.log("Using desktop launch images")
    }

    let resp = await fetch("assets/" + file);
    let length = parseInt(resp.headers.get("Content-Length"));

    let loaded = 0

    resp = new Response(new ReadableStream({
        async start(controller) {
            const reader = resp.body.getReader();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                loaded += value.byteLength;
                document.getElementById("loading-bar").value = loaded / length * 100;
                controller.enqueue(value);
            }
            controller.close();
        }
    }));

    let files = await untar(await resp.arrayBuffer());
    files.forEach((file) => {
        let img = new Image();
        img.src = file.getBlobUrl();
        images.push(img);
    });

    let jumbotronFront = document.getElementById("jumbotron-content-back");
    let jumbotronBack = document.getElementById("jumbotron-content");
    let jumbo = document.getElementById("jumbotron-sticky")

    let next = jumbotronFront;
    let other = jumbotronBack;

    let frame = () => {
        let scrolled = document.body.scrollTop;
        let jumboStart = jumbo.offsetTop;
        let jumboEnd = jumbo.offsetTop + jumbo.offsetHeight;
        let scrolledPastJumbo = (jumboStart - scrolled) / (jumboEnd - jumboStart);
        let currentFrame = Math.floor(scrolledPastJumbo * (images.length - 1));
        let img = images[currentFrame];
        if (!img) {
            // Wait for the image to load
            requestAnimationFrame(frame);
            return;
        }
        img.decode().then(() => {
            next.style.backgroundImage = `url(${img.src})`;
            other.style.zIndex = 100;
            next.style.zIndex = 1000;
        });
        window.requestAnimationFrame(frame);
        next = next == jumbotronFront ? jumbotronBack : jumbotronFront;
        other = other == jumbotronFront ? jumbotronBack : jumbotronFront;
    }
    window.requestAnimationFrame(frame);
}

window.onload = main;
