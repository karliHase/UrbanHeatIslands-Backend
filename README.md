# UrbanHeatIslands-Backend
backend

1) `npm install`
2) `npm install yarn`
3) `npm start`

# Request Beszirk
`localhost:3000/getData/:bezirk`
 bezirk = 1-23/all
Example:
`http://localhost:3000/getData/16` <br>
returns:<br>
[<br>
{<br>
"station_id":"IOTTAK18",<br>
"temp":7,<br>
"windspeed":7,<br>
"neighborhood":"Ottakring",<br>
"lon":"16.290072",<br>
"elevation":102,<br>
"lat":"48.215323",<br>
"pressure":"990.42",<br>
"bezirk_id":16<br>
}<br>

# Request Bezirk specific information
`localhost:3000/getData/:bezirk/:Info`
Info= temp/pressure/elevation/windspeed

Example:
`http://localhost:3000/getData/16/temp`<br>
retunrs: 3.4°;<br>

# Request Station 
`localhost:3000/getData/:stationid`

Example:
`http://localhost:3000/getStation/IMEIDL17`<br>
retunrs: <br>
{<br>
"station_id":"IMEIDL17",<br>
"temp":4,<br>
"windspeed":3,<br>
"neighborhood":"Meidling",<br>
"lon":"16.332",<br>
"elevation":190,<br>
"lat":"48.16",<br>
"pressure":"1006.1"<br>
}<br>

# Request specific station information
`localhost:3000/getData/:stationid:info`
Info= temp/pressure/elevation/windspeed

Example:
`http://localhost:3000/getStation/IMEIDL17/temp`<br>
retunrs: <br>
temp":4<br>
<br>
# Station with Bugs
ILEOPO82
