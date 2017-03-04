# JSON Device description

a module (brain or simple MCU) must provide the following info upon request. The server should be able to understand and implement something like:
```javascript
WebSocketSend(JSON.stringify([ "cmd", { deviceID: "uuid-string", cmd: "on"}, {deviceID: "other-uuid-string", cmd: "0.5"} ])
```

- `array` of `objects` representing an individual peripheral, including how to interact with it, meta information like units or capabilities, etc.
- each `object` should have a minimum set of keys:
  - `deviceID` - a GUID string (v4), or some other identifying string.
  - `deviceType` - a string of the enumeration `button`|`slider`|`virtual`.
    - `button` must handle only `on`|`off`|`toggle`. additional operations may be added, like toggle frequency, or others.
	-  `sliders` may offer a direct setting, `0.5`, for 50%, or functions therein, like `increment <value>`|`decrement <value>`.
	-  `virtual` must define the commands available, e.g. `init`, `read`, `write`, `reset`, `calibrate`, `continuous-reading`, `modeX`, etc.
  - `deviceCmds` - an array of valid commands. `button` & `slider` should have base defaults, but may be described here. Virtual must have this field.
  - `meta` - an object containing various meta information that device engine doesn't care about, but an end user might appreciate knowing. e.g. is the pressure reading from a sensor in Pascals (Pa), kiloPascals (kPa), bars, newtons, etc. An example of a `meta` object:
  ```json
  "meta": {
	  "buttonType": "Mains Relay",
	  "limits": "10A/250AC 20A/120AC",
	  "description": "Simple switch"
  }
  ```
  Such an object might be used to determine potential saftey issues (e.g. a power meter says a line is using 15A/250AC, but the `limits` field sets a safety limit so the app might turn it off).
  Or something like the following:
  ```json
  "meta": {
	  "outputs": [
		  {
			  "metric": "Temperature",
			  "unit": "C"
		  },
		  {
			  "metric": "Humidity",
			  "unit": "%RH"
		  }
	  ],
	  "validRange": [
		  -40,
		  85
	  ],
	  "sensorModel": "DHT22",
	  "Desctription": "Temperature & Humidity Sensor"
  }
  ```
- Additional keys may be added.

## Device implementation

Ultimately, who am I to tell you how to implement something. That said, at a minimum, the server must be able to identify a specific device and exchange data with it. To that end, a sequence of: the client module comes on-line, connects to the server over Web Sockets (or some other means like MQTT/AMQT, radio packets, wtf-ever), then delivers it's Resource list which should include everything needed to access them.

As for the local implementation, you will need to know about pins, busses (i2c, spi), specifics about your hardware (is your ADC 10bit, 12bit, 14bit, so that you can present meaningful data [0-3.3v is different than 0-4096 as an integer.])
