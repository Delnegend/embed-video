document.addEventListener('DOMContentLoaded', function () {
  let href = new URL(window.location.href);
  let urlValue = href.searchParams.get("url");

  if (urlValue == null) {
    let div = document.createElement('div');
    div.className = 'no_url';
    div.innerHTML = `No URL provided. Please add a URL to the end of the URL, like this:&nbsp<b>${href}?url=https://example.com/video.mp4</b>`;
    document.body.appendChild(div);
    document.querySelector('video').style.display = 'none';
    return;
  }

  if (urlValue.startsWith('b64-')) {
    urlValue = atob(urlValue.replace('b64-', ''));
  }

  if (urlValue.startsWith('yt-') || urlValue.startsWith('vm-')) {
    let videoId = urlValue.replace('yt-', '') || urlValue.replace('vm-', '');
    let divElement = document.createElement('div');
    divElement.className = 'plyr__video-embed';
    divElement.id = 'player';

    let iframeElement = document.createElement('iframe');
    if (urlValue.startsWith('yt-')) {
      iframeElement.src = `https://www.youtube.com/embed/${videoId}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`;
    } else if (urlValue.startsWith('vimeo-')) {
      // https://player.vimeo.com/video/76979871?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media
      iframeElement.src = `https://player.vimeo.com/video/${videoId}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media`;
    }
    iframeElement.allowfullscreen = true;
    iframeElement.allowtransparency = true;
    iframeElement.allow = 'autoplay';
    divElement.appendChild(iframeElement);
    document.body.appendChild(divElement);
  } else if (urlValue.startsWith('audio-')) {
    let audioElement = document.createElement('audio');
    audioElement.id = 'player';
    audioElement.crossOrigin = true;
    audioElement.playsinline = true;

    let sourceElement = document.createElement('source');
    sourceElement.src = urlValue.replace('audio-', '');

    audioElement.appendChild(sourceElement);
    document.body.appendChild(audioElement);
  } else {
    let videoElement = document.createElement('video');
    videoElement.id = 'player';
    videoElement.playsinline = true;
    videoElement.controls = true;

    let sourceElement = document.createElement('source');
    sourceElement.src = urlValue;
    sourceElement.type = 'video/mp4';
    videoElement.appendChild(sourceElement);
    document.body.appendChild(videoElement);
  }

  new Plyr('#player', {
    seekTime: 5,
  });
});