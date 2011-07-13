// Copyright (c) 2010 Ivan Vanderbyl
// Originally found at http://ivan.ly/ui
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

(function( $ ){
  var methods = {
    animate: function(opt){ 
      opt = $.extend({}, jQuery.fn.animateProgress.defaults, opt);

      return this.each(function() {
        $(this).animate({
          width: opt.progress+'%'
        }, {
          duration: opt.duration, 

          // swing or linear
          easing: 'swing',

          // this gets called every step of the animation, and updates the label
          step: function( progress ){
            var labelEl = $('.ui-label', this),
            valueEl = $('.value', this);

            if(opt.label != undefined){ labelEl.text(opt.label); }

            if (Math.ceil(progress) < 20 && $('.ui-label', this).is(":visible")) {
              labelEl.hide();
            }else{
              if (labelEl.is(":hidden")) {
                labelEl.fadeIn();
              };
            }

            if (Math.ceil(progress) == 100) {
              labelEl.text('Done');
              setTimeout(function() {
                labelEl.fadeOut();
              }, 500);
            }
            valueEl.text(Math.ceil(progress) + '%');
          },
          complete: function(scope, i, elem) {
            if ('callback' in opt && typeof(opt.callback) == 'function') {
              opt.callback.call(this, i, elem );
            };
          }
        });
      });
    },
    
    // update label
    label: function(text){
      var labelEl = $('.ui-label', this);
      if(text != undefined){ labelEl.text(text); }
    }
  };

  // Simple wrapper around jQuery animate to simplify animating progress from your app
  // Inputs: 
  //  progress:     Progress as a percent
  //  label:      label text 
  //  duration:     animation speed
  //  callback:     Callback function
  // TODO: Add options and jQuery UI support.
  $.fn.animateProgress = function(method){ 
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    }
    else if ( typeof method === 'object' || ! method ) {
      return methods.animate.apply( this, arguments );
    }
    else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.animateProgress' );
    }
  }; 

  jQuery.fn.animateProgress.defaults = {
    label:    undefined,
    progress:   7,
    callback:   undefined,
    duration:   2000
  };


})( jQuery );
