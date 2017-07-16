# State Machine

A class to simplify a state machine in javascript, similar to machina.js but easy to digest and faster to run

Example of usage:
```javascript
var sm = new StateMachine({
 waiting: {
    onExit: ()=>{console.log("stopped waiting")}
 },
 working: {
   onEnter: ()=>{console.log("started working")},
   iterate: ()=>{assert(this.states.working.iterate instanceof Function)}
 }); 

assert(sm.state === "working"); // should starts at first defined state
sm.state = "working"; // prints both logs
sm.state = "waiting"; // prints one log
sm.states.working.iterate(); // one way to reach that function
console.log(sm.states[sm.state].onExit?"Current State has onExit":"Current state doesn't have onExit");
```

To make another class behave like a state machine, do this on its constructor:
  StateMachine.call(this, {...});
Where {...} is the object with states to be used