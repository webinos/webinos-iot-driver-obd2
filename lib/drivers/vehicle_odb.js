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

    var path = require("path");
    var fs = require("fs");

    var OBDReader;
    var OBDport;
    var implemented_obd_parameters = ["rpm", "vss", "load_pct", "throttlepos", "frp", "temp", "iat", "pidsupp0", "dtc_cnt", "dtcfrzf", "fuelsys", "shrtft13", "longft13", "shrtft24", "longft24", "map", "sparkadv", "maf"];

    function start(obdConnector) {

        if (obdConnector.type === 'bluetooth') {
            OBDReader = require('bluetooth-obd');
            OBDport = new OBDReader(obdConnector.address, obdConnector.channel);
        } else if (obdConnector.type === 'simulator') {
            OBDReader = require('serial-obd');
            OBDport = new OBDReader(obdConnector.serialPort, obdConnector.options);
        }
        
        /**
         * The listener for 'dataReceived'. This is for events.
         */
        OBDport.on('dataReceived', function (data) {
            //console.log("DATA : " + JSON.stringify(data));
            var index = -1;
            for(var i in elementsList) {
                if(elementsList[i].type == data.name)
                    index = i;
            };
            
            switch (data.name) {
                case "rpm":
                    if(index != -1)
                        callbackFunc('data', elementsList[index].id, data.value);
                    break;
                case "vss":
                    if(index != -1)
                        callbackFunc('data', elementsList[index].id, data.value);
                    break;
                case "load_pct":
                    if(index != -1)
                        callbackFunc('data', elementsList[index].id, data.value);
                    break;
                case "throttlepos":
                    if(index != -1)
                        callbackFunc('data', elementsList[index].id, data.value);
                    break;
                case "frp":
                    if(index != -1)
                        callbackFunc('data', elementsList[index].id, data.value);
                    break;
                case "temp":
                    if(index != -1)
                        callbackFunc('data', elementsList[index].id, data.value);
                    break;
                case "iat":
                    if(index != -1)
                        callbackFunc('data', elementsList[index].id, data.value);
                    break;
                case "pidsupp0":
                    if(index != -1)
                        callbackFunc('data', elementsList[index].id, data.value);
                    break;
                case "dtc_cnt":
                    if(index != -1)
                        callbackFunc('data', elementsList[index].id, data.value);
                    break;
                case "dtcfrzf":
                    if(index != -1)
                        callbackFunc('data', elementsList[index].id, data.value);
                    break;
                case "fuelsys":
                    if(index != -1)
                        callbackFunc('data', elementsList[index].id, data.value);
                    break;
                case "shrtft13":
                    if(index != -1)
                        callbackFunc('data', elementsList[index].id, data.value);
                    break;
                case "longft13":
                    if(index != -1)
                        callbackFunc('data', elementsList[index].id, data.value);
                    break;
                case "shrtft24":
                    if(index != -1)
                        callbackFunc('data', elementsList[index].id, data.value);
                    break;
                case "longft24":
                    if(index != -1)
                        callbackFunc('data', elementsList[index].id, data.value);
                    break;
                case "map":
                    if(index != -1)
                        callbackFunc('data', elementsList[index].id, data.value);
                    break;
                case "sparkadv":
                    if(index != -1)
                        callbackFunc('data', elementsList[index].id, data.value);
                    break;
                case "maf":
                    if(index != -1)
                        callbackFunc('data', elementsList[index].id, data.value);
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

        /**
         * On connected, start polling.
         */
        OBDport.on('connected', function () {
            //For now start polling here.
            //TODO: When all listeners are disabled, stopPolling. Etc.
            console.log('OBD-II device is connected');
            this.startPolling(1000);
        });

        OBDport.connect();
    }


    var driverId = null;
    var registerFunc = null;
    var removeFunc = null;
    var callbackFunc = null;

    var elementsList = new Array;
    var INTERFACE_TYPE = "simulator";


    elementsList[0] = {
        'type': 'rpm',
        'name': 'RPM sensor',
        'description': 'Provides information about "Engine Roads Per Minute", unit: "rev/min"',
        'sa': 0,
        'interval': 1000,
        'value': 55,
        'running': false,
        'id': 0
    };

    elementsList[1] = {
        'type': 'vss',
        'name': 'VSS sensor',
        'description': 'Provides information about "Vehicle Speed Sensor", unit: "km/h"',
        'sa': 0,
        'interval': 1000,
        'value': 55,
        'running': false,
        'id': 0
    };

    elementsList[2] = {
        'type': 'load_pct',
        'name': 'LOAD_PCT sensor',
        'description': 'Provides information about "Calculated LOAD Value", unit: "%"',
        'sa': 0,
        'interval': 1000,
        'value': 55,
        'running': false,
        'id': 0
    };

    elementsList[3] = {
        'type': 'throttlepos',
        'name': 'THROTTLE POS sensor',
        'description': 'Provides information about "Absolute Throttle Position", unit: "%"',
        'sa': 0,
        'interval': 1000,
        'value': 55,
        'running': false,
        'id': 0
    };

    elementsList[4] = {
        'type': 'frp',
        'name': 'FRP sensor',
        'description': 'Provides information about "Fuel Rail Pressure (gauge)", unit: "%"',
        'sa': 0,
        'interval': 1000,
        'value': 55,
        'running': false,
        'id': 0
    };

    elementsList[5] = {
        'type': 'temp',
        'name': 'TEMPERATURE sensor',
        'description': 'Provides information about "Engine Coolant Temperature", unit: "Celsius"',
        'sa': 0,
        'interval': 1000,
        'value': 55,
        'running': false,
        'id': 0
    };

    elementsList[6] = {
        'type': 'iat',
        'name': 'IAT sensor',
        'description': 'Provides information about "Intake Air Temperature", unit: "Celsius"',
        'sa': 0,
        'interval': 1000,
        'value': 55,
        'running': false,
        'id': 0
    };

    elementsList[7] = {
        'type': 'pidsupp0',
        'name': 'PIDSUPP0 sensor',
        'description': 'Provides information about "PIDs supported 00-20", unit: "Bit Encoded"',
        'sa': 0,
        'interval': 1000,
        'value': 55,
        'running': false,
        'id': 0
    };

    elementsList[8] = {
        'type': 'dtc_cnt',
        'name': 'DTC_CNT sensor',
        'description': 'Provides information about "Monitor status since DTCs cleared", unit: "Bit Encoded"',
        'sa': 0,
        'interval': 1000,
        'value': 55,
        'running': false,
        'id': 0
    };

    elementsList[9] = {
        'type': 'dtcfrzf',
        'name': 'DTCFRZF sensor',
        'description': 'Provides information about "DTC that caused required freeze frame data storage", unit: "Bit Encoded"',
        'sa': 0,
        'interval': 1000,
        'value': 55,
        'running': false,
        'id': 0
    };

    elementsList[10] = {
        'type': 'fuelsys',
        'name': 'FUELSYS sensor',
        'description': 'Provides information about "Fuel system 1 and 2 status", unit: "Bit Encoded"',
        'sa': 0,
        'interval': 1000,
        'value': 55,
        'running': false,
        'id': 0
    };

    elementsList[11] = {
        'type': 'shrtft13',
        'name': 'SHRTFT13 sensor',
        'description': 'Provides information about "Short Term Fuel Trim - Bank 1,3", unit: "%"',
        'sa': 0,
        'interval': 1000,
        'value': 55,
        'running': false,
        'id': 0
    };

    elementsList[12] = {
        'type': 'longft13',
        'name': 'longft13 sensor',
        'description': 'Provides information about "Long Term Fuel Trim - Bank 1,3", unit: "%"',
        'sa': 0,
        'interval': 1000,
        'value': 55,
        'running': false,
        'id': 0
    };

    elementsList[13] = {
        'type': 'shrtft24',
        'name': 'SHRTFT24 sensor',
        'description': 'Provides information about "Short Term Fuel Trim - Bank 2,4", unit: "%"',
        'sa': 0,
        'interval': 1000,
        'value': 55,
        'running': false,
        'id': 0
    };

    elementsList[14] = {
        'type': 'longft24',
        'name': 'LONGFT24 sensor',
        'description': 'Provides information about Long "Long Term Fuel Trim - Bank 2,4", unit: "%"',
        'sa': 0,
        'interval': 1000,
        'value': 55,
        'running': false,
        'id': 0
    };

    elementsList[15] = {
        'type': 'map',
        'name': 'MAP sensor',
        'description': 'Provides information about Intake Manifold Absolute Pressure",unit: "kPa"',
        'sa': 0,
        'interval': 1000,
        'value': 55,
        'running': false,
        'id': 0
    };

     elementsList[16] = {
        'type': 'sparkadv',
        'name': 'SPARKADV sensor',
        'description': 'Provides information about "Ignition Timing Advance for #1 Cylinder",unit: "degrees relative to #1 cylinder"',
        'sa': 0,
        'interval': 1000,
        'value': 55,
        'running': false,
        'id': 0
    };

     elementsList[17] = {
        'type': 'maf',
        'name': 'MAF sensor',
        'description': 'Provides information about "Air Flow Rate from Mass Air Flow Sensor",unit: "g/s"',
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

        try{
            var filePath = path.resolve(__dirname, "../../config.json");
            fs.readFile(filePath, function(err,data) {
                if (!err) {
                    var settings = JSON.parse(data.toString());
                    var drivers = settings.params.drivers;

                    for(var i in drivers){
                        var interfaces = drivers[i].interfaces;
                        for(var j in interfaces){
                            if(interfaces[j].type == INTERFACE_TYPE){
                                var params = {
                                    "type": interfaces[j].type,
                                    "address": interfaces[j].btAddress,
                                    "channel": interfaces[j].btChannel,
                                    "serialPort": interfaces[j].port,
                                    "options": {
                                            "baudrate": interfaces[j].rate
                                    }
                                };
                                //console.log("PARAM : "+JSON.stringify(params));
                                start(params);
                            }
                        }
                    }
                }
            });
        }
        catch(err){
            console.log("err : " + err);
        }
    };

    exports.execute = function(cmd, eId, data, errorCB, successCB) {
        switch(cmd) {
            case 'cfg':
                //In this case cfg data are transmitted to the sensor/actuator
                //this data is in json(???) format
                console.log('ODB driver - Received cfg for element '+eId+', cfg is '+ JSON.stringify(data));
                //TODO handle configuration
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
                startAcquisition(elementsList[index]);
                break; 
            
            case 'stop':
                //In this case the sensor should stop data acquisition
                //the parameter data can be ignored
                console.log('ODB driver - Received stop for element '+eId);
                var index = -1;
                for(var i in elementsList) {
                    if(elementsList[i].id == eId)
                        index = i;
                };
                stopAcquisition(elementsList[index]);
                break;
            
            case 'value':
                //In this case the actuator should store the value
                //the parameter data is the value to store

                //OBD elements are not actuators
                break;
            default:
                console.log('ODB driver - unrecognized cmd');
        }
    }

    function intReg() {
        console.log('\nODB driver - registering new elements');
        for(var i in elementsList) {
            var json_info = {type:elementsList[i].type, name:elementsList[i].name, description:elementsList[i].description, range:elementsList[i].range};
            elementsList[i].id = registerFunc(driverId, elementsList[i].sa, json_info);
        };
    }

    function startAcquisition(elem){
        if(implemented_obd_parameters.indexOf(elem.type) != -1){
            OBDport.addPoller(elem.type);
            elem.running = true;
        }
    }

    function stopAcquisition(elem){
        if(implemented_obd_parameters.indexOf(elem.type) != -1){
            OBDport.removePoller(elem.type);
            elem.running = false;
        }
    }    
}());
