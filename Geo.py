import json
import requests


def get_data(url):
    """Get API data using requests"""
    data = requests.get(url).json()
    print(data)


if __name__ == "__main__":
    url_loerrach = "http://api.positionstack.com/v1/forward?access_key=af9acbe6bf967714ee3116cd205fb95a&query=Loerrach"
    get_data(url_loerrach)
