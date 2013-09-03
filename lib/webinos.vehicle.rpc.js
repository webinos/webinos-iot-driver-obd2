/*******************************************************************************
 *  Code contributed to the webinos project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Copyright 2012 TU Munich - Krishna Bangalore
 ******************************************************************************/ 
(function () {
	var RPCWebinosService = require("webinos-jsonrpc2").RPCWebinosService;

    function VehicleModule(rpcHandler, params) {
        var implFile = 'fake';
        var car = null;
        var connector = null;
        if (typeof params.connector === 'undefined') {
            connector = 'obd';
            console.log('err');
        } else {
            connector = params.connector;
        }

        if (connector == 'obd') { //OBD-II
            try {
                car = require('../lib/vb-obd/vo.js');
                var obdOptions = params.obdParams;

                if (obdOptions.type === 'bluetooth') {  //Check which OBD-connector should be used.
                    car.start( {
                        type: obdOptions.type,
                        address: obdOptions.btAddress,
                        channel: obdOptions.btChannel
                    });
                } else if (obdOptions.type === 'serial') {
                    car.start( {
                        type: obdOptions.type,
                        serialPort: obdOptions.serialPort,
                        options: obdOptions.serialOptions
                    });
                }

                implFile = 'obd';
                console.log('connecting to obd');
            } catch (e) {
                console.log(e);
            }
        } else if (connector == 'fake') {
            implFile = 'fake';
            console.log('connecting to fake data generator');
        }
        var implModule = require('./webinos.vehicle.' + implFile + '.js');
        implModule.setRPCHandler(rpcHandler);
        implModule.setRequired(car);

        // inherit from RPCWebinosService
        this.base = RPCWebinosService;
        this.base(implModule.serviceDesc);
        this.get = function (vehicleDataId, vehicleDataHandler, errorCB) {
            implModule.get(vehicleDataId, vehicleDataHandler, errorCB);
        };
        this.addEventListener = function (params, successCB, errorCB, objectRef) {
            implModule.addEventListener(params, successCB, errorCB, objectRef);
        };
        this.removeEventListener = function (args) {
            implModule.removeEventListener(args);
        };
    }
    VehicleModule.prototype = new RPCWebinosService;
    exports.Service = VehicleModule;
})();
