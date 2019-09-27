# hey :)
import urequests
import machine
import json
import time
import math

print("hey")
motorpin1 = machine.Pin(33, machine.Pin.OUT)
motorpin2 = machine.Pin(18, machine.Pin.OUT)
enablePin = machine.Pin(19, machine.Pin.OUT)
# enablePin.off()
# led = machine.PWM(machine.Pin(18), freq=1000)
enablePwm = machine.PWM(enablePin)
# pwm2 = machine.PWM(motorpin2)

# led.on()
enablePwm.freq(100)
enablePwm.duty(1023)
# pwm1.duty(100)
# pwm2.freq(500)
# pwm2.duty(512)

# on = False
# hey = 500
# while True:
#     hey = hey + 50
#     enablePwm.duty(hey)
#     if on:
#         motorpin1.on()
#         motorpin2.off()
#         on = True
#     else:
#         motorpin1.off()
#         motorpin2.on()
#         on = True
#     time.sleep(1)
def forwards():
    motorpin1.on()
    motorpin2.off()
def stop():
    motorpin1.off()
    motorpin2.off()
def backwards():
    motorpin1.off()
    motorpin2.on()

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
    response = urequests.get("https://hungry-cobra-91.localtunnel.me")
    if "forwards" in response.text:
        forwards()
    if "stop" in response.text:
        stop()
    if "backwards" in response.text:
        backwards()
    response.close()
