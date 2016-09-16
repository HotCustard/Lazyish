# Lazyish
Minimal impact lazy loading for image srcset.

## Usage
Mark up images with a "data-srcset" attribute.

When ran lazyish checks if the image is in the viewport, if it is its srcset is set, if not its set on the first scroll event. 

This approach keeps inital page load fast, and saves listening to the scroll event, which can cause issues on some devices.
