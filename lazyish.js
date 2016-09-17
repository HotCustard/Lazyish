(function(){

  // get all the images with data-srcset
  var images = document.querySelectorAll('[data-srcset]');

  // assuminmg we found some
  if(images.length > 0) {

    var loadedClass = 'lazy-loaded';

    var getViewRange = function(){
      return [window.scrollY, window.scrollY + window.innerHeight];
    };

    var update = function(image){
      var srcset = image.getAttribute('data-srcset');
      if(srcset){
        image.setAttribute('srcset', srcset);
        image.classList.add(loadedClass);
      }
    };

    var startViewRange = getViewRange();
    Array.prototype.forEach.call(images, function(image){
      var x = 0;
      ele = image;
      while(ele){
         x += ele.offsetTop;
         ele = ele.offsetParent;
      }
      if(x >= startViewRange[0] && x <= startViewRange[1]) update(image);
    });

    var evOpt = { passive: true };
    var showRemaining = function() {
      if(startViewRange[0] !== getViewRange()[0]){
        window.removeEventListener('scroll', showRemaining, evOpt);
        Array.prototype.forEach.call(images, function(image){
          if(!image.classList.contains(loadedClass)) update(image);
        });
      }
    }

    //Hook up scroll event, listen to first fire only then remove listener.
    window.addEventListener('scroll', showRemaining, evOpt);

  }

})();
