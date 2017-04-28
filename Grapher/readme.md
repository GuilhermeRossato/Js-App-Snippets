# Grapher

A tool to quickly draw graphs given a function and its limit

[Click here to run the demo](https://rawgit.com/GuilhermeRossato/JsAppHelpers/master/Grapher/demo.html)  
[Get the source here](https://github.com/GuilhermeRossato/JsAppHelpers/tree/master/Grapher/Grapher.js)

# Preview

![Visual Example](https://rawgit.com/GuilhermeRossato/JsAppHelpers/master/Grapher/demo.png);

# Class Specification

```C#
// Methods
	Grapher(object config)		// Constructor
	setLeft(string left)
	setSize(int width, int height)
	setRange(float minX, float maxX, float minY, float maxY)
	attach(element)				// Attaches wrapper to a specific HTMLDomElement
	setFunction(function f)		// Redraws with given function (Note: keeps past range)
	changeFunction(function f)	// Same as above
	drawFunction(function f)	// Same as above
// Properties
	.wrapper (HTMLDivElemnt)
	.canvas (HTMLCanvasElement)
	.ctx (CanvasRenderingContext2d)
	.borderless (bool)		// Must run setSize() after changing manually
	.pixelated (bool)		// Must run drawFunction() after changing manually
	.minX (float)			// Same as above
	.maxX (float)			// Same...
	.minY (float)
	.maxY (float)
// Note: All methods return itself (or throw error) so that you can cascate functions.
```

# Usage Example

```javascript
// Variant 1
let graph = new Grapher({
	f:(x)=>x*x,			// Not required, but it won't draw if you ommit this
	rangeX: [0,2],			// Optional, default: [0, 1]
	rangeY: [0,4],			// Optional, default: [0, 1]
	width: 75,			// Optional, default: 49
	height: 50,			// Optional, default: 31
	wrapper: document.body,		// Optional, default: document.body
	pixelated: false,		// Optional, default: false
	left: 0				// Optional, default: 0
});

// Variant 2
let myFunc = (x)=>2*x*(x-3);
let my_second_graph = new Grapher({
	f:myFunc,
	minX:-2,
	maxX:2,
	minY:myFunc(-2),	// same as rangeY but only one axis is set
	maxY:myFunc(2),
	pixelated: true,	// pixelated is generally faster to render
	borderless: true,	// hides 3px border (very crude-looking, but width becomes accurate)
	left: "84px",
	width: 55
})

// Variant 3
new Grapher({
	f: function(x) {
		if (x < 0.5) {
			return x*(x-0.1)*(x+2);
		} else {
			return (1.5-x)*(x-0.25)
		}
	},
	height: 100,
	left: 85+60
});

// Variant 4
(new Grapher({
	rangeX: [-3.3, 4.1],
	minY: -8,
	maxY: 14
})).setFunction(function(x) {
		return ((x-4)*(x-2)*(x+2)*(x+3))/4;
}).setLeft("13em").setSize(200, 100)
```