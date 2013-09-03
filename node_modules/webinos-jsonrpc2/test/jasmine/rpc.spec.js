/*******************************************************************************
 *  Code contributed to the webinos project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *	 http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Copyright 2011 Alexander Futasz, Fraunhofer FOKUS
 ******************************************************************************/

describe('common.RPC', function() {

	var Registry = require("../../lib/registry").Registry;
	var rpc = require("../../lib/rpc");
	var RPCHandler = rpc.RPCHandler;
	var RPCWebinosService = rpc.RPCWebinosService;
	var ServiceType = rpc.ServiceType;

	var registry;
	var rpcHandler;

	beforeEach(function() {
		registry = new Registry({});
		rpcHandler = new RPCHandler(undefined, registry);
	});

	describe('rpcHandler', function() {

		it('RPCHandler is exported from node module', function() {
			expect(RPCHandler).toEqual(jasmine.any(Function));
		});

		it('RPCHandler object instantiated', function() {
			expect(rpcHandler).toBeDefined();
		});

		it('has createRPC function', function() {
			expect(rpcHandler.createRPC).toEqual(jasmine.any(Function));
		});

		it('has executeRPC function', function() {
			expect(rpcHandler.executeRPC).toEqual(jasmine.any(Function));
		});

		it('has registerCallbackObject function', function() {
			expect(rpcHandler.registerCallbackObject).toEqual(jasmine.any(Function));
		});

		it('has registerCallbackObject function', function() {
			expect(rpcHandler.registerCallbackObject).toEqual(jasmine.any(Function));
		});

		it('createRPC with service as string type', function() {
			var rpc = rpcHandler.createRPC('Service', 'functionName', [1]);
			expect(rpc).toEqual(jasmine.any(Object));

			expect(rpc.jsonrpc).toBeDefined();
			expect(rpc.jsonrpc).toEqual('2.0');

			expect(rpc.id).toBeDefined();
			expect(rpc.id).toEqual(jasmine.any(String));

			expect(rpc.method).toBeDefined();
			expect(rpc.method).toEqual(jasmine.any(String));

			expect(rpc.params).toBeDefined();
			expect(rpc.params).toEqual(jasmine.any(Object));
		});

		it('createRPC with service as RPCWebinosService', function() {
			var service = new RPCWebinosService();
			var rpc = rpcHandler.createRPC(service, 'functionName', [1]);
			expect(rpc).toEqual(jasmine.any(Object));

			expect(rpc.jsonrpc).toBeDefined();
			expect(rpc.jsonrpc).toEqual('2.0');

			expect(rpc.id).toBeDefined();
			expect(rpc.id).toEqual(jasmine.any(String));

			expect(rpc.method).toBeDefined();
			expect(rpc.method).toEqual(jasmine.any(String));

			expect(rpc.params).toBeDefined();
			expect(rpc.params).toEqual(jasmine.any(Object));
		});

	});

	describe('RPC service registration', function() {
		var service;

		beforeEach(function() {
			service = new RPCWebinosService();
			service.api = 'prop-api';
			service.displayName = 'prop-displayName';
			service.description = 'prop-description';
		});

		it('Registry is exported from node module', function() {
			expect(Registry).toEqual(jasmine.any(Function));
		});

		it('has registerObject function', function() {
			expect(registry.registerObject).toEqual(jasmine.any(Function));
		});

		it('has unregisterObject function', function() {
			expect(registry.unregisterObject).toEqual(jasmine.any(Function));
		});

		it('has no registered services initially', function() {
			expect(Object.keys(registry.objects).length).toEqual(0);
		});

		it('has exactly one registered service after registering', function() {
			registry.registerObject(service);
			expect(Object.keys(registry.objects).length).toEqual(1);
		});
		
		it('has no registered services after unregistering', function() {
			registry.registerObject(service);
			registry.unregisterObject(service);
			expect(Object.keys(registry.objects).length).toEqual(0);
		});

        it('cannot create 2 instances of the same services', function() {
            var secondService;
            secondService = new RPCWebinosService();
            secondService.api = service.api;
            secondService.displayName = service.displayName;
            secondService.description = service.description;

            registry.registerObject(service);
            expect(function() {registry.registerObject(service);}).toThrow();
            expect(function() {registry.registerObject(secondService);}).toThrow();
        });

        it('can register/unregister services for same api with different name and/or description', function() {
            var secondService = new RPCWebinosService();
            secondService.api = service.api;
            secondService.displayName = service.displayName + "-2";
            secondService.description = service.description + "-2";

            registry.registerObject(service);
            expect(Object.keys(registry.objects['prop-api']).length).toEqual(1);
            registry.registerObject(secondService);
            expect(Object.keys(registry.objects['prop-api']).length).toEqual(2);

            registry.unregisterObject(service);
            expect(Object.keys(registry.objects['prop-api']).length).toEqual(1);
            registry.unregisterObject(secondService);
            expect(Object.keys(registry.objects).length).toEqual(0);
        });

        it('can search registered services', function() {
            var secondService;
            var foundService;
            secondService = new RPCWebinosService();
            secondService.api = service.api;
            secondService.displayName = service.displayName + "-2";
            secondService.description = service.description + "-2";

            registry.registerObject(service);
            registry.registerObject(secondService);

            foundService = registry.getServiceWithTypeAndId(service.api, service.id);
            for (var i in service) {
                expect(foundService[i]).toBeDefined();
                expect(foundService[i]).toEqual(service[i]);
            }
            foundService = registry.getServiceWithTypeAndId(secondService.api, secondService.id);
            for (var i in secondService) {
                expect(foundService[i]).toBeDefined();
                expect(foundService[i]).toEqual(secondService[i]);
            }
            foundService = registry.getServiceWithTypeAndId(secondService.api, "dummyId");
            expect(foundService).toBeUndefined();
            foundService = registry.getServiceWithTypeAndId("dummyAPI", "dummyId");
            expect(foundService).toBeUndefined();
        });
    });

	describe('RPC service request and response', function() {
		var service;

		beforeEach(function() {
			// create and register mock service
			var MockService = function(privRpcHandler, params) {
				this.base = RPCWebinosService;
				this.base({
					api: 'prop-api',
					displayName: 'prop-displayName',
					description: 'prop-description'
				});
				this.testListen = function(params, success, error, objRef) {
					var rpc = privRpcHandler.createRPC(objRef, 'onEvent', {testProp: 42});
					privRpcHandler.executeRPC(rpc);
				};
			};
			MockService.prototype = new RPCWebinosService();
			MockService.prototype.testSuccess = function(params, success, error, objRef) {
				// tests success callback provided by rpc.js
				if (params.length) {
					success(params[0]);
				} else {
					success();
				}
			};
			MockService.prototype.testError = function(params, success, error, objRef) {
				// tests error callback provided by rpc.js
				error();
			};
			service = new MockService(rpcHandler);
			registry.registerObject(service);

			// use our own message handler write function, usually this would
			// write the request out to the remote peer
			var msgHandler = {
					write: function(rpc) {
						rpcHandler.handleMessage(rpc, 'fakeaddr', 'fakemsgid');
					}
			};
			rpcHandler.setMessageHandler(msgHandler);
		});

		it('with successful response', function() {
			spyOn(rpcHandler, 'handleMessage').andCallThrough();
			spyOn(rpcHandler, 'executeRPC').andCallThrough();

			var rpc = rpcHandler.createRPC(service, 'testSuccess', [1]);
			rpcHandler.executeRPC(rpc);

			// request
			expect(rpcHandler.handleMessage).toHaveBeenCalled();
			expect(rpcHandler.handleMessage.calls[0].args.length).toEqual(3);
			expect(rpcHandler.handleMessage.calls[0].args[0].method).toBeDefined();
			expect(rpcHandler.handleMessage.calls[0].args[0].id).toBeDefined();
			expect(rpcHandler.handleMessage.calls[0].args[0].params).toBeDefined();

			// response
			expect(rpcHandler.handleMessage.calls[1].args.length).toEqual(3);
			expect(rpcHandler.handleMessage.calls[1].args[0].id).toBeDefined();
			expect(rpcHandler.handleMessage.calls[1].args[0].result).toBeDefined();

			// called once for request and once for response
			expect(rpcHandler.executeRPC.calls.length).toEqual(2);
		});

		it('with successful response and falsy param', function() {
			spyOn(rpcHandler, 'handleMessage').andCallThrough();
			spyOn(rpcHandler, 'executeRPC').andCallThrough();
			var succ = {
				ess: function(param) {}
			}
			spyOn(succ, 'ess').andCallThrough();

			var rpc = rpcHandler.createRPC(service, 'testSuccess', [false]);
			rpcHandler.executeRPC(rpc, succ.ess);

			// request
			expect(rpcHandler.handleMessage).toHaveBeenCalled();
			expect(rpcHandler.handleMessage.calls[0].args.length).toEqual(3);
			expect(rpcHandler.handleMessage.calls[0].args[0].method).toBeDefined();
			expect(rpcHandler.handleMessage.calls[0].args[0].id).toBeDefined();
			expect(rpcHandler.handleMessage.calls[0].args[0].params).toBeDefined();

			// response
			expect(rpcHandler.handleMessage.calls[1].args.length).toEqual(3);
			expect(rpcHandler.handleMessage.calls[1].args[0].id).toBeDefined();
			expect(rpcHandler.handleMessage.calls[1].args[0].result).toBeDefined();

			// called once for request and once for response
			expect(rpcHandler.executeRPC.calls.length).toEqual(2);
			
			expect(succ.ess).toHaveBeenCalled();
			expect(succ.ess.calls[0].args[0]).toEqual(false);

		});

		it('with error response', function() {
			spyOn(rpcHandler, 'handleMessage').andCallThrough();
			spyOn(rpcHandler, 'executeRPC').andCallThrough();

			var rpc = rpcHandler.createRPC(service, 'testError', [1]);
			rpcHandler.executeRPC(rpc);

			// response
			expect(rpcHandler.handleMessage.calls[1].args.length).toEqual(3);
			expect(rpcHandler.handleMessage.calls[1].args[0].id).toBeDefined();
			expect(rpcHandler.handleMessage.calls[1].args[0].error).toBeDefined();
			expect(rpcHandler.handleMessage.calls[1].args[0].error.code).toEqual(-31000);

			// called once for request and once for response
			expect(rpcHandler.executeRPC.calls.length).toEqual(2);
		});

		it('with successful responce when using RPC callback object', function() {
			spyOn(rpcHandler, 'handleMessage').andCallThrough();
			spyOn(rpcHandler, 'executeRPC').andCallThrough();

			var rpc = rpcHandler.createRPC(service, 'testListen', [1]);
			rpc.onEvent = function (){}; // empty, using spyOn instead
			spyOn(rpc, 'onEvent');
			rpcHandler.registerCallbackObject(rpc);
			rpcHandler.executeRPC(rpc);

			// response
			expect(rpcHandler.handleMessage).toHaveBeenCalled();
			expect(rpcHandler.handleMessage.calls[1].args.length).toEqual(3);
			expect(rpcHandler.handleMessage.calls[1].args[0].id).toBeDefined();

			// called once for request and once for response
			expect(rpcHandler.executeRPC.calls.length).toEqual(2);

			expect(rpc.onEvent).toHaveBeenCalled();
			expect(rpc.onEvent.calls[0].args[0].testProp).toEqual(42);
		});

		it('will call onSecurityError for a denied request when using RPC callback object', function() {
			rpcHandler.registerPolicycheck(function(jsonRpc, from, cb) {
				if (jsonRpc.method && jsonRpc.method.indexOf('wontBeCalled') > -1) {
					cb(false);
					return;
				}
				cb(true);
			});
			spyOn(rpcHandler, 'handleMessage').andCallThrough();
			spyOn(rpcHandler, 'executeRPC').andCallThrough();

			var rpc = rpcHandler.createRPC(service, 'wontBeCalled', [1]);
			rpc.onSecurityError = function (){}; // empty, using spyOn instead
			spyOn(rpc, 'onSecurityError');
			rpcHandler.registerCallbackObject(rpc);
			rpcHandler.executeRPC(rpc);

			// response
			expect(rpcHandler.handleMessage).toHaveBeenCalled();
			expect(rpcHandler.handleMessage.calls[1].args.length).toEqual(3);
			expect(rpcHandler.handleMessage.calls[1].args[0].id).toBeDefined();

			// called once for request and once for response
			expect(rpcHandler.executeRPC.calls.length).toEqual(2);

			expect(rpc.onSecurityError).toHaveBeenCalled();
			expect(rpc.onSecurityError.calls[0].args[0].name).toEqual('SecurityError');

			rpcHandler.registerPolicycheck(undefined);
		});
	});
});
