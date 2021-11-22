import json
import requests


def get_data(url):
    """Get API data using requests"""
    data = requests.get(url).json()
    print(data)


if __name__ == "__main__":
    url_loerrach = "http://api.positionstack.com/v1/forward?access_key=xxxx&destinations=Rotzingen45BW,DE&origins=Hangstraße46-50Loerach,79539BW,DE"
    get_data(url_loerrach)
