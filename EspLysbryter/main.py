# hey :)
import urequests
import machine
import json
import time
import math

print("hey")

def translate(value, leftMin, leftMax, rightMin, rightMax):
    # Figure out how 'wide' each range is
    leftSpan = leftMax - leftMin
    rightSpan = rightMax - rightMin

    # Convert the left range into a 0-1 range (float)
    valueScaled = float(value - leftMin) / float(leftSpan)

    # Convert the 0-1 range into a value in the right range.
    return int(rightMin + (valueScaled * rightSpan))

# for i in range(1):
led = machine.Pin(2, machine.Pin.OUT)
# led.on()

potmeter = machine.ADC(machine.Pin(34))
potmeter.atten(machine.ADC.ATTN_11DB)

print(translate(potmeter.read(), 0, 4095, 0, 1024))
servo1Pwm = machine.PWM(machine.Pin(18, machine.Pin.OUT))
servo2Pwm = machine.PWM(machine.Pin(19, machine.Pin.OUT))

servo1Pwm.freq(100)
servo1Pwm.duty(229)
servo2Pwm.freq(100)
servo2Pwm.duty(159)

while False:
    val = translate(potmeter.read(), 0, 4095, 0, 1024)
    servo2Pwm.duty(val)
    time.sleep(0.1)


def onway():
    servo1Pwm.duty(151)
    time.sleep(1)
    servo1Pwm.duty(229)
    time.sleep(1)


def otherway():
    servo2Pwm.duty(69)
    time.sleep(1)
    servo2Pwm.duty(159)
    time.sleep(1)

onway()
otherway()


def do_connect():
    import network
    sta_if = network.WLAN(network.STA_IF)
    if not sta_if.isconnected():
        print('connecting to network...')
        sta_if.active(True)
        # sta_if.connect('Lars iPhone', 'lars1234')
        sta_if.connect('Bonnie', 'viharbranett123')
        while not sta_if.isconnected():
            pass
    print('network config:', sta_if.ifconfig())


print('hi')
do_connect()

while True:
    response = urequests.get("http://piclox.larskarbo.no:1225/longpollstatus/lightswitch")
    if "on" in response.text:
        onway()
    if "off" in response.text:
        otherway()
    response.close()
