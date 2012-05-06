# Anduino Copter Reporter

## Summary

A realtime reporter for error messages, flight data, and eventually images. The application is based on node.js, and uses socket.io for realtime reporting. Compatible with Noah Young and Kevin Hughes' [AnduinoCopter][8] project. 

## Installation

Assuming you have [node.js][6] and [npm][7] installed you can install with

    git clone git@github.com:hbarrington/AnduinoCopter-Reporter.git
    cd AnduinoCopter-Reporter
    npm install

Then you can start the server with

    node app.js

Then open `http://0.0.0.0:1337` in your favorite browser.

## Credits

There are quite a few tecnologies and libraries used in the demo. Thank you! Also thanks to [George Ornbo][9] for his example code and README template :)

* [socket.io][1]
* [stylus][2]
* [jade][3]
* [express][4]
* [smoothie.js][5]
* [node.js][6]
* [npm][7]

[1]: https://github.com/LearnBoost/Socket.IO
[2]: https://github.com/LearnBoost/stylus
[3]: https://github.com/visionmedia/jade/
[4]: https://github.com/visionmedia/express
[5]: http://smoothiecharts.org/
[6]: https://github.com/joyent/node
[7]: https://github.com/isaacs/npm
[8]: https://github.com/hbarrington/AnduinoCopter
[9]: https://github.com/shapeshed/counter
