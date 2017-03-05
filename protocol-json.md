# A JSON based protocol

We can treat it like a giant packet with no limits, except real world performance. It doesn't need to be tight - we don't expect unbearably slow networks, and if it's slow enough to impact a <1k frame/packet, then it's probably too slow to be of any use.

That said, the server should be tracking the clients individually; that is, each client should have it's own socket (or, in the MQTT/AMQT case, a 'topic'). The server should establish the identity and capabilities of the client - that is, who or what is this, and what resources are you offering. Further, the client should inform the server, as part of it's capabilities, how those capabilities should be accessed. It may be valuable to include an eventing section, defining events, or possible events, etc.

## Frames

The following is an example "frame", or "packet" from the client to the server. It includes a "registration" message and "capabilitiesList" message:
```json
[
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
        }
    ],
    [
        "capabilitiesList",
        {
            "devices": [{
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
]
```

The above represents a fragment of the Spiffy Spaceship system. It first registers itself with a Device Engine instance, then provides 2 devices, a `button` and a `virtual`.

The `button` appears simple enough, and what it does is mostly only relevant to the applications that will use it.

The `virtual`, on the other hand, may not be so simple with such commands as `takeoff` & `land`. In this case, such things are likely layered below with many components that enable the takeoff and landing, but are not visible to the Device Engine. The `meta` property becomes useful here, as the Device Engine can forward on the meta values to the application so that there may be a button rendered that, when clicked, starts the Spaceship or makes it take-off.

This allows stacking messages into a single delivery, avoiding a server response to acknowledging receipt of the message. it also enables non-sequential implementations - a particular brain module might only be concerned with registration after it knows what's on offer.

## General description

(the use of the word "packets" here represents a logical grouping, not the semi-physical TCP / UDP datagram packets) Packets are `arrays` consisting of tuples. Each tuple comprises a message via a string describing the incoming data, followed by an object of that data. The packet identifier _should_ have an RDF Vocabulary somewhere, eventually.

(It may be easier to refer to a single JSON tuple as a message, and a collection [defined as >0] of tuples as a packet)

## more formal description:

Each message will consist of a JSON `Array` tuple. [ "x", { y: "z" } ]

Each tuple will have as a Zero element, the message type (e.g. `registrationReq`, `capabilitiesList` as in the example above).

The objects in the payload _shall_ be defined by the message type.

Multiple messages may be sent at once, as in the example above.

### Initial Message Descriptions

`registrationReq`: shall provide an object with enough information to register with the local group/network. This may include certificates, hashes, authentication tokens, etc.

`capabilitiesList`: shall describe (_subject to change_) the devices, or services being offered. This should include enough information so that the server can access the device. Minimally, this should include a `deviceID` and a `deviceType`.

`cmds`: shall reference a previously registered device, and a specific command (e.g. `read`, `calibrate`, `synchronize`).
