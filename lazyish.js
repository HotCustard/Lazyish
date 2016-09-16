
(function(){

  // get all the images with data-srcset
  var images = document.querySelectorAll('[data-srcset]');
  if(images.length > 0) {

    var loadedClass = 'lazy-loaded';

    //Determine height of the viewport
    var vH = window.innerHeight;

    //Set up the update function
    var update = function(image){
      var srcset = image.getAttribute('data-srcset');
      if(srcset){
        image.setAttribute('srcset', srcset);
        image.classList.add(loadedClass);
      }
    };

    Array.prototype.forEach.call(images, function(image){
      var x = 0;
      var ele = image;
      while(ele){
         x += ele.offsetTop;
         ele = ele.offsetParent;
      }
      if(x <= vH) update(image);
    });

    var evOpt = { passive: true, once: true };

    var showRemaining = function() {
      window.removeEventListener('scroll', showRemaining, evOpt);
      Array.prototype.forEach.call(images, function(image){
        if(!image.classList.contains(loadedClass)) update(image);
      });
    }

    //Hook up scroll event, listen to first fire only then remove listener.
    window.addEventListener('scroll', showRemaining, evOpt);

  }

})();
