# hey :)
import urequests
import machine
import time
import json

print("hey")
button = machine.Pin(25, machine.Pin.IN, machine.Pin.PULL_UP)
print(button.value())
led = machine.Pin(32, machine.Pin.OUT)
led.on()


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


do_connect()


# response = urequests.post("https://tidy-duck-61.localtunnel.me/1/functions/addReview",
#                          json=dict(taskId="6b22eb6f2dbb49baaeff148bd615141d"),
#                          headers={
#                              "X-Parse-Application-Id": "udos",
#                              "Content-Type": "application/json",
#                              "Accept": "application/json",
#                          })

def sprut():
    response = urequests.post("https://pg-app-3mjkbjxesqq7ejfiys8ahzyqiycdhc.scalabl.cloud/1/functions/addReview",
                              json=dict(
                                  taskId="6b22eb6f2dbb49baaeff148bd615141d"),
                              headers={"X-Parse-Application-Id": "gRVOPbmAuYHBC3ZK4nvA8tA85OEN3doQEMQdrV3E",
                                       "Content-Type": "application/json",
                                       "Accept": "application/json",
                                       "X-Parse-REST-API-Key": "6ejWpvzOydYfTGqsatUtfkLKdCEdQ8NQK5bM3WrE",
                                       "Host": "pg-app-3mjkbjxesqq7ejfiys8ahzyqiycdhc.scalabl.cloud"
                                       })
    response.close()



# while True:
count = 0
while True:

    # time.sleep(1)
    if button.value():
        count += 1
        # led.on()
        # response = urequests.post("https://pg-app-3mjkbjxesqq7ejfiys8ahzyqiycdhc.scalabl.cloud/1",
        #                           data={
        #                               "taskId": "6b22eb6f2dbb49baaeff148bd615141d"},
        #                           headers={
        #   "X-Parse-Application-Id": "gRVOPbmAuYHBC3ZK4nvA8tA85OEN3doQEMQdrV3E",
        #   "Content-Type": "application/json",
        #   "Accept": "application/json",
        #   "X-Parse-REST-API-Key": "6ejWpvzOydYfTGqsatUtfkLKdCEdQ8NQK5bM3WrE",
        #   "Host": "pg-app-3mjkbjxesqq7ejfiys8ahzyqiycdhc.scalabl.cloud"
        #                           })
        # response.close()
        if count > 4:
            sprut()
            count = 0
            time.sleep(120)
        time.sleep(0.3)
    # else:
        # led.off()
    # first = button.value()
    # second = button.value()
    # if first and not second:
    #     led.on()
    #     time.sleep(0.5)
    #     led.off()
    #     print('Button pressed!')
    # elif not first and second:
    #     print('Button released!')


# print("hey")
