bool on = false;
String command;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Serial.setTimeout(50);
  pinMode(2, OUTPUT);
   digitalWrite(2, LOW);
  pinMode(3, OUTPUT);
   digitalWrite(3, LOW);
  pinMode(4, OUTPUT);
   digitalWrite(4, LOW);
  pinMode(5, OUTPUT);
   digitalWrite(5, LOW);

  Serial.println("init:blink-annoyer");
}

void loop() {

 
  while (Serial.available()){
    command = Serial.readString();
    command.trim();
    Serial.println(command);

    if(command.indexOf("on") > -1){
      digitalWrite(command.substring(0,1).toInt(), HIGH); 
      
    }
    
    if(command.indexOf("off") > -1){
      digitalWrite(command.substring(0,1).toInt(), LOW); 
      
    }
  }
}
