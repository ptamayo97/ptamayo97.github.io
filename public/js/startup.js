/*!
 * Startup v1.0.5
 * Materialize theme
 * http://materializecss.com/themes.html
 * Personal Use License
 * by Alan Chang
 */

(function($) {
  $(document).ready(function() {
    /********************
     * Helper Functions *
     ********************/
    var debounce = function(fn, duration) {
      var timeout;
      return function() {
        var args = Array.prototype.slice.call(arguments),
          ctx = this;

        clearTimeout(timeout);
        timeout = setTimeout(function() {
          fn.apply(ctx, args);
        }, duration);
      };
    };

    /**
     * Returns duration function for scrollmagic.
     * @param {String} dataDuration
     * @param {String} defaultDuration
     * @param {Integer} multiple
     * @returns {Function}
     */
    var parseDuration = function(dataDuration, defaultDuration, multiple) {
      var string = dataDuration || defaultDuration;
      var multiple = multiple || 1;
      var parsedInt = parseInt(string);

      if (string.indexOf("%") >= 0) {
        var ratio = parsedInt / 100;
        return function() {
          return window.innerHeight * ratio * multiple;
        };
      } else if (parsedInt !== NaN) {
        return function() {
          return parsedInt * multiple;
        };
      } else {
        return function() {
          return window.innerHeight * multiple;
        };
      }
    };

    /**
     * Returns dynamic duration based on progress of scroll
     * @param {Integer} minDuration
     * @param {Integer} scrollDuration
     * @param {Integer} originalOffset
     * @returns {[Integer,Integer]} [Offset, Duration]
     */
    var dynamicOffsetAndDuration = function(
      minDuration,
      scrollDuration,
      originalOffset
    ) {
      var diff = $(window).scrollTop() - originalOffset;
      var ratio = 1 - diff / scrollDuration;
      var scrollDistance = scrollDuration;
      var offset = originalOffset + scrollDistance;
      var duration = Math.max(ratio * scrollDistance, minDuration);
      return [offset, duration];
    };

    /**
     * Reset tween or timeline variables (used for resize or disable)
     * @param {Object} tween
     * @param {Boolean} isTimeline
     */
    var resetTween = function(tween, isTimeline) {
      if (!!tween) {
        tween.progress(0);
        tween.invalidate();

        if (isTimeline) {
          var tweens = tween.getChildren();
          for (var k = 0; k < tweens.length; k++) {
            TweenMax.set(tweens[k].target, { clearProps: "all" });
          }
        } else {
          TweenMax.set(tween.target, { clearProps: "all" });
        }
      }
    };

    /**
     * Checks if element hasClass in a given string array.
     * @param {jQuery} el - The jQuery element we are checking.
     * @param {Array<String>} arr - The array of correct classes.
     */
    var hasClassInArray = function(el, arr) {
      for (var i = 0; i < arr.length; i++) {
        if (el.hasClass(arr[i])) {
          return true;
        }
      }
      return false;
    };

    /* End Helper Functions */

    // Read more button.
    $(".read-more")
      .off("click.read-more")
      .on("click.read-more", function() {
        var sectionHeight = $(this)
          .closest(".section")
          .outerHeight();
        var offset = sectionHeight || window.innerHeight;
        $("html, body").animate({ scrollTop: offset }, 1000);
      });

    // Disabled read more button.
    var disabledReadMoreScroll = function(el, ancestorSelector) {
      var ancestor = el.closest(ancestorSelector);
      var height = ancestor.outerHeight();
      var offset = ancestor.offset().top + height;
      $("html, body").animate({ scrollTop: offset }, 1000);
    };
    $(".horizontal-half-wrapper .read-more")
      .off("click.read-more")
      .on("click.read-more", function(e) {
        disabledReadMoreScroll($(this), ".horizontal-half-wrapper");
      });
    $(".flip-out-intro .read-more")
      .off("click.read-more")
      .on("click.read-more", function(e) {
        disabledReadMoreScroll($(this), ".flip-out-intro");
      });

    /***************
     * ScrollMagic *
     ***************/

    // init controller
    var controller = new ScrollMagic.Controller();

    // Transition definitions
    var transitionTypes = {
      blogTitle: "blogTitle",
      horizontalHalf: "horizontalHalf",
      zoomOut: "zoomOut",
      phoneWall: "phoneWall",
      flipOut: "flipOut",
      circleReveal: "circleReveal",
      shuffleOver: "shuffleOver",
      shuffleUnder: "shuffleUnder",
      staggeredElement: "staggeredElement",
      elementTransition: "elementTransition"
    };

    // Element transitions selectors
    var transformArray = [
      "scale",
      "up",
      "right",
      "down",
      "left",
      "rotate-y",
      "rotate-x"
    ];
    var propertyArray = ["fade", "lid-tilt", "phone-arc"];
    var buildTransitionSelectors = function(arr) {
      var selector = "";
      for (var i = 0; i < arr.length; i++) {
        if (i > 0) {
          selector += ", ";
        }
        selector += "." + arr[i] + "-in, ";
        selector += "." + arr[i] + "-in-out, ";
        selector += "." + arr[i] + "-out, ";
        selector += "." + arr[i] + "-out-in";
      }
      return selector;
    };
    var transformTransitionSelector = buildTransitionSelectors(transformArray);
    var transformTransitionsArray = transformTransitionSelector
      .replace(/[.]+/g, "")
      .split(", ");
    var elTransitionSelector =
      transformTransitionSelector +
      ", " +
      buildTransitionSelectors(propertyArray);
    var elTransitionArray = elTransitionSelector
      .replace(/[.]+/g, "")
      .split(", ");
    var oneWayTransitionsArray = elTransitionArray.filter(function(val) {
      return val.indexOf("in-out") < 0 && val.indexOf("out-in") < 0;
    });

    // keep track of all live tweens / scenes for resize event.
    var currentTransitions = {};
    var transitionId = 0;

    // Scroll Transition Plugin Methods
    var methods = {
      init: function(options) {
        var defaults = {
          duration: undefined,
          responsiveThreshold: 768,
          staggeredDelay: 0.8,
          reset: true
        };
        options = $.extend(defaults, options);

        var urlObjectId = window.location.hash.substring(1);

        return this.each(function(i) {
          var $this = $(this);
          var duration = $this.attr("data-duration") || options.duration;
          var responsiveThreshold =
            $this.attr("data-responsivethreshold") ||
            options.responsiveThreshold;
          var staggeredDelay =
            $this.attr("data-staggereddelay") || options.staggeredDelay;
          var reset = options.reset;

          // Don't init if child of staggered element transition
          if (
            $this.parent(".staggered-transition-wrapper").length &&
            hasClassInArray($this, elTransitionArray)
          ) {
            return;
          }

          var firstTime = false;
          var dataId = $this.attr("data-id");
          if (!dataId) {
            transitionId++;
            dataId = transitionId;
            $this.attr("data-id", dataId);
            firstTime = true;
          }

          // Shared variables
          var navbar = $("nav.navbar").first();
          var originalOffset = $this.offset().top;

          // Shared duration functions
          var getElHeight = parseDuration(duration, $this.outerHeight() + "px");
          var getHalfWindowHeight = parseDuration(duration, "50%");
          var getWindowHeight = parseDuration(duration, "100%");
          var getOneAndHalfWindowHeight = parseDuration(duration, "150%");

          // Shared navbar functions
          var toggleSolid = function(e) {
            if (e.scrollDirection === "FORWARD") {
              navbar.addClass("solid");
            } else {
              navbar.removeClass("solid");
            }
          };
          var toggleSolidFixed = function(e) {
            if (e.scrollDirection === "FORWARD") {
              navbar.removeClass("absolute");
              navbar.addClass("solid");
            } else {
              navbar.addClass("absolute");
              navbar.removeClass("solid");
            }
          };

          // Only initialize if past responsive threshold
          if (window.innerWidth >= responsiveThreshold) {
            /**************
             * BLOG TITLE *
             **************/
            if ($this.hasClass("title-transition")) {
              var fadeWrapper = $this.find(".fade-transition");

              // build tween
              var tween = TweenMax.to(fadeWrapper, 1, {
                scale: "0",
                opacity: 0,
                ease: Power2.easeIn
              });

              // build scene
              var scene = new ScrollMagic.Scene({
                triggerElement: $this[0],
                triggerHook: "onLeave",
                duration: getHalfWindowHeight
              })
                .setTween(tween)
                .addTo(controller);

              // Add to list
              currentTransitions[dataId] = {
                type: transitionTypes.blogTitle,
                sceneTweenPairs: [{ scene: scene, tween: tween }]
              };

              /****************
               * SHUFFLE OVER *
               ****************/
            } else if ($this.hasClass("shuffle-over-transition")) {
              var getDuration = parseDuration(duration, "100%");
              var heightOffset = $this.innerHeight() - window.innerHeight;

              // build scene
              var scene1 = new ScrollMagic.Scene({
                triggerElement: $this[0],
                triggerHook: "onLeave",
                duration: getDuration,
                offset: heightOffset
              })
                .setClassToggle($this[0], "z-depth-1")
                .setPin($this[0], { pushFollowers: false })
                .addTo(controller);

              // Add to list
              currentTransitions[dataId] = {
                type: transitionTypes.shuffleOver,
                sceneTweenPairs: [{ scene: scene1 }]
              };

              /*****************
               * SHUFFLE UNDER *
               *****************/
            } else if ($this.hasClass("shuffle-under-transition")) {
              // build scene

              var scene1 = new ScrollMagic.Scene({
                triggerElement: $this[0],
                triggerHook: "onEnter",
                duration: getElHeight
              })
                .on("end", function() {
                  $this.toggleClass("shuffle-under-end");
                })
                .setClassToggle($this[0], "shuffle-under-active")
                .setPin($this[0], { pushFollowers: false })
                .addTo(controller);

              // Add to list
              currentTransitions[dataId] = {
                type: transitionTypes.shuffleUnder,
                sceneTweenPairs: [{ scene: scene1 }]
              };

              /*********************************
               * STAGGERED ELEMENT TRANSITIONS *
               *********************************/
            } else if ($this.hasClass("staggered-transition-wrapper")) {
              var elementTransitions = $this.find(elTransitionSelector);
              var tweenElementTimeline = new TimelineMax();
              elementTransitions.each(function() {
                tweenElementTimeline.to(
                  this,
                  1,
                  { className: "+=active", ease: Power3.easeInOut },
                  "-=" + staggeredDelay
                );
              });

              var scene1 = new ScrollMagic.Scene({
                triggerElement: $this[0],
                triggerHook: "onEnter",
                duration: getElHeight
              })
                .setTween(tweenElementTimeline)
                .addTo(controller);

              // Add to list
              currentTransitions[dataId] = {
                type: transitionTypes.staggeredElement,
                sceneTweenPairs: [
                  {
                    scene: scene1,
                    tween: tweenElementTimeline,
                    isTimeline: true
                  }
                ]
              };

              /***********************
               * ELEMENT TRANSITIONS *
               ***********************/
            } else if (hasClassInArray($this, elTransitionArray)) {
              // For transforms, use parent as trigger wrapper to avoid movement of trigger.
              var triggerEl = $this[0];
              if (hasClassInArray($this, transformTransitionsArray)) {
                triggerEl = $this.parent()[0];
              }

              var reverse = !hasClassInArray($this, oneWayTransitionsArray);

              var tween = TweenMax.to($(this), 1, {
                className: "+=active",
                ease: Power3.easeInOut
              });
              var scene1 = new ScrollMagic.Scene({
                triggerElement: triggerEl,
                triggerHook: "onEnter",
                duration: getElHeight,
                offset: 100,
                reverse: reverse
              })
                .setTween(tween)
                .addTo(controller);

              // Add to list
              currentTransitions[dataId] = {
                type: transitionTypes.elementTransition,
                sceneTweenPairs: [{ scene: scene1, tween: tween }]
              };
            }

            currentTransitions[dataId].class = $this.attr("class");
          } else {
            // Disable under responsive threshold
            $this.attr("data-disabled", true);
          }

          // Resize
          var debouncedResize = debounce(function() {
            var windowWidth = window.innerWidth;
            var disabled = $this.attr("data-disabled") === "true";

            if (disabled) {
              if (window.innerWidth >= responsiveThreshold) {
                // Enable over responsive threshold
                $this.attr("data-disabled", false);
                $this.scrollTransition({ reset: false });
              }
            } else {
              var type = currentTransitions[dataId].type;
              var sceneTweenPairs = currentTransitions[dataId].sceneTweenPairs;

              for (var j = 0; j < sceneTweenPairs.length; j++) {
                var tween = sceneTweenPairs[j].tween;
                var isTimeline = sceneTweenPairs[j].isTimeline === true;
                var scene = sceneTweenPairs[j].scene;

                if (window.innerWidth < responsiveThreshold) {
                  // Disable under responsive threshold
                  $this.attr("data-disabled", true);
                }

                resetTween(tween, isTimeline);
                scene.destroy(true);
              }

              if ($this.attr("data-disabled") !== "true") {
                $this.scrollTransition({ reset: false });
              }
            }
          }, 400);

          $(window)
            .off("resize.scrollTransition" + dataId)
            .on("resize.scrollTransition" + dataId, debouncedResize);
        });
      },
      // Custom methods.
      destroy: function() {
        var $this = $(this);
        var dataId = $this.attr("data-id");

        var type = currentTransitions[dataId].type;
        var sceneTweenPairs = currentTransitions[dataId].sceneTweenPairs;

        for (var j = 0; j < sceneTweenPairs.length; j++) {
          var tween = sceneTweenPairs[j].tween;
          var isTimeline = sceneTweenPairs[j].isTimeline === true;
          var scene = sceneTweenPairs[j].scene;

          $this.attr("data-disabled", true);
          resetTween(tween, isTimeline);
          scene.destroy(true);
        }

        // Reset plugin values
        $this.attr("data-id", "");
        delete currentTransitions[dataId];
        $(window).off("resize.scrollTransition" + dataId);
      }
    };

    // Scroll Transition Plugin
    $.fn.scrollTransition = function(methodOrOptions) {
      if (methods[methodOrOptions]) {
        return methods[methodOrOptions].apply(
          this,
          Array.prototype.slice.call(arguments, 1)
        );
      } else if (typeof methodOrOptions === "object" || !methodOrOptions) {
        // Default to "init"
        return methods.init.apply(this, arguments);
      } else {
        $.error(
          "Method " +
            methodOrOptions +
            " does not exist on jQuery.scrollTransition"
        );
      }
    }; // Plugin end

    // Init Scroll Transitions
    $(".shuffle-over-transition").scrollTransition();
    $(".shuffle-under-transition").scrollTransition();
    $(elTransitionSelector).scrollTransition();

    // Navbar scroll transitions
    $(window).on("scroll.navbar", function() {
      var navbar = $("nav.navbar").first();
      if (navbar.hasClass("navbar-solid-transition")) {
        if ($(window).scrollTop() > 0) {
          navbar.addClass("solid");
        } else {
          navbar.removeClass("solid");
        }
      }
    });

    // Masonry Blog.
    var $masonry = $(".masonry-grid");
    if ($masonry.length) {
      $masonry.imagesLoaded(function() {
        $masonry.masonry({
          columnWidth: ".col",
          itemSelector: ".col"
        });
      });
    }
  });
})(jQuery);
