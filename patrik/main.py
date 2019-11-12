# hey :)
import urequests
from machine import PWM, Pin
import machine
import json
import time
import math
import esp32

def do_connect():
    import network
    sta_if = network.WLAN(network.STA_IF)
    if not sta_if.isconnected():
        print('connecting to network...')
        sta_if.active(True)
        # sta_if.connect('Lars iPhone', 'lars1234')
        sta_if.connect('Bonnie2', 'viharbranett123')
        while not sta_if.isconnected():
            pass
    print('network config:', sta_if.ifconfig())

# for i in range(1):
# led = Pin(16, Pin.OUT)
# led.on()
# led = Pin(17, Pin.OUT)
# led.on()
# led = Pin(18, Pin.OUT)
# led.on()

beeper = PWM(Pin(4), freq=440, duty=512)

# button3 = Pin(25, Pin.IN, Pin.PULL_UP)
button2 = Pin(26, Pin.IN, Pin.PULL_UP)
button1 = Pin(27, Pin.IN, Pin.PULL_UP)

print(button2.value())

wake1 = Pin(25, Pin.IN, Pin.PULL_UP)
# time.sleep(1)

beeper.duty(0)

# time.sleep(1)
do_connect()
response = urequests.get("https://neat-penguin-56.localtunnel.me/sleepdiary/1")
# response.close()
if response.text == "yeah":
  beeper.freq(800)
  beeper.duty(400)
  time.sleep(0.01)
  beeper.duty(0)

print(response.text)