const axios = require('axios')

exports.postSchoolRec = async (dataRow) => {
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   id =  ${dataRow.SAMPLE_ID}    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
    let bbox = locationsToBoundingBox(dataRow.Latitude, dataRow.Longitude);
    // const res = await axios.get(`http://www.overpass-api.de/api/xapi?*[amenity=school][bbox=(${bbox[0]}, ${bbox[1]}, ${bbox[2]}, ${bbox[3]})]`)
    // let numOfSchools = (res.data.match(/k="amenity" v="school"/g) || []).length;
    // dataRow.data[0].Schools = numOfSchools
    console.log(dataRow)
    const res = await axios.get(`http://overpass-api.de/api/interpreter?data=[out:json][timeout:50];(way["amenity"="school"](${[...bbox]});node["amenity"="school"](${[...bbox]});relation["amenity"="school"](${[...bbox]}););out;>;out skel qt;`)
    elements = res.data.elements.filter((el) => el.tags?.amenity === "school")
    console.log(elements.length)
    let numOfSchools = elements.length
    dataRow.Schools = numOfSchools
    return dataRow

}



const locationsToBoundingBox = (latitude, longitude, padding = 0.01) => {

    const bounding_box = [, , ,]
    // for Xapi:
    // bounding_box[0] = Math.min(bounding_box[0] || longitude, longitude) - padding
    // bounding_box[1] = Math.min(bounding_box[1] || latitude, latitude) - padding
    // bounding_box[2] = Math.max(bounding_box[2] || longitude, longitude) + padding
    // bounding_box[3] = Math.max(bounding_box[3] || latitude, latitude) + padding
    // for overpass turbo:
    bounding_box[1] = Math.min(bounding_box[1] || longitude, longitude) - padding // west
    bounding_box[0] = Math.min(bounding_box[0] || latitude, latitude) - padding // south
    bounding_box[3] = Math.max(bounding_box[3] || longitude, longitude) + padding // east
    bounding_box[2] = Math.max(bounding_box[2] || latitude, latitude) + padding // north

    return bounding_box
}

