# Octo Protocol

`[...]`

## packet types

`[ "cmd", {} ]`

`[ "reading", [ {} ] ]`

`[ "state", {} ]`

`[ "config", [ {} ] ]`

First element of the array is a string identifying the type of contents in second element of the array.

### command packets

`[ "cmd", { } ]`
The object/array in the second element should consist of a valid `device` and a command enumerated from the device object under the key, `deviceCmds`.

An example might look like:
```json
[ "cmd",
  {
    "device": "715b8504-9ead-6c3c-3fce-313662441d64",
    "cmd": "read"
  }
]
```
### command response / data packets

`[ "reading", [ {} ] ]`

The array in the second element should contain an object for each reading being delivered. Each object should contain an identifier, `device: "device guid"`, and one of two ways of delivering a value:

 1. `"value": value"` - that is, the return object will contain a key called "value" populated by a string, number or boolean.
 2. provide a key named `keys`, describing the output, as part of the config / register entry within the `"meta": {}` object. An example config `"meta"` entry for a DHT22 humidity temperature sensor could look like this:
```javascript
meta: {
			keys: [ {
				name: "rh",
				metric: "humidity",
				unit: "%"
			}, {
				name: "temp",
				metric: "temperature",
				unit: "C",
				validMax: 85,
				validMin: -20
			} ],
			deviceName: "DHT22"
}
```
This config should produce a `"reading"` packet that might look like:
```json
[ "reading",
  [
    {
      "device": "715b8504-9ead-6c3c-3fce-313662441d64",
      "rh": 50,
      "temp": 21.2
     }
  ]
]
```

### config / registration packets

`config` packets come from the client, and describe the available "devices". Devices is in quotes because we don't really care what the device *actually* is, but rather, just an interface to it. This means that on the client, a single command - for example: `{ device: "Stage Platform", cmd: "self-level" }` would tell the device registered as "Stage Platform" to perform the command "self-level". The command, "self-level", would be implemented on the device, so that upon receiving the command, the device starts executing whatever it is supposed to do. In this example case, the device might check several accelerometers, use pumps to extend the stage legs, etc.

The `config` packet should look like the following:

```json
[ "config",
  [{
    "device": "c6d2a817-0c3a-4b6f-8478-cd81628a63f5",
    "type": "virtual",
  	"validCmds": ["read"],
  	"meta": {
	  	"keys": [{
  			"name": "rh",
  			"metric": "humidity",
  			"unit": "%"
  		}, {
	  		"name": "temp",
	  		"metric": "temperature",
	  		"unit": "C",
	  		"validMax": 85,
	  		"validMin": -20
	  	}],
		  "deviceName": "DHT22"
	  }
  }]
];
```

### additional info, additions

##
