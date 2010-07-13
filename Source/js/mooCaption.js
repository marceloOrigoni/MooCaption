/*
---
description:     
  - mooCaption adds captions to images, with various effects, and any position. The Caption can fade in, slide it, or be always present. Inspired in jQuery Captify Plugin, by Brian Reavis

authors:
  - Marcelo Origoni

version:
  - 1.1

license:
  - MIT-style license

requires:
  - core/1.2.1:   '*'
  
provides:
  - mooCaption
...
*/

var mooCaption = new Class({
	Implements: [Options,Events],
	options: {
			speedOver: 'short',							// speed of the mouseover effect # short' - 250ms # 'normal' - 500ms # 'long' - 1000ms, or any number od ms
			speedOut: 'normal',							// speed of the mouseout effect # short' - 250ms # 'normal' - 500ms # 'long' - 1000ms, or any number od ms
			mode: 'slide',								// 'fade', 'slide', 'on', 'random', if random selected, any of the other 3 effects will be applied.
			classposition: 'caption',					// the name of the CSS class to apply to the caption box         
			position: 'bottom',							// position of the caption (top or bottom)
			slideFrom: 'normal', 						// 'normal', 'left', 'right'. Only applicable to slide mode, sets where the caption shoudl slide from.
			images: 'capt',								// class of the images, if blank, all images in the page.
			opacity: '0.7',								// Only used with the fade mode, set the final opacity of the caption.
			transition: 'Quart.easeIn'					// Sets de Fx.Transitions Method, used to display the caption, check http://www.mootools.net/docs/core/Fx/Fx.Transitions for more info.
	},
	
	initialize: function(options) {
		this.setOptions(options);
	},
	
	captionize: function(properties){
		
		var speedOver, speedOut, mode, classposition, position, images, opacity, from;
		var div, divCon, imgTmp, styles, random,randomnumber, br;	
		var modes = new Array('slide', 'fade', 'on');
		
		if(properties){ 
			speedOver = properties.speedOver ? properties.speedOver : this.options.speedOver;
			speedOut = properties.speedOut ? properties.speedOut : this.options.speedOut;
			mode = properties.mode ? properties.mode : this.options.mode;
			classposition = properties.classposition ? properties.classposition : this.options.classposition;
			position = properties.position ? properties.position : this.options.position;
			images = properties.images ? properties.images : this.options.images;
			opacity = properties.opacity ? properties.opacity : this.options.opacity;
			slideFrom = properties.slideFrom ? properties.slideFrom : this.options.slideFrom;
			trans =  properties.transition ? properties.transition : this.options.transition;
		}else{
			speedOver = this.options.speedOver;
			speedOut = this.options.speedOut;
			mode = this.options.mode;
			classposition = this.options.classposition;
			position = this.options.position;
			images = this.options.images;
			opacity = this.options.opacity;
			slideFrom = this.options.slideFrom;
			trans = this.options.transition;
		}		

		var transType = trans.split(".")[0];
		var transMode = trans.split(".")[1];
		
		switch(transType){
			case 'Quad':
				trans = new Fx.Transition(Fx.Transitions.Quad);
			break;
			case 'Cubic':
				trans = new Fx.Transition(Fx.Transitions.Cubic);
			break;
			case 'Quart':
				trans = new Fx.Transition(Fx.Transitions.Quart);			
			break;
			case 'Quint':
				trans = new Fx.Transition(Fx.Transitions.Quint);			
			break;
			case 'Expo':
				trans = new Fx.Transition(Fx.Transitions.Expo);			
			break;
			case 'Circ':
				trans = new Fx.Transition(Fx.Transitions.Circ);			
			break;
			case 'Sine':
				trans = new Fx.Transition(Fx.Transitions.Sine);			
			break;
			case 'Back':
				trans = new Fx.Transition(Fx.Transitions.Back);			
			break;
			case 'Bounce':
				trans = new Fx.Transition(Fx.Transitions.Bounce);			
			break;
			case 'Elastic':
				trans = new Fx.Transition(Fx.Transitions.Elastic);			
			break;
			default:
				trans = new Fx.Transition(Fx.Transitions.Quad);
		}
		
		switch(transMode){
			case 'easeIn':
				trans = trans.easeIn;
			break;
			case 'easeOut':
				trans = trans.easeOut;
			break;
			case 'easeInOut':
				trans = trans.easeInOut;
			break;
			default: trans = trans.easeIn;
		}
		
		var images = $$('.' + images);		
		images.each(function(img, i){
			div = new Element('div', {
				'id': 'title' + i,
				'class': classposition
			});

			divCon = new Element('div', {
				'id': 'con' + i,
			});
			
			br = new Element('br');
			
			divCon.setStyle('height', $(img).getStyle('height'));
			divCon.setStyle('width', $(img).getStyle('width'));
			divCon.setStyle('margin', $(img).getStyle('margin'));
			divCon.setStyle('float', 'left');
			divCon.setStyle('overflow', 'hidden');
			
			$(img).setStyle('margin', '0');
			$(img).setStyle('border', 'none');
			
			imgTmp = $(img).clone();
			imgTmp.setProperty('index', i);
			
			div.setProperty('text', $(img).getProperty('alt'));
			
			imgTmp.injectInside(divCon);
			br.injectInside(divCon);
			div.injectInside(divCon);

			if(position == 'top'){
				var margin = $(divCon).getStyle('height').toInt();
				margin += $(div).getStyle('height').toInt();
				$(div).setStyle('top', '-' + margin + 'px');
			}				
			
			$(divCon).replaces($(img));
			
			if(mode == 'random'){
					randomnumber=Math.floor(Math.random()*3);
					mode = modes[randomnumber];
					random = true;			
			}
			
			switch(mode){
				case 'slide':

					switch(slideFrom){
						case 'left':
							if(position =='top'){
								$(div).setStyle('top','-' + $(divCon).getStyle('height').toInt() + 'px');
							}else{
								$(div).setStyle('top','-' + $(div).getStyle('height').toInt() + 'px');
							}
							$(div).setStyle('right',$(div).getStyle('width').toInt() + 'px');
						break;
						case 'right':
							if(position =='top'){
								$(div).setStyle('top','-' + $(divCon).getStyle('height').toInt() + 'px');
							}else{
								$(div).setStyle('top','-' + $(div).getStyle('height').toInt() + 'px');
							}
							$(div).setStyle('left',$(div).getStyle('width').toInt() + 'px');						
						break;
						case 'normal':
							if(position == 'top'){
								var to, margin;
								margin = $(div).getStyle('height').toInt();
								to = margin + $(divCon).getStyle('height').toInt();
								$(div).setStyle('top', '-' + to + 'px');
							}else{
								$(div).setStyle('top', '-0px');
							}
						break;						
					}			
					
					$(div).setStyle('opacity',opacity);					
					$(divCon).addEvent('mouseover', function(){
						var from, to, width;
						img = $(this).getFirst('img');
						var titleDiv = $('title' + $(img).getProperty('index'));
						margin = $(titleDiv).getStyle('height').toInt();
						width = $(titleDiv).getStyle('width').toInt();
						var Slide = new Fx.Tween($(titleDiv),{
								duration: speedOver,
								transition: trans
							});

						switch(slideFrom){
							case 'normal':
								if(position == 'top'){
									from = margin + $(this).getStyle('height').toInt();
									to = + $(this).getStyle('height').toInt();
									Slide.start('top', '-' + from + 'px', '-' + to + 'px');
								}else{
									Slide.start('top', '0', '-' + margin + 'px');
								}
							break;
							case 'left':
								Slide.start('right', width + 'px','0');
							break;
							case 'right':
								Slide.start('left', width + 'px','0');
							break;
						}							
						
					});

					$(divCon).addEvent('mouseout', function(){
						var from, to, width;
						img = $(this).getFirst('img');
						var titleDiv = $('title' + $(img).getProperty('index'));
						margin = $(titleDiv).getStyle('height').toInt();
						width = $(titleDiv).getStyle('width').toInt();
						var Slide = new Fx.Tween($(titleDiv),{
								duration: speedOut,
								transition: Fx.Transitions.Bounce.easeOut
							});

						switch(slideFrom){
							case 'normal':
								if(position == 'top'){
									to = margin + $(this).getStyle('height').toInt();
									from = + $(this).getStyle('height').toInt();
									Slide.start('top', '-' + from + 'px', '-' + to + 'px');
								}else{
									Slide.start('top', '-' + margin + 'px', '0');
								}
							break;
							case 'left':
								Slide.start('right', '0',  width + 'px');
							break;
							case 'right':
								Slide.start('left', '0', width + 'px');
							break;
						}							

					});
					if(random){
						mode = 'random';
					}
					break;
				case 'fade':
					if(position =='top'){
						$(div).setStyle('top','-' + $(divCon).getStyle('height').toInt() + 'px');
					}else{
						$(div).setStyle('top','-' + $(div).getStyle('height').toInt() + 'px');
					}
					$(div).setStyle('opacity', '0');
					
					$(divCon).addEvent('mouseover', function(){
						img = $(this).getFirst('img');
						var titleDiv = $('title' + $(img).getProperty('index'));					
						var Fade = new Fx.Tween($(titleDiv),{
								duration: speedOut,
								transition: Fx.Transitions.Bounce.easeOut
							});						
						Fade.start('opacity', opacity);
					});

					$(divCon).addEvent('mouseout', function(){
						img = $(this).getFirst('img');
						var titleDiv = $('title' + $(img).getProperty('index'));
						var Fade = new Fx.Tween($(titleDiv),{
								duration: speedOut,
								transition: Fx.Transitions.Bounce.easeOut
							});						
						Fade.start('opacity', 0);
					});
					if(random){
						mode = 'random';
					}
					break;
				case 'on':
					if(position =='top'){
						$(div).setStyle('top','-' + $(divCon).getStyle('height').toInt() + 'px');
					}else{
						$(div).setStyle('top','-' + $(div).getStyle('height').toInt() + 'px');
					}
					$(div).setStyle('opacity',opacity);
					if(random){
						mode = 'random';
					}					
					break;					
			}
			
				
		
		});
	}
});