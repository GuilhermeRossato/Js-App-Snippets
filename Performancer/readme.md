# Performancer

A fast tool to graphically display delay in milliseconds of an update function. Can also be interpreted as a continous array of numbers between 0 and 256.

Basically a faster, millisecond-only version of the performance monitor [stats.js](https://github.com/mrdoob/stats.js/) made originally by mrdoob

[Click here to run the demo](https://rawgit.com/GuilhermeRossato/JsAppHelpers/master/Performancer/demo.html)  
[Get the source here](https://github.com/GuilhermeRossato/JsAppHelpers/tree/master/Performancer/Performancer.js)

# Preview

![Visual Example](https://rawgit.com/GuilhermeRossato/JsAppHelpers/master/Performancer/demo.gif)

# Class Specification

```C#
// Methods
	Performancer(object config)	// Constructor
	.setLeft(int/string left)	// Recalculates the style with a specific "left: {argument}" entry
	.update(int delta)		// Display the number at the next available position
	.attach(element)			// Attaches wrapper to a specific HTMLDomElement
	.reset()				// Clears the canvas
// Properties
	.wrapper (HTMLDivElemnt)
// Note: All methods (except update) return itself (or throw error) so that you can cascate functions.
```

# Usage Example

```javascript
// Variant 1
let performancer = new Performancer();
performancer.update(16);
performancer.update(17);
performancer.update(16);
performancer.update(14);
performancer.update(150);
performancer.update(16);
performancer.update(32);
performancer.update(64);
performancer.update(82);
performancer.update(17);

// Variant 2
let performancer = new Performancer({
	left: "1.5em",				// Default is 0
	zIndex: 2,				// Default is 0
	compact: true,				// Default is false
	unclickable: true,			// Default is false
	hasLabel: false,			// Default is true
	wrapper: document.body		// Default is document.body already
});
performancer.update(300);
performancer.update(150);
performancer.update(75);
performancer.update(25);
performancer.update(1);

// Variant 3
let performancer = new Performancer({
	compact: (getCookie("is_compact") !== "0"),
	left:81,			// 81 is the hardcoded width (75px canvas + 6px wrapper padding)
	onCompactChange: function(compact) {
		setCookie("is_compact", compact?"1":"0", 30);
	}
});
startTime = performance.now();
setInterval(()=>performancer.update(-startTime+(startTime = performance.now())), 75);

// Observation: Each variant is a possibility, the arguments for config are non-exclusive: each can be used independently from each other.
// Note: Do not call your variable "performance" (without the final r), that object is already declared (window.performance)
```