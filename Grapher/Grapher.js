/*!
 * Quickly draw graphs for functions given its limits
 *
 * @name	Grapher Class
 * @author	Guilherme Rossato
 * @link	https://github.com/GuilhermeRossato/JsAppHelpers/tree/master/Grapher
 * @year	2017
 *
 */

function Grapher(config = {}) {
	(function loadDefaultConfig() {
		(config.wrapper === undefined)		&& (config.wrapper = document.body);
		(config.pixelated === undefined)	&& (config.pixelated = false);
		(config.borderless === undefined)	&& (config.borderless = false);
		(config.width === undefined)		&& (config.width = 50);
		(config.height === undefined)		&& (config.height = 31);
		(config.left === undefined)			&& (config.left = 0);
		(config.size)						&& (config.width = config.size[0]);
		(config.size)						&& (config.height = config.size[1]);
		(config.rangeX)						&& (config.minX = config.rangeX[0]);
		(config.rangeX)						&& (config.maxX = config.rangeX[1]);
		(config.rangeY)						&& (config.minY = config.rangeY[0]);
		(config.rangeY)						&& (config.maxY = config.rangeY[1]);
		(config.minX === undefined)			&& (config.minX = 0);
		(config.maxX === undefined)			&& (config.maxX = 1);
		(config.minY === undefined)			&& (config.minY = 0);
		(config.maxY === undefined)			&& (config.maxY = 1);
		(config.f === undefined)			&& (config.f = config.generate);
	}());
	this.borderless = config.borderless;
	this.pixelated = config.pixelated;
	this.minX = config.minX;
	this.maxX = config.maxX;
	this.minY = config.minY;
	this.maxY = config.maxY;
	/* Document Elements */
	this.wrapper = document.createElement("div");
	this.domElement = this.wrapper;
	this.canvas = document.createElement("canvas");
	this.ctx = this.canvas.getContext("2d");
	/* Styles */
	this.canvas.width = config.width;
	this.canvas.height = config.height;
	this.setLeft(config.left);
	this.setSize(config.width, config.height);
	/* Appends */
	this.wrapper.appendChild(this.canvas);
	
	this.attach = function(object) {
		if (wrapper.parentNode)
			wrapper.parentNode.removeChild(wrapper);
		if (object && object.appendChild)
			object.appendChild(wrapper);
		else
			console.warn("Unable to append");
		return this;
	}

	if (config.wrapper === null) {
		setTimeout(()=>{
			if (!config.wrapper && !document.body)
				console.warn("Unable to append");
			else if (config.wrapper)
				config.wrapper.appendChild(this.wrapper);
			else
				document.body.appendChild(this.wrapper);
		}, 10);
	} else {
		config.wrapper.appendChild(this.wrapper);
	}
	if (config.f instanceof Function)
		this.drawFunction(config.f);
}

