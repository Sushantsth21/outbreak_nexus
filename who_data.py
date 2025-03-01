import requests

country = "Nigeria"

url = f"https://apps.who.int/gho/data/view.main.1540_62?lang=en"

response = requests.get(url)

if response.status_code == 200:
    print(response.text)
else:
    print(f"Failed to retrieve data. Status code: {response.status_code}")