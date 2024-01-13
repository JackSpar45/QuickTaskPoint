var circle = document.querySelector(".dot");
var circles = document.querySelector(".small-dot");
var visible = true;
 function toggleVisibility() {
    // If the circle is visible, set its opacity to 0
    if (visible) {
        circle.style.opacity = 0;
      circles.style.opacity = 0;
    }
    // Otherwise, set its opacity to 1
    else {
      circles.style.opacity = 1;
      circle.style.opacity = 1;
    }
    visible = !visible;
    
  }setInterval(toggleVisibility, 550);
