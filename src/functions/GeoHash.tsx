//source url https://www.movable-type.co.uk/scripts/geohash.html
// and https://jsbin.com/misomegafa/edit?html,js,output

import firestore from '@react-native-firebase/firestore';

const base32 = '0123456789bcdefghjkmnpqrstuvwxyz';


// Default geohash length
export let g_GEOHASH_PRECISION = 10;

// Characters used in location geohashes
export let g_BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz";

// The meridional circumference of the earth in meters
export let g_EARTH_MERI_CIRCUMFERENCE = 40007860;

// Length of a degree latitude at the equator
export let g_METERS_PER_DEGREE_LATITUDE = 110574;

// Number of bits per geohash character
export let g_BITS_PER_CHAR = 5;

// Maximum length of a geohash in bits
export let g_MAXIMUM_BITS_PRECISION = 22 * g_BITS_PER_CHAR;

// Equatorial radius of the earth in meters
export let g_EARTH_EQ_RADIUS = 6378137.0;

export let g_E2 = 0.00669447819799;

// Cutoff for rounding errors on double calculations
export let g_EPSILON = 1e-12;

Math.log2 = Math.log2 || function (x) {
    return Math.log(x) / Math.log(2);
};



export function encodeGeohash(location: any, precision: any) {
    validateLocation(location);
    if (typeof precision !== "undefined") {
        if (typeof precision !== "number" || isNaN(precision)) {
            throw new Error("precision must be a number");
        }
        else if (precision <= 0) {
            throw new Error("precision must be greater than 0");
        }
        else if (precision > 22) {
            throw new Error("precision cannot be greater than 22");
        }
        else if (Math.round(precision) !== precision) {
            throw new Error("precision must be an integer");
        }
    }

    // Use the global precision default if no precision is specified
    precision = precision || g_GEOHASH_PRECISION;

    var latitudeRange = {
        min: -90,
        max: 90
    };
    var longitudeRange = {
        min: -180,
        max: 180
    };
    var hash = "";
    var hashVal = 0;
    var bits = 0;
    var even: any = 1;

    while (hash.length < precision) {
        var val = even ? location[1] : location[0];
        var range = even ? longitudeRange : latitudeRange;
        var mid = (range.min + range.max) / 2;

        /* jshint -W016 */
        if (val > mid) {
            hashVal = (hashVal << 1) + 1;
            range.min = mid;
        }
        else {
            hashVal = (hashVal << 1) + 0;
            range.max = mid;
        }
        /* jshint +W016 */

        even = !even;
        if (bits < 4) {
            bits++;
        }
        else {
            bits = 0;
            hash += g_BASE32[hashVal];
            hashVal = 0;
        }
    }

    return hash;
};

export function decode(geohash: any) {

    const bounds_: any = bounds(geohash); // <-- the hard work
    // now just determine the centre of the cell...

    const latMin = bounds_.sw.lat, lonMin = bounds_.sw.lon;
    const latMax = bounds_.ne.lat, lonMax = bounds_.ne.lon;

    // cell centre
    let lat: any = (latMin + latMax) / 2;
    let lon: any = (lonMin + lonMax) / 2;

    // round to close to centre without excessive precision: ⌊2-log10(Δ°)⌋ decimal places
    lat = lat.toFixed(Math.floor(2 - Math.log(latMax - latMin) / Math.LN10));
    lon = lon.toFixed(Math.floor(2 - Math.log(lonMax - lonMin) / Math.LN10));

    return { lat: Number(lat), lon: Number(lon) };
}


export function bounds(geohash: any) {
    if (geohash.length == 0) throw new Error('Invalid geohash');

    geohash = geohash.toLowerCase();

    let evenBit = true;
    let latMin = -90, latMax = 90;
    let lonMin = -180, lonMax = 180;

    for (let i = 0; i < geohash.length; i++) {
        const chr = geohash.charAt(i);
        const idx = base32.indexOf(chr);
        if (idx == -1) throw new Error('Invalid geohash');

        for (let n = 4; n >= 0; n--) {
            const bitN = idx >> n & 1;
            if (evenBit) {
                // longitude
                const lonMid = (lonMin + lonMax) / 2;
                if (bitN == 1) {
                    lonMin = lonMid;
                } else {
                    lonMax = lonMid;
                }
            } else {
                // latitude
                const latMid = (latMin + latMax) / 2;
                if (bitN == 1) {
                    latMin = latMid;
                } else {
                    latMax = latMid;
                }
            }
            evenBit = !evenBit;
        }
    }

    const bounds = {
        sw: { lat: latMin, lon: lonMin },
        ne: { lat: latMax, lon: lonMax },
    };

    return bounds;
}


