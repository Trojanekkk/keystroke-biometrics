from pynput.keyboard import Key, Listener
import time

currently_pressed_key = None
start = 0


def on_press(key):
    if hasattr(key, "char"):
        global currently_pressed_key, start
        if key == currently_pressed_key:
            pass
        else:
            start = time.perf_counter()
            print("{0} pressed".format(key))
            currently_pressed_key = key


def on_release(key):
    if hasattr(key, "char"):
        global currently_pressed_key, start
        print("{0} release, delta {1}".format(key, time.perf_counter() - start))
        currently_pressed_key = None
    if key == Key.esc:
        return False


with Listener(on_press=on_press, on_release=on_release) as listener:
    print("Press ESC key to stop caputring")
    listener.join()
