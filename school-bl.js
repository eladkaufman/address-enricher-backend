const axios = require('axios')

exports.postSchoolRec = async (dataRow) => {
    let bbox = locationsToBoundingBox(dataRow.Latitude, dataRow.Longitude);
    const res = await axios.get(`http://overpass-api.de/api/interpreter?data=[out:json][timeout:125];(way["amenity"="school"](${[...bbox]});node["amenity"="school"](${[...bbox]});relation["amenity"="school"](${[...bbox]}););out;>;out skel qt;`)
    elements = res.data.elements.filter((el) => el.tags?.amenity === "school")
    let numOfSchools = elements.length
    dataRow.Schools = numOfSchools
    return dataRow
}



const locationsToBoundingBox = (latitude, longitude, padding = 0.01) => {

    const bounding_box = [, , ,]

    bounding_box[1] = Math.min(bounding_box[1] || longitude, longitude) - padding // west
    bounding_box[0] = Math.min(bounding_box[0] || latitude, latitude) - padding // south
    bounding_box[3] = Math.max(bounding_box[3] || longitude, longitude) + padding // east
    bounding_box[2] = Math.max(bounding_box[2] || latitude, latitude) + padding // north

    return bounding_box
}

