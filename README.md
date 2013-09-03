webinos-driver-obd2
===================

Implementation is similar to the Vehicle Specification on http://dev.webinos.org/specifications/draft/vehicle.html

Clone the webinos-driver-obd2 in the webinos-api-iot/node_modules 

To test the testbed to view the OBD data open the testbed in for webinos-api-iot and view the output of the OBD Values.

Running OBD Simulator Part:
----------------------------
$  apt-cache search obd
$  sudo apt-get install obdgpslogger
$  obdsim-o or only run the command --> obdsim

Two changes to be done in Config.json in webinos-driver-obd2 folder 
1.) Change the serial port communication in webinos-driver-obd2 config.json /dev/pts/2 or /dev/tty/ according to the serial port number if you have a serial port communication method of obd.
2.) Change the connection type from “simulator” to “obd” in the same file.

