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
 * Copyright 2013 TNO - Author: Eric Smekens
 * Copyright 2013 TU Munich - Author: Krishna Bangalore
 ******************************************************************************/

(function () {
    //'use strict';

    //Events
    /**
     * WDomEvent. Every PID specific event inherits this event.
     * TODO: Maybe should use normal events.
     */
    WDomEvent = function (type, target, currentTarget, eventPhase, bubbles, cancelable, timestamp) {
        this.initEvent(type, target, currentTarget, eventPhase, bubbles, cancelable, timestamp);
    }
    WDomEvent.prototype.initEvent = function (type, target, currentTarget, eventPhase, bubbles, cancelable, timestamp) {
        this.type = type;
        this.target = target;
        this.currentTarget = currentTarget;
        this.eventPhase = eventPhase;
        this.bubbles = bubbles;
        this.cancelable = cancelable;
        this.timestamp = timestamp;
    }

//-----Speed, RPM, Engine Load, Throttle Position, Temp, Air Temperature, Fuel Pressure----
    SpeedEvent = function (speedData) {
        this.initSpeedEvent(speedData);
    }
    SpeedEvent.prototype = new WDomEvent();
    SpeedEvent.prototype.constructor = SpeedEvent;
    SpeedEvent.parent = WDomEvent.prototype; // our "super" property
    SpeedEvent.prototype.initSpeedEvent = function (speedData) {
        this.vss = speedData;
        var d = new Date();
        var stamp = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
        var stamp = stamp + d.getUTCMilliseconds();
        SpeedEvent.parent.initEvent.call(this, 'vss', null, null, null, false, false, stamp);
    }

    RPMEvent = function (rpmData) {
        this.initRPMEvent(rpmData);
    }
    RPMEvent.prototype = new WDomEvent();
    RPMEvent.prototype.constructor = RPMEvent;
    RPMEvent.parent = WDomEvent.prototype; // our "super" property
    RPMEvent.prototype.initRPMEvent = function (rpmData) {
        this.rpm = rpmData;
        var d = new Date();
        var stamp = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
        var stamp = stamp + d.getUTCMilliseconds();
        RPMEvent.parent.initEvent.call(this, 'rpm', null, null, null, false, false, stamp);
    }

    EngineLoadEvent = function (engineLoadData) {
        this.initEngineLoadEvent(engineLoadData);
    }
    EngineLoadEvent.prototype = new WDomEvent();
    EngineLoadEvent.prototype.constructor = EngineLoadEvent;
    EngineLoadEvent.parent = WDomEvent.prototype; // our "super" property
    EngineLoadEvent.prototype.initEngineLoadEvent = function (engineLoadData) {
        this.load_pct = engineLoadData;
        var d = new Date();
        var stamp = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
        var stamp = stamp + d.getUTCMilliseconds();
        EngineLoadEvent.parent.initEvent.call(this, 'load_pct', null, null, null, false, false, stamp);
    }

    ThrottlePosEvent = function (throttleposData) {
        this.initThrottlePosEvent(throttleposData);
    }
    ThrottlePosEvent.prototype = new WDomEvent();
    ThrottlePosEvent.prototype.constructor = ThrottlePosEvent;
    ThrottlePosEvent.parent = WDomEvent.prototype; // our "super" property
    ThrottlePosEvent.prototype.initThrottlePosEvent = function (throttleposData) {
        this.throttlepos = throttleposData;
        var d = new Date();
        var stamp = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
        var stamp = stamp + d.getUTCMilliseconds();
        ThrottlePosEvent.parent.initEvent.call(this, 'throttlepos', null, null, null, false, false, stamp);
    }

    FuelPressureEvent = function (frpData) {
        this.initFuelPressureEvent(frpData);
    }
    FuelPressureEvent.prototype = new WDomEvent();
    FuelPressureEvent.prototype.constructor = FuelPressureEvent;
    FuelPressureEvent.parent = WDomEvent.prototype; // our "super" property
    FuelPressureEvent.prototype.initFuelPressureEvent = function (frpData) {
        this.frp = frpData;
        var d = new Date();
        var stamp = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
        var stamp = stamp + d.getUTCMilliseconds();
        FuelPressureEvent.parent.initEvent.call(this, 'frp', null, null, null, false, false, stamp);
    }

    TempEvent = function (tempData) {
        this.initTempEvent(tempData);
    }
    TempEvent.prototype = new WDomEvent();
    TempEvent.prototype.constructor = TempEvent;
    TempEvent.parent = WDomEvent.prototype; // our "super" property
    TempEvent.prototype.initTempEvent = function (tempData) {
        this.temp = tempData;
        var d = new Date();
        var stamp = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
        var stamp = stamp + d.getUTCMilliseconds();
        TempEvent.parent.initEvent.call(this, 'temp', null, null, null, false, false, stamp);
    }

    IatEvent = function (iatData) {
        this.initIatEvent(iatData);
    }
    IatEvent.prototype = new WDomEvent();
    IatEvent.prototype.constructor = IatEvent;
    IatEvent.parent = WDomEvent.prototype; // our "super" property
    IatEvent.prototype.initIatEvent = function (iatData) {
        this.iat = iatData;
        var d = new Date();
        var stamp = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
        var stamp = stamp + d.getUTCMilliseconds();
        IatEvent.parent.initEvent.call(this, 'iat', null, null, null, false, false, stamp);
    }


    var _listeners = {}; //Listener object

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

        /**
         * The listener for 'dataReceived'. This is for events.
         */
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
                case "load_pct":
                    if (typeof _listeners.load_pct != 'undefined') {
                        _listeners.load_pct(new EngineLoadEvent(data.value));
                    }
                    break;
                case "throttlepos":
                    if (typeof _listeners.throttlepos != 'undefined') {
                        _listeners.throttlepos(new ThrottlePosEvent(data.value));
                    }
                    break;
                case "frp":
                    if (typeof _listeners.frp != 'undefined') {
                        _listeners.frp(new FuelPressureEvent(data.value));
                    }
                    break;
                case "temp":
                    if (typeof _listeners.temp != 'undefined') {
                        _listeners.temp(new TempEvent(data.value));
                    }
                    break;
                case "iat":
                    if (typeof _listeners.iat != 'undefined') {
                        _listeners.iat(new IatEvent(data.value));
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
    /**
     * Get method. Makes use of 'once'. (Eventlistener that only triggers once, and then removes itself.)
     * @param {string} type
     * @param {Function} callback Function that will execute when data is received.
     */
    function get(type, callback) {
        var getMessageHandler = function (data) {
            if(data.name === type) {
                switch (data.name) {
                    case "rpm":
                        callback(new RPMEvent(data.value));
                        break;
                    case "vss":
                        callback(new SpeedEvent(data.value));
                        break;
                    case "load_pct":
                        callback(new EngineLoadEvent(data.value));
                        break;
                    case "throttlepos":
                        callback(new ThrottlePosEvent(data.value));
                        break;
                    case "frp":
                        callback(new FuelPressureEvent(data.value));
                        break;
                    case "temp":
                        callback(new TempEvent(data.value));
                        break;
                    case "iat":
                        callback(new IatEvent(data.value));
                        break;
                    default:
                        console.log('No supported pid yet.');
                        break;
                }
                this.removeListener('dataReceived', getMessageHandler);
            } else {
                if(data.value !== "OK") {
                    console.log('Collision with listener and get. Not supported yet.');
                    console.log(type);
                    console.log(data);
                    //Do nothing, let the next thing come in. Will be caught by generalHandler.
                }
            }
        };

        OBDport.on('dataReceived', getMessageHandler);

        //Request value after callback.
        OBDport.requestValueByName(type);
    }

    /**
     * Adds listener to listener array.
     * @param {string} type Type you want the add the listener off.
     * @param listener Eventhandler
     */
    function addListener(type, listener) {
        var shouldAdd = false;
        switch (type) {
            case 'rpm':
                _listeners.rpm = listener;
                shouldAdd = true;
                break;
            case 'vss':
                _listeners.vss = listener;
                shouldAdd = true;
                break;
            case 'load_pct':
                _listeners.load_pct = listener;
                shouldAdd = true;
                break;
            case 'throttlepos':
                _listeners.throttlepos = listener;
                shouldAdd = true;
                break;
            case 'frp':
                _listeners.frp = listener;
                shouldAdd = true;
                break;
            case 'temp':
                _listeners.temp = listener;
                shouldAdd = true;
                break;
            case 'iat':
                _listeners.iat = listener;
                shouldAdd = true;
                break;
            default:
                console.log('type ' + type + ' undefined.');
        }
        if(shouldAdd) {
            OBDport.addPoller(type);
        }
    }

    /**
     * Function to remove a listener
     * @param {string} type Type you want the listener removed.
     */
    function removeListener(type) {
        var shouldRemove = false;
        switch (type) {
            case 'rpm':
                _listeners.rpm = undefined;
                shouldRemove = true;
                break;
            case 'vss':
                _listeners.vss = undefined;
                shouldRemove = true;
                break;
            case 'load_pct':
                _listeners.load_pct = undefined;
                shouldRemove = true;
            case 'throttlepos':
                _listeners.throttlepos = undefined;
                shouldRemove = true;
                break;
            case 'frp':
                _listeners.frp = undefined;
                shouldRemove = true;
                break;
            case 'temp':
                _listeners.temp = undefined;
                shouldRemove = true;
                break;
            case 'iat':
                _listeners.iat = undefined;
                shouldRemove = true;
                break;
            default:
                console.log('type ' + type + ' undefined.');
        }
        if(shouldRemove) {
            OBDport.removePoller(type);
        }
    }
    //Exports
    exports.get = get;
    exports.addListener = addListener;
    exports.removeListener = removeListener;
    exports.start = start;
})(module.exports);