Grapher.prototype = {
	constructor: Grapher,
	setLeft: function(value) {
		if (typeof value === "string") {
			let padding = ((this.borderless)?0:3);
			this.wrapper.setAttribute("style", `margin:0; padding:${padding}px; position:absolute; left:${value}; bottom:0; background-color: #222200;`);
		} else if (typeof value === "number") {
			let padding = ((this.borderless)?0:3);
			this.wrapper.setAttribute("style", `margin:0; padding:${padding}px; position:absolute; left:${value}px; bottom:0; background-color: #222200;`);
		}
		return this;
	},
	setSize: function(width, height) {
		if (typeof width === "number" && typeof height === "number")
			this.canvas.setAttribute("style", `width: ${width}px; height: ${height}px; margin:0; padding:0; background-color: #333300; image-rendering: pixelated`);
		else
			throw new Error("Size types must both be number (width is "+(typeof width)+", height is "+(typeof height)+")");
		return this;
	},
	setRange: function(minX, maxX, minY, maxY) {
		if (typeof minX !== "number" && minX.minX !== undefined) {
			this.minX = minX.minX;
			this.maxX = minX.maxX;
			this.minY = minX.minY;
			this.maxY = minX.maxY;
		} else if (minX !== undefined && maxY !== undefined) {
			this.minX = minX;
			this.maxX = maxX;
			this.minY = minY;
			this.maxY = maxY;
		} else {
			console.warn("Unable to set range: ");
		}
		return this;
	},
	setFunction: function(f) {
		this.drawFunction(f);
		return this;
	},
	changeFunction: function(f) {
		this.drawFunction(f);
		return this;
	},
	drawFunction: function(f) {
		let SUBLINE_COUNT = 200;
		let ctx = this.ctx,
			width = this.canvas.width|0,
			height = this.canvas.height|0,
			sepHorizont = Math.max(1,((Math.floor((width-11)/10)/2)|0)*2),
			sepVertical = Math.max(1,((Math.floor((height-11)/10)/2)|0)*2),
			i;
		ctx.clearRect(-1,-1,width+2, height+2);
		let xValue, yValue, yHeight;
		ctx.lineWidth = 1;
		if (this.pixelated) {
			/* Dots from origin */
			ctx.strokeStyle = "#00DB00";
			ctx.beginPath();
			for (i = 1 ; i <= sepHorizont; i++) {
				ctx.moveTo((i*width/sepHorizont)|0+0.5, height-1);
				ctx.lineTo((i*width/sepHorizont)|0+0.5, height+1);
			}
			for (i = 1 ; i <= sepVertical; i++) {
				ctx.moveTo(1,Math.round(i*height/sepVertical)+0.5);
				ctx.lineTo(-1,Math.round(i*height/sepVertical)+0.5);
			}
			ctx.moveTo(width,0);
			ctx.lineTo(width-1,1);
			ctx.stroke();
			/* Middle helpers */
			ctx.lineWidth = 0.5;
			ctx.setLineDash([3,3]);
			ctx.beginPath();
			ctx.moveTo(((width/2)|0)+0.5,0);
			ctx.lineTo(((width/2)|0)+0.5,height);
			ctx.moveTo(0,((height/2)|0)+0.5);
			ctx.lineTo(width,((height/2)|0)+0.5);
			ctx.stroke();
			/* Function */
			ctx.setLineDash([]);
			ctx.fillStyle = "#DBDB00";
			ctx.beginPath();
			for (i = 0; i <= width; i++) {
				xValue = (this.minX + (this.maxX - this.minX) * (i/width));
				yValue = f(xValue);
				yHeight = Math.min(height-1,Math.max(1,Math.round(((yValue-this.minY)*height)/(this.maxY-this.minY))));
				ctx.fillRect(i,height-yHeight,1,1);
			}
		} else {
			/* Dots from origin */
			ctx.strokeStyle = "#00DB00";
			ctx.beginPath();
			for (i = 1 ; i <= sepHorizont; i++) {
				ctx.moveTo(i*width/sepHorizont, height-1);
				ctx.lineTo(i*width/sepHorizont, height+1);
			}
			for (i = 1 ; i <= sepVertical; i++) {
				ctx.moveTo(1,i*height/sepVertical);
				ctx.lineTo(-1,i*height/sepVertical);
			}
			ctx.moveTo(width,0);
			ctx.lineTo(width-1,1);
			ctx.stroke();
			/* Middle helpers */
			ctx.lineWidth = 0.5;
			ctx.setLineDash([3,3]);
			ctx.beginPath();
			ctx.moveTo(((width/2)|0)+0.5,0);
			ctx.lineTo(((width/2)|0)+0.5,height);
			ctx.moveTo(0,((height/2)|0)+0.5);
			ctx.lineTo(width,((height/2)|0)+0.5);
			ctx.stroke();
			/* Function */
			ctx.setLineDash([]);
			ctx.lineWidth = 1;
			ctx.strokeStyle = "#DBDB00";
			ctx.beginPath();
			let multiplier = SUBLINE_COUNT/width;
			for (i = 0; i <= SUBLINE_COUNT; i++) {
				xValue = (this.minX + (this.maxX - this.minX) * ((i/multiplier)/width));
				yValue = f(xValue);
				yHeight = Math.min(height-1,Math.max(1,(((yValue-this.minY)*height)/(this.maxY-this.minY))));
				if (i === 0)
					ctx.moveTo(i/multiplier, height-yHeight);
				else
					ctx.lineTo(i/multiplier, height-yHeight);
			}
			ctx.stroke();
		}
		return this;
	}
}