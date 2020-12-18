
Google Map:

https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Cluny Rd, Singapore&destinations=Mandai Lake Rd, Singapore&key=AIzaSyBJJ8j6jwik2OqXqY9gs31um1Xtey2F9Vc
https://drive.google.com/open?id=1PSjvO8U3Lc--scms7geUHTBd_tVUnEnk


sudo python3 -m pip install geolocation-python
pip install geolocation-python

destinations = ["zagrzeb"]

gmaps = googlemaps.Client(key='AIzaSyCAr5E1oJa-7h-eMf7Cj9YtkmA6bsvyxaQ')
gmaps = googlemaps.Client(key='AIzaSyCAr5E1oJa-7h-eMf7Cj9YtkmA6bsvyxaQ')
google_maps = GoogleMaps(api_key="AIzaSyCAr5E1oJa-7h-eMf7Cj9YtkmA6bsvyxaQ")


send_url = "http://api.ipstack.com/check?access_key=AIzaSyCAr5E1oJa-7h-eMf7Cj9YtkmA6bsvyxaQ"
geet93test@gmail.com|geet123456


<xpath expr="//field[@name='approval_ids']" position="attributes">
    <attribute name="readonly">0</attribute>
</xpath>

geocode_result = gmaps.geocode('Shivam Grace, Ghatloadiya, Ahmedabad')
geocode_result = gmaps.geocode('703 - Venus Atlantis Corporate Park, Prahlad Nagar, Ahmedabad')
api_key = "AIzaSyCAr5E1oJa-7h-eMf7Cj9YtkmA6bsvyxaQ"
address_or_zipcode = '703 - Venus Atlantis Corporate Park, Prahlad Nagar, Ahmedabad'
endpoint = f"{base_url}?address={address_or_zipcode}&key={api_key}"


directions_result = gmaps.directions("Venus Atlantis Corporate Park Prahlad Nagar Ahmedabad","Shivam Grace Ghatloadiya Ahmedabad", mode="driving", departure_time=now)
directions_result = gmaps.directions("402 Trinetram Flat Opp. Vikas gruh Paldi","Shivam Grace Ghatloadiya Ahmedabad", mode="driving", departure_time=now)

directions_result = gmaps.directions("Sydney Town Hall",
                                     "Parramatta, NSW",
                                     mode="driving",
                                     departure_time=now)
print(directions_result[0]['legs'][0]['distance']['text'])
==========Google Distance Matrix API=========
import simplejson, urllib

orig_lat = 23.0260736
orig_lng = 72.5549056
dest_lat = 22.258651999999998
dest_lng = 71.1923805


orig_coord = orig_lat, orig_lng
dest_coord = dest_lat, dest_lng
url = "http://maps.googleapis.com/maps/api/distancematrix/json?origins={0}&destinations={1}&mode=driving&language=en-EN".format(str(orig_coord),str(dest_coord))
result= simplejson.load(urllib.request.urlopen(url))
driving_time = result['rows'][0]['elements'][0]['duration']['value']

====================Distance lang lat===================
from math import sin, cos, sqrt, atan2, radians

# approximate radius of earth in km
R = 6378.1

lat1 = radians(23.0260736)
lon1 = radians(72.5549056)
lat2 = radians(23.0490112)
lon2 = radians(72.5254144)

dlon = lon2 - lon1
dlat = lat2 - lat1

a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
c = 2 * atan2(sqrt(a), sqrt(1 - a))

distance = R * c

print("Result:", distance)
print("Should be:", 278.546, "km")
=================CurrentLocation=====================
import googlemaps
gmaps = googlemaps.Client(key='AIzaSyCAr5E1oJa-7h-eMf7Cj9YtkmA6bsvyxaQ')
loc = gmaps.geolocate()
print(loc)
----------------------Output-------------------
Geet : {'location': {'lat': 23.0260736, 'lng': 72.5549056}, 'accuracy': 669414}
Vishal : {'location': {'lat': 22.258651999999998, 'lng': 71.1923805}, 'accuracy': 215611}


=====================Map using address=========================
import googlemaps
gmaps = googlemaps.Client(key='AIzaSyCAr5E1oJa-7h-eMf7Cj9YtkmA6bsvyxaQ')
geocode_result = gmaps.geocode('Shivam Grace, Ghatloadiya, Ahmedabad')
print (geocode_result)
[{'access_points': [], 'address_components': 
[{'long_name': '233', 'short_name': '233', 'types': ['premise']},
{'long_name': 'Ghatlodiya', 'short_name': 'Ghatlodiya', 'types': 
['political', 'sublocality', 'sublocality_level_2']},
{'long_name': 'Ahmedabad', 'short_name': 'Ahmedabad', 'types': 
['locality', 'political']}, {'long_name': 'Ahmedabad', 'short_name': 'Ahmedabad', 'types': 
['administrative_area_level_2', 'political']},
{'long_name': 'Gujarat', 'short_name': 'GJ', 'types': 
['administrative_area_level_1', 'political']},
{'long_name': 'India', 'short_name': 'IN', 'types': ['country', 'political']},
{'long_name': '380061', 'short_name': '380061', 'types':['postal_code']}],
'formatted_address': '233, Ghatlodiya, Ahmedabad, Gujarat 380061, India', 'geometry':
{'location': {'lat': 23.0667211, 'lng': 72.5353288}, 'location_type': 'ROOFTOP', 'viewport':
{'northeast': {'lat': 23.0680700802915, 'lng': 72.5366777802915}, 'southwest':
{'lat': 23.0653721197085, 'lng': 72.53397981970849}}}, 'place_id': 'ChIJh8hRtXeDXjkRnYra1T2hhvE',
'plus_code': {'compound_code': '3G8P+M4 Ahmedabad, Gujarat, India', 'global_code': '7JMJ3G8P+M4'},
'types': ['establishment', 'point_of_interest']}]


======================Using IP=======================
import geocoder
myloc = geocoder.ip('me')
print(myloc.latlng)

Geet : [23.0258, 72.5873]
Vishal : [23.0258, 72.5873]

========================================

from geopy import distance
okc_ok = (23.0260736, 72.5549056)
norman_ok = (23.0490112, 72.5254144)
print(distance.distance(okc_ok , norman_ok ).km)

==================================
from haversine import haversine, Unit
geet = (23.0260736, 72.5549056) # (lat, lon)
khyati = (23.0490112, 72.5254144)
haversine(geet, khyati)

reverse_geocode_result = gmaps.reverse_geocode((23.0260736, 72.5549056))

====================================================
import googlemaps
from datetime import datetime
now = datetime.now()
from_loc = 
to_loc = 


directions_result = gmaps.directions("Venus Atlantis Corporate Park Prahlad Nagar Ahmedabad","Shivam Grace Ghatloadiya Ahmedabad", mode="driving", departure_time=now)

