/*******************************************************************************
 *  Code contributed to the webinos project
 * 
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *  
 *     http://www.apache.org/licenses/LICENSE-2.0
 *  
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * Copyright 2012 Telecom Italia SpA
 * Copyright 2013 TU Munich - Author: Krishna Bangalore
 * Copyright 2013 UNICT - Author: Giuseppe
 ******************************************************************************/


(function () {
    'use strict';

    var driverId = null;
    var registerFunc = null;
    var removeFunc = null;
    var callbackFunc = null;

    var elementsList = new Array;

    elementsList[0] = {
        'type': 'rpm',
        'name': 'rpm',
        'description': 'RPM',
        'sa': 0,
        'interval': 1000,
        'value': 10,
        'running': false,
        'id': 0
    };

    elementsList[1] = {
        'type': 'vss',
        'name': 'vss',
        'description': 'Speed',
        'sa': 0,
        'interval': 1000,
        'value': 55,
        'running': false,
        'id': 0
    };

    exports.init = function(dId, regFunc, remFunc, cbkFunc) {
        console.log('ODB driver init - id is '+dId);
        driverId = dId;
        registerFunc = regFunc;
        removeFunc = remFunc;
        callbackFunc = cbkFunc;
        setTimeout(intReg, 2000);
    };

    var OBDReader;
    var OBDport;

    function start(obdConnector) {

        if (obdConnector.type === 'bluetooth') {
            OBDReader = require('bluetooth-obd');
            OBDport = new OBDReader(obdConnector.address, obdConnector.channel);
        } else if (obdConnector.type === 'serial') {
            OBDReader = require('serial-obd');
            OBDport = new OBDReader(obdConnector.serialPort, obdConnector.options);
        }
 
     OBDport.on('dataReceived', function (data) {
            switch (data.name) {
                case "rpm":
                    if (typeof _listeners.rpm != 'undefined') {
                        _listeners.rpm(new RPMEvent(data.value));
                    }
                    break;
                case "vss":
                    if (typeof _listeners.vss != 'undefined') {
                        _listeners.vss(new SpeedEvent(data.value));
                    }
                    break;
 		default:
                    if(data.value === "OK" || data.value === "NO DATA") {
                        break;
                    } else if (data.value === "?") {
                        console.log('Unknown answer!');
                    } else {
                        console.log('No supported pid yet:');
                        console.log(data);
                    }

                    break;
            }
        });

        
         // On connected, start polling.
         
        OBDport.on('connected', function () {
            //For now start polling here.
            //TODO: When all listeners are disabled, stopPolling. Etc.
            console.log('OBD-II device is connected');
            this.startPolling(1000);
        });

        OBDport.connect();
    }


    exports.execute = function(cmd, eId, data, errorCB, successCB) {
        //console.log('Fake driver 1 data - element is '+eId+', data is '+data);
        switch(cmd) {
            case 'cfg':
                //In this case cfg data are transmitted to the sensor/actuator
                //this data is in json(???) format
                console.log('ODB driver - Received cfg for element '+eId+', cfg is '+ JSON.stringify(data));
                var index = -1;
                for(var i in elementsList) {
                    if(elementsList[i].id == eId)
                        index = i;
                }; 
                elementsList[index].interval = data.rate;
                successCB(eId);
                break;
            case 'start':
                //In this case the sensor should start data acquisition
                console.log('ODB driver - Received start for element '+eId+', mode is '+data);
                var index = -1;
                for(var i in elementsList) {
                    if(elementsList[i].id == eId){
                        index = i;
                    }
                };                
                console.log(elementsList[index]);
                console.log(JSON.stringify(elementsList[index]));
                elementsList[index].running = true;
                dataAcquisition(index);
                break; 
            /*   elementsList[elementIndex].running = true;

                try{
                    var filePath = path.resolve(__dirname, "../../config.json");
                    fs.readFile(filePath, function(err,data) {
                        if (!err) {
                            var settings = JSON.parse(data.toString());
                            var drivers = settings.params.drivers;
                            for(var i in drivers){
                                if(drivers[i].type == "serial"){
                                    
                                    SERIAL_PORT = drivers[i].interfaces[0].port;
                                    SERIAL_RATE = drivers[i].interfaces[0].rate;
                                    break;
                                }
                            }

                            try{
                                serial = new serialPort(SERIAL_PORT, {baudrate: SERIAL_RATE}, false);

                                serial.open(function () {
                                    serial.on('close', function (err) {
                                        console.log("Serial port ["+SERIAL_PORT+"] was closed");
                                        
                                    });

                                    serial.on('error', function (err) {
                                        if(err.path == SERIAL_PORT){
                                            console.log("Serial port ["+SERIAL_PORT+"] is not ready. Err code : "+err.code);  
                                        }
                                    });
                                    start_serial();
                                });

                            }
                            catch(e){
                                console.log("catch : " + e);
                            }
                        }
                    });
                }
                catch(err){
                    console.log("Error : "+err);
                }
                break; */
 
            case 'stop':
                //In this case the sensor should stop data acquisition
                //the parameter data can be ignored
                console.log('ODB driver - Received stop for element '+eId);
                var index = -1;
                for(var i in elementsList) {
                    if(elementsList[i].id == eId)
                        index = i;
                };
                elementsList[index].running = false;
                break;
            case 'value':
                //In this case the actuator should store the value
                //the parameter data is the value to store
                
                var index = -1;
                for(var i in elementsList) {
                    if(elementsList[i].id == eId)
                        index = i;
                };
                console.log('ODB driver - Received value for element '+elementsList[index].id+'; value is '+data.actualValue);
                callbackFunc('data', elementsList[index].id, data);
                
                break;
            default:
                console.log('ODB driver - unrecognized cmd');
        }
    }

    function intReg() {
        console.log('\n ODB driver - register new elements');
        for(var i in elementsList) {
            var json_info = {type:elementsList[i].type, name:elementsList[i].name, description:elementsList[i].description, range:elementsList[i].range};
            elementsList[i].id = registerFunc(driverId, elementsList[i].sa, json_info);
            //elementsList[i].id = registerFunc(driverId, elementsList[i].sa, elementsList[i].type);
        };
    }


    function dataAcquisition(index) {
        //If not stopped send data and call again after interval...
        if(elementsList[index].running) {
            //Send data value...
            callbackFunc('data', elementsList[index].id, elementsList[index].value);
            nextValue(index);
            setTimeout(function(){dataAcquisition(index);}, (elementsList[index].interval));
        }
    }

    
    function nextValue(index) {
        switch(elementsList[index].type) {
            case 'rpm':
                elementsList[index].value+=incDec();
                if(elementsList[index].value < -10) {
                    elementsList[index].value = -10;
                }
                else if(elementsList[index].value > 40) {
                    elementsList[index].value = 40;
                }
                break;
            case 'vss':
                elementsList[index].value+=incDec();
                if(elementsList[index].value < 0) {
                    elementsList[index].value = 0;
                }
                else if(elementsList[index].value > 100) {
                    elementsList[index].value = 100;
                }
                break;
            default:
                elementsList[index].value = '-1';
        };
    }


    function incDec() {
        var upProb = 25;
        var downProb = 25;
        var rnd = Math.floor(Math.random()*100);
        if (rnd < downProb) {
            return -1;
        }
        else if (rnd > (100-upProb)) {
            return 1;
        }
        else {
            return 0;
        }
    }


}());
