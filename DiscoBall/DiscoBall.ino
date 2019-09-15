//Include Libraries
#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>
#include <Servo.h>

Servo myservo;
//create an RF24 object
RF24 radio(9, 8);  // CE, CSN

//address through which two modules communicate.
const byte address[6] = "00001";

void setup()
{
  while (!Serial);
    Serial.begin(9600);
  
  radio.begin();

  pinMode(LED_BUILTIN, OUTPUT);
  
  //set the address
  radio.openReadingPipe(0, address);
  
  //Set module as receiver
  radio.startListening();

  myservo.attach(6);
}

void loop()
{
  
  //Read the data if available in buffer
  if (radio.available())
  {
    char text[32] = {0};
    radio.read(&text, sizeof(text));
    
    int result = atoi(text);
    int ok = text[0];
    Serial.println(ok);
    if(abs(ok-50) < 5){
      ok = 50;
    }
    int servoval = map(ok, 0, 100, 0, 180);
    myservo.write(servoval);
    digitalWrite(LED_BUILTIN, HIGH);
  }
  
}
