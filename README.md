[![Build Status](https://travis-ci.org/ikr/sherpany-map.svg?branch=master)](https://travis-ci.org/ikr/sherpany-map)

# About

A take-home challenge for Sherpany: distance to people on the world map. See the demo at
[ikr.su/h/sherpany-map](http://ikr.su/h/sherpany-map/)

# Functionality

People markers are displayed on the world map, reflecting the geolocation of each person. It's
possible to click on any marker to see the full contact details for the person. Then, it's possible
to click on any land point on the map, placing a pin. The placed pin will be immediately connected
to the 3 people markers on the map:

1. The person closest to the pin
2. The person on the other side of the world* closest to the pin
3. The person farthest from the pin

> *Closest on the other side of the world means the one closest to the geolocation pinned on the
> map among people is in another (south) hemisphere of the sphere having the north pole in the
> pinned location

The full contact details are displayed for all the three people of interest. The distance to the pin
in kilometers is displayed for each of the three as well.

Any time the contact data is displayed, it's possible to download it in the vCard (.vcf) file
format.

# Development

To run an own development instance, please do the following

```
$ git clone https://github.com/ikr/sherpany-map.git
…
$ cd sherpany-map
$ npm install
…
$ ./bin/fetch_data
…
$ npm run build
…
$ npm start
```

Then the Web application will be available at [http://localhost:8000/](http://localhost:8000/)

To lint and run the tests:

```
$ npm test
```
