# Grapher

A Class used to quickly draw graphs given a function and its limit

[Click here to run the demo](https://rawgit.com/GuilhermeRossato/JsAppHelpers/master/Grapher/demo.html)

# Preview

![Visual Example](https://rawgit.com/GuilhermeRossato/JsAppHelpers/master/Grapher/demo.png);

# Usage Example

```javascript
	// Variant 1
	let graph = new Grapher({
		f:(x)=>x*x,				// Required
		rangeX: [0,2],			// Optional, default: [0, 1]
		rangeY: [0,4],			// Optional, default: [0, 1]
		width: 75,				// Optional, default: 49
		height: 50,				// Optional, default: 31
		wrapper: document.body,	// Optional, default: document.body
		pixelated: false,		// Optional, default: false
		left: 0					// Optional, default: 0
	});

	// Variant 2
	let myFunc = (x)=>2*x*(x-3);
	let my_second_graph = new Grapher({
		f:myFunc,
		minX:-2,
		maxX:2,
		minY:myFunc(-2),	// same as rangeY but only one axis is set
		maxY:myFunc(2),
		pixelated: true,
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