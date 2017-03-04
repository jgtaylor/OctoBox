# A JSON based protocol

We can treat it like a giant packet with no limits, except real world performance. It doesn't need to be tight - we don't expect unbearably slow networks, and if it's slow enough to impact a <1k frame/packet, then it's probably too slow to be of any use.

That said, the server should be tracking the clients individually; that is, each client should have it's own socket (or, in the MQTT/AMQT case, a 'topic'). The server should establish the identity and capabilities of the client - that is, who or what is this, and what resources are you offering. Further, the client should inform the server, as part of it's capabilities, how those capabilities should be accessed. It may be valuable to include an eventing section, defining events, or possible events, etc.

## Frames

The following is an example "frame", or "packet" from the client to the server. It includes a "registration" message and "capabilitiesList" message:
```json
[
	"registrationReq",
	{
		"moduleID": "my-Spiffy-SpaceShip-system",
		"certHash": "xalks923alksoads0-knajfo13323#@!",
		"info": "https://spiffy-spaceships.com/guidance/am22394",
		"OAuth": "some kind of key or identity thing here",
		"apiVersion": "2.3a",
		"SupportedExentions": ["ssh", "https", "mqtt", "rpc"],
		"rdfVocabulary": "http://container.io/vocabulary/spiffy-spaceships"
	},
	"capabilitiesList",
	{
		"devices": [
			{
				"deviceID": "uuid-string",
				"deviceType": "button",
				"deviceCmds": ["on", "off", "toggle"],
				"rdfVocabulary": "http://container.io/vocabulary/spiffy-spaceships/uuid-string"
			},
			{
				"deviceID": "uuid-string-2",
				"deviceType": "virtual",
				"deviceCmds": ["start", "takeoff", "land", "shutdown"],
				"rdfVocabulary": "http://container.io/vocabulary/spiffy-spaceships/uuid-string-2",
				"meta": {
					"userMsg": "Buckle up, we're taking off!",
					"defaultMode": "novice"
				}
			}
		]
	}
]
```

This allows stacking messages into a single delivery, avoiding a server response to acknowledge receipt of the message. it also enables non-sequential implementations - a particular brain module might only be concerned with registration after it knows what's on offer. 
