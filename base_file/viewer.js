

/* Open when someone clicks on the span element */
function openViewer() {
  document.getElementById("oc").innerHTML = `
    <model-viewer
      src="${GLBsrc}"
      ios-src="${USDZsrc}"
      background-color="#bbbbbb"
      shadow-intensity="1"
      camera-controls
      auto-rotate
      ar
      quick-look-browsers="safari chrome"
      style="position:absolute; left:0; top:0; margin:0; padding:0; width:100%; height:100%;"
      id="viewer-singleton"
    >
    </model-viewer>        `;



  document.getElementById("myNav").style.width = "100%";

  // Do what you want
  (() => {
    console.log('just for fun')
  })();
}



openViewer();
