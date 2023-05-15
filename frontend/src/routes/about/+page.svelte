<script>
    let videoId1 = "bYwr702lcAw"; // Video ID de Antonio Carranza
    let videoId2 = "bYwr702lcAw"; // Video ID de Carlos Gata
  </script>
  
  <div class="app">
    <h1>Video de Antonio Carranza</h1>
    <div class="video-container">
      <!-- svelte-ignore a11y-missing-attribute -->
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/{videoId1}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    
    <h1>Video de Carlos Gata</h1>
    <div class="video-container">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/{videoId2}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
  
  <style>
  .app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
  
  h1 {
    color: #333;
  }
  
  .video-container {
  position: relative;
  width: 70%; /* Adjust this value to change the width of the video. */
  padding-bottom: 39.5%; /* This should be adjusted according to the width to maintain aspect ratio. In this case, it's 70% of 56.25%. */
  height: 0;
  overflow: hidden;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
  </style>
  