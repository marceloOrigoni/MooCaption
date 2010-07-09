mooltiselect
===========

	- mooCaption adds captions to images, with various effects, and any position. The Caption can fade in, slide it, or be always present. Inspired in jQuery Captify Plugin, by Brian Reavis
	  
How to use
----------

	1.	Create the element list, that will become the mooltiselect. 
		<img src="./images/black_180x150.gif" alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit." class="capt" />
		the alt in what it's going to be displayed in the caption.
	2.  Call mooCaption.
		here the default values.
		#JS
		var captions = new mooCaption({
			speedOver: 'short',					// speed of the mouseover effect # short' - 250ms # 'normal' - 500ms # 'long' - 1000ms, or any number od ms
			speedOut: 'normal',					// speed of the mouseout effect # short' - 250ms # 'normal' - 500ms # 'long' - 1000ms, or any number od ms
			mode: 'slide',						// 'fade', 'slide', 'on', 'random', if random selected, any of the other 3 effects will be applied.
			classposition: 'caption',			// the name of the CSS class to apply to the caption box         
			position: 'bottom',					// position of the caption (top or bottom)
			images: 'capt',						// class of the images, if blank, all images in the page.
			opacity: '0.7'						// Only used with the fade mode, set the final opacity of the caption.
		});
	
	3. captionize!.
		Yeah, 1 extra step, but I love to call it this way.
		#JS
		captions.captionize();
