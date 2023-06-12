//direccion aleatoria
var clientId = "ws" + Math.random();
// Create a client instance
var client = new Paho.MQTT.Client("192.168.1.24", 9001, clientId);

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});
Pontenc1 = 0;
Pontenc2 = 0;
console.log("aaaaaaa");

// called when the client connects
function onConnect() {

  // Once a connection has been made, make a subscription and send a message.
  console.log("Conectado MQTT-WebSocket");
    client.subscribe("topico");
    // client.subscribe("IoT/Pot2");
    message = new Paho.MQTT.Message("Hello");
    message.destinationName = "World";
    client.send(message);
      console.log("messageSent");
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("Conexión perdida:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log(message.destinationName + ": " + message.payloadString);

  /*if(message.destinationName == 'topico')
    {
        // document.getElementById("ValorA").textContent =  message.payloadString;
        Pontenc1 = parseFloat(message.payloadString);
    }

    if(message.destinationName == 'IoT/Pot2')
    {
        // document.getElementById("ValorB").textContent =  message.payloadString;
        Pontenc2 = parseFloat(message.payloadString);
    }*/

}


// function ngbCarouselTransitionOut(){
//   client.on('connect', onConnect)
// }