export function adjacent(geohash: any, direction: any) {
    // based on github.com/davetroy/geohash-js

    geohash = geohash.toLowerCase();
    direction = direction.toLowerCase();

    if (geohash.length == 0) throw new Error('Invalid geohash');
    if ('nsew'.indexOf(direction) == -1) throw new Error('Invalid direction');

    const neighbour: any = {
        n: ['p0r21436x8zb9dcf5h7kjnmqesgutwvy', 'bc01fg45238967deuvhjyznpkmstqrwx'],
        s: ['14365h7k9dcfesgujnmqp0r2twvyx8zb', '238967debc01fg45kmstqrwxuvhjyznp'],
        e: ['bc01fg45238967deuvhjyznpkmstqrwx', 'p0r21436x8zb9dcf5h7kjnmqesgutwvy'],
        w: ['238967debc01fg45kmstqrwxuvhjyznp', '14365h7k9dcfesgujnmqp0r2twvyx8zb'],
    };
    const border: any = {
        n: ['prxz', 'bcfguvyz'],
        s: ['028b', '0145hjnp'],
        e: ['bcfguvyz', 'prxz'],
        w: ['0145hjnp', '028b'],
    };

    const lastCh = geohash.slice(-1);    // last character of hash
    let parent = geohash.slice(0, -1); // hash without last character

    const type = geohash.length % 2;

    // check for edge-cases which don't share common prefix
    if (border[direction][type].indexOf(lastCh) != -1 && parent != '') {
        parent = adjacent(parent, direction);
    }

    // append letter for direction to parent
    return parent + base32.charAt(neighbour[direction][type].indexOf(lastCh));
}

export function neighbours(geohash: any) {
    return {
        'n': adjacent(geohash, 'n'),
        'ne': adjacent(adjacent(geohash, 'n'), 'e'),
        'e': adjacent(geohash, 'e'),
        'se': adjacent(adjacent(geohash, 's'), 'e'),
        's': adjacent(geohash, 's'),
        'sw': adjacent(adjacent(geohash, 's'), 'w'),
        'w': adjacent(geohash, 'w'),
        'nw': adjacent(adjacent(geohash, 'n'), 'w'),
    };
}

export function validateGeohash(geohash: any) {
    var error;

    if (typeof geohash !== "string") {
        error = "geohash must be a string";
    }
    else if (geohash.length === 0) {
        error = "geohash cannot be the empty string";
    }
    else {
        for (var i = 0, length = geohash.length; i < length; ++i) {
            if (g_BASE32.indexOf(geohash[i]) === -1) {
                error = "geohash cannot contain \"" + geohash[i] + "\"";
            }
        }
    }

    if (typeof error !== "undefined") {
        throw new Error("Invalid GeoFire geohash '" + geohash + "': " + error);
    }
};


export function geohashQuery(geohash: any, bits: any) {
    validateGeohash(geohash);
    var precision = Math.ceil(bits / g_BITS_PER_CHAR);
    if (geohash.length < precision) {
        return [geohash, geohash + "~"];
    }
    geohash = geohash.substring(0, precision);
    var base = geohash.substring(0, geohash.length - 1);
    var lastValue = g_BASE32.indexOf(geohash.charAt(geohash.length - 1));
    var significantBits = bits - (base.length * g_BITS_PER_CHAR);
    var unusedBits = (g_BITS_PER_CHAR - significantBits);
    /*jshint bitwise: false*/
    // delete unused bits
    var startValue = (lastValue >> unusedBits) << unusedBits;
    var endValue = startValue + (1 << unusedBits);
    /*jshint bitwise: true*/
    if (endValue >= g_BASE32.length) {
        return [base + g_BASE32[startValue], base + "~"];
    }
    else {
        return [base + g_BASE32[startValue], base + g_BASE32[endValue]];
    }
};


export function geohashQueries(center: any, radius: any) {
    validateLocation(center);
    var queryBits = Math.max(1, boundingBoxBits(center, radius));
    var geohashPrecision = Math.ceil(queryBits / g_BITS_PER_CHAR);
    var coordinates = boundingBoxCoordinates(center, radius);
    var queries = coordinates.map(function (coordinate) {
        return geohashQuery(encodeGeohash(coordinate, geohashPrecision), queryBits);
    });
    // remove duplicates
    return queries.filter(function (query, index) {
        return !queries.some(function (other, otherIndex) {
            return index > otherIndex && query[0] === other[0] && query[1] === other[1];
        });
    });
};

