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
