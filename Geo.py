import json
import requests


def get_data(url):
    """Get API data using requests"""
    data = requests.get(url).json()
    print(data)


if __name__ == "__main__":
    url_loerrach = "https://maps.googleapis.com/maps/api/distancematrix/json?key=xxx&destinations=Rotzingen 45 79733 Görwihl BW, DE&origins=Hangstraße 46-50 Loerach, 79539 BW, DE"
    get_data(url_loerrach)