export function metersToLongitudeDegrees(distance: any, latitude: any) {
    var radians = degreesToRadians(latitude);
    var num = Math.cos(radians) * g_EARTH_EQ_RADIUS * Math.PI / 180;
    var denom = 1 / Math.sqrt(1 - g_E2 * Math.sin(radians) * Math.sin(radians));
    var deltaDeg = num * denom;
    if (deltaDeg < g_EPSILON) {
        return distance > 0 ? 360 : 0;
    }
    else {
        return Math.min(360, distance / deltaDeg);
    }
};

export function degreesToRadians(degrees: any) {
    if (typeof degrees !== "number" || isNaN(degrees)) {
        throw new Error("Error: degrees must be a number");
    }

    return (degrees * Math.PI / 180);
};


export function boundingBoxCoordinates(center: any, radius: any) {
    var latDegrees = radius / g_METERS_PER_DEGREE_LATITUDE;
    var latitudeNorth = Math.min(90, center[0] + latDegrees);
    var latitudeSouth = Math.max(-90, center[0] - latDegrees);
    var longDegsNorth = metersToLongitudeDegrees(radius, latitudeNorth);
    var longDegsSouth = metersToLongitudeDegrees(radius, latitudeSouth);
    var longDegs = Math.max(longDegsNorth, longDegsSouth);
    return [
        [center[0], center[1]],
        [center[0], wrapLongitude(center[1] - longDegs)],
        [center[0], wrapLongitude(center[1] + longDegs)],
        [latitudeNorth, center[1]],
        [latitudeNorth, wrapLongitude(center[1] - longDegs)],
        [latitudeNorth, wrapLongitude(center[1] + longDegs)],
        [latitudeSouth, center[1]],
        [latitudeSouth, wrapLongitude(center[1] - longDegs)],
        [latitudeSouth, wrapLongitude(center[1] + longDegs)]
    ];
};

export function wrapLongitude(longitude: any) {
    if (longitude <= 180 && longitude >= -180) {
        return longitude;
    }
    var adjusted = longitude + 180;
    if (adjusted > 0) {
        return (adjusted % 360) - 180;
    }
    else {
        return 180 - (-adjusted % 360);
    }
};


export function boundingBoxBits(coordinate: any, size: any) {
    var latDeltaDegrees = size / g_METERS_PER_DEGREE_LATITUDE;
    var latitudeNorth = Math.min(90, coordinate[0] + latDeltaDegrees);
    var latitudeSouth = Math.max(-90, coordinate[0] - latDeltaDegrees);
    var bitsLat = Math.floor(latitudeBitsForResolution(size)) * 2;
    var bitsLongNorth = Math.floor(longitudeBitsForResolution(size, latitudeNorth)) * 2 - 1;
    var bitsLongSouth = Math.floor(longitudeBitsForResolution(size, latitudeSouth)) * 2 - 1;
    return Math.min(bitsLat, bitsLongNorth, bitsLongSouth, g_MAXIMUM_BITS_PRECISION);
};

export function longitudeBitsForResolution(resolution: any, latitude: any) {
    var degs = metersToLongitudeDegrees(resolution, latitude);
    return (Math.abs(degs) > 0.000001) ? Math.max(1, Math.log2(360 / degs)) : 1;
};

export function latitudeBitsForResolution(resolution: any) {
    return Math.min(Math.log2(g_EARTH_MERI_CIRCUMFERENCE / 2 / resolution), g_MAXIMUM_BITS_PRECISION);
};


export function validateLocation(location: any) {
    var error;

    if (!Array.isArray(location)) {
        error = "location must be an array";
    }
    else if (location.length !== 2) {
        error = "expected array of length 2, got length " + location.length;
    }
    else {
        var latitude = location[0];
        var longitude = location[1];

        if (typeof latitude !== "number" || isNaN(latitude)) {
            error = "latitude must be a number";
        }
        else if (latitude < -90 || latitude > 90) {
            error = "latitude must be within the range [-90, 90]";
        }
        else if (typeof longitude !== "number" || isNaN(longitude)) {
            error = "longitude must be a number";
        }
        else if (longitude < -180 || longitude > 180) {
            error = "longitude must be within the range [-180, 180]";
        }
    }

    if (typeof error !== "undefined") {
        throw new Error("Invalid GeoFire location '" + location + "': " + error);
    }
};

