import requests
from bs4 import BeautifulSoup
from datetime import datetime

class gym:
    def __init__(self, name, last_count, last_updated, data_lastcount, data_percent):
        self.name = name
        self.last_count = last_count
        self.last_updated = last_updated
        self.data_lastcount = data_lastcount
        self.data_percent = data_percent

    def __tojson__(self):
        return {
            "name": self.name,
            "last_count": self.last_count,
            "last_updated": self.last_updated,
            "data_lastcount": self.data_lastcount,
            "data_percent": self.data_percent
        }


def run():
    website_url = "http://13.60.202.202/connect2/index.php?type=circle&key=2A2BE0D8-DF10-4A48-BEDD-B3BC0CD628E7"
    response = requests.get(website_url)

    html_data = response.text
    soup = BeautifulSoup(html_data, 'html.parser')



    charts_div = soup.select_one(".panel-body")
    if charts_div is None:
        raise Exception("Unable to find charts")

    data_div = charts_div.select(".col-md-3.col-sm-6")

    gyms = []
    for data in data_div:
        circle_chart = data.select_one(".circleChart")
        data_lastcount = float(circle_chart["data-lastcount"])
        data_percent = float(circle_chart["data-percent"])

        # Extract the center name from the text div
        text_div = data.select_one("div[style='text-align:center;']")
        text_parts = text_div.decode_contents().split("<br/>")

        center_name = text_parts[0].strip()  # Extract center name
        last_count = int(text_parts[2].split(": ")[1])
        time_str = text_parts[3].split(": ")[1]  # Extract time string

        # Convert time string to datetime object
        last_updated = datetime.strptime(time_str, "%m/%d/%Y %I:%M %p")
        this_gym = gym(center_name, last_count, last_updated, data_lastcount, data_percent)
        this_gym = this_gym.__tojson__()
        gyms.append(this_gym)

    return gyms
