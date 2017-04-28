# Cookie/CookieFunctions

A small snippet with 2 functions to use cookies that gives supports to localhost by falling to LocalStorage when necessary.

[Click here to run the demo](https://rawgit.com/GuilhermeRossato/JsAppHelpers/master/Cookie/demo.html)  
[Get the source here](https://github.com/GuilhermeRossato/JsAppHelpers/tree/master/Cookie/CookieFunctions.js)

# Functions Specification

```c++
getCookie(string cookieName)								// Returns the string saved on a specific cookie-name
setCookie(string cookieName, string value[, int numDays])	// Saves the string "value" to the cookie named by "cookieName" for "numDays (default: 1)" days
```


# Usage Example

```javascript
	let name = getCookie("username");
	if (name != "") {
		alert(`Hello ${user}`);
	} else {
		name = prompt("Enter your name:", "");
		if (name != undefined && name != "" && name != null) {
			setCookie("username", name, 30); // Saves the cookie for 30 days
		}
	}
```