export function getQueriesForDocumentsAround(ref: any, center: any, radiusInKm: any, is_shop: any) {
    var geohashesToQuery = geohashQueries([center.lat, center.lon], radiusInKm * 1000);
    if (is_shop)
        return geohashesToQuery.map(function (location) {
            return ref.where('is_confirm', '==', true).where('is_disabled', '==', false).where("address.geohash", ">=", location[0]).where("address.geohash", "<=", location[1]);
        });
    else
        return geohashesToQuery.map(function (location) {
            return ref.where('is_disabled', '==', false).where('is_verify', '==', true).where('app_type', '==', 'Shop').where('client_type', '==', 'Professor').where("client_info.address.geohash", ">=", location[0]).where("client_info.address.geohash", "<=", location[1]);
        });
}

export function distance(location1: any, location2: any) {
    validateLocation(location1);
    validateLocation(location2);

    var radius = 6371; // Earth's radius in kilometers
    var latDelta = degreesToRadians(location2[0] - location1[0]);
    var lonDelta = degreesToRadians(location2[1] - location1[1]);

    var a = (Math.sin(latDelta / 2) * Math.sin(latDelta / 2)) +
        (Math.cos(degreesToRadians(location1[0])) * Math.cos(degreesToRadians(location2[0])) *
            Math.sin(lonDelta / 2) * Math.sin(lonDelta / 2));

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return radius * c;
};

export function showMapForState(current_location: any, MAX_DISTANCE: any, dispatch: any) {
    let all_type = ['Shop', 'Professor']
    var center = current_location;
    let results: any = [];
    let timeOut: any = null;
    all_type.map((type, index) => {
        let is_shop = type === 'Shop';
        let collection = is_shop ? firestore().collection('shops') : firestore().collection('clients')
        var queries = getQueriesForDocumentsAround(collection, center, MAX_DISTANCE, is_shop);
        queries.forEach(function (query) {
            query.get().then(function (querySnapshot: any) {
                if (querySnapshot.docs.length > 0) {
                    querySnapshot.forEach(function (doc: any, querySnapshotIndex: any) {
                        var data = doc.data();
                        var dist = distance(
                            [center.lat, center.lon],
                            is_shop ? [data.address.latitude, data.address.longitude] :
                                [data.client_info.address.latitude, data.client_info.address.longitude]
                        );
                        if (dist <= MAX_DISTANCE) {
                            results.push({
                                id: doc.id,
                                items: data,
                                type: is_shop ? 'Shop' : 'Professor',
                                dist: dist.toFixed(2)
                            });
                        }
                        if (timeOut) {
                            clearTimeout(timeOut)
                        }
                        timeOut = setTimeout(() => {
                            dispatch({
                                type: 'LOAD_SHOPS', shops: results.sort(function (a: any, b: any) {
                                    return Number(a.dist) - Number(b.dist)
                                }).slice(0, 1000)
                            });
                        }, 1000);
                    });
                }
            });
        })
    })
}

// export function oldShowMapForState(current_location: any, collection: any, MAX_DISTANCE: any, is_shop: any) {
//     var map: any;
//     var totalDistanceKm = 0, matchDistanceKm = 0, docs: any = {}, maxDistanceKm = 0;
//     var center = current_location;

//     var queries = getQueriesForDocumentsAround(collection, center, MAX_DISTANCE, is_shop);
//     queries.forEach(function (query) {
//         query.get().then(function (querySnapshot: any) {
//             querySnapshot.forEach(function (doc: any) {
//                 var data = doc.data();
//                 var dist = distance(
//                     [center.lat, center.lon],
//                     is_shop ? [data.address.latitude, data.address.longitude] :
//                         [data.client_info.address.latitude, data.client_info.address.longitude]
//                 );
//                 if (dist <= MAX_DISTANCE && !docs[doc.id]) {
//                     docs[doc.id] = doc.data();
//                     matchDistanceKm += dist;
//                 }
//                 totalDistanceKm += dist;
//                 if (dist > maxDistanceKm) {
//                     maxDistanceKm = dist;
//                 }
//                 // console.log(dist, MAX_DISTANCE)
//                 // console.log("The total " + querySnapshot.docs.length + " query results are a total of " + Math.round(totalDistanceKm) + "km from the center,matchCount=" + Object.keys(docs).length + " matchDistance=" + Math.round(matchDistanceKm) + "km");
//             });
//         });
//     })
// }