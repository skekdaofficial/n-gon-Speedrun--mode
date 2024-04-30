javascript:(function() {
  var stopwatch = document.createElement('div');
  stopwatch.style.backgroundColor = '#fff';
  stopwatch.style.position = 'fixed';
  stopwatch.style.top = '0';
  stopwatch.style.right = '0';
  stopwatch.style.padding = '10px';
  stopwatch.style.border = '1px solid #000';
  stopwatch.style.fontSize = '20px';
  stopwatch.style.fontFamily = 'monospace';
  stopwatch.style.zIndex = '9999';
  stopwatch.innerHTML = '00:00:00.000';
  document.body.appendChild(stopwatch);
  var startTime = null;
  var lastPause = null;
  var wasPaused = false;
  var timePaused = 0;
  var stopwatchInterval = null;
  function startStopwatch() {
    document.body.removeEventListener('click', clickListener)
    startTime = new Date();
    stopwatchInterval = setInterval(function() {
      for (const obj of mob) {
        if (obj.hasRunDeathScript) {
          stopStopwatch();
          return;
        }
      }
      if (simulation.paused && !simulation.isChoosing) {
        if (!wasPaused) lastPause = new Date();
        wasPaused = true;
      } else {
        if (wasPaused) {
          timePaused += (new Date()) - lastPause;
          wasPaused = false;
        }
        var currentTime = new Date();
        var elapsedTime = currentTime - startTime - timePaused;
        var hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        var minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
        var seconds = Math.floor(elapsedTime / 1000) % 60;
        var milliseconds = elapsedTime % 1000;
        stopwatch.innerHTML = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : '' }${seconds}.${milliseconds < 10 ? '00' : (milliseconds < 100 ? '0' : '')}${milliseconds}`;
      }
    }, 1);
  }
  function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
  }
  const clickListener = document.body.addEventListener('click', startStopwatch);
})();
