import storage from '@react-native-firebase/storage'

export const makeid = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+<>?:|.,";

    for (var i = 0; i < 20; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
export const GetImage = async (imageAsFileName, folderPath = '') => {
    return new Promise((resolve, reject) => {
        const images = storage().ref().child(folderPath);
        const image = images.child(imageAsFileName);
        image.getDownloadURL().then((url) => {
            resolve(url)
        }).catch(() => {
            reject('')
        });
    })

};

export const ConvertDateToTime = (date) => {
    let hour = date.getHours();
    if (Number(hour) < 10) {
        hour = '0' + hour;
    }
    let minute = date.getMinutes();
    if (Number(minute) < 10) {
        minute = '0' + minute;
    }
    let am_pm = Number(hour) > 12 ? 'PM' : 'AM'
    let convert = hour + ":" + minute + ' ' + am_pm;
    return convert;
}

export function createKeyWords(names) {
    let arrNames = []
    let curName = ''
    names.split('').forEach((letter) => {
        curName += letter
        arrNames.push(curName)
    });
    names.split(' ').forEach((letter) => {
        curName = ''
        letter.split('').forEach((char) => {
            curName += char
            arrNames.push(curName)
        })
    });
    arrNames = [...new Set(arrNames.map((r) => r))]
    return arrNames;
}

export function fetchApi(dispatch, access_token, alias, id, page, search = '') {
    return new Promise(async (resolve, reject) => {
        let _page = (page === '' ? '' : `page=${page}${search === '' ? '' : '&'}`);
        _page = _page + (search === '' ? '' : `name=${search}`)
        dispatch({ type: 'LOAD_FETCH_STATE', fetch_state: 'loading' })
        fetch(`${default_url}${alias}${id === '' ? '?' : '/'}${id === '' ? _page : (id + `?${_page}`)}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token} `
            }
        })
            .then((response) => response.json())
            .then((json) => {
                resolve(json)
            })
            .catch((error) => {
                dispatch({ type: 'LOAD_FETCH_STATE', fetch_state: 'error' })
                reject(error);
            });
    })
}

export function fetchApiWithAccessToken(dispatch, alias, id, page, search = '') {
    return new Promise(async (resolve, reject) => {
        let _page = (page === '' ? '' : `page=${page}${search === '' ? '' : '&'}`);
        _page = _page + (search === '' ? '' : `name=${search}`)
        dispatch({ type: 'LOAD_FETCH_STATE', fetch_state: 'loading' })
        fetchAccessToken(dispatch).then((value) => {
            if (value.token === '' || value.token === undefined) {
                dispatch({ type: 'LOAD_FETCH_STATE', fetch_state: 'problem' })
                return;
            }
            fetch(`${default_url}${alias}${id === '' ? '?' : '/'}${id === '' ? _page : (id + `?${_page}`)}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${value.token}`
                }
            })
                .then((response) => response.json())
                .then((json) => {
                    resolve(json)
                    setTimeout(() => {
                        dispatch({ type: 'LOAD_FETCH_STATE', fetch_state: 'done' })
                    }, 100);
                })
                .catch((error) => {
                    console.log(error)
                    dispatch({ type: 'LOAD_FETCH_STATE', fetch_state: 'error' })
                    reject(error);
                });
        })
    })
}

export const isEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
        return false;
    }
    else {
        return true;
    }
}


export const pad = (num, size) => {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

export const dateDiffInNotification = (publish_date) => {
    var dt1 = new Date(publish_date);
    var dt2 = new Date();
    const cal = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    let duration = ''
    if (cal == 0) {
        if (dt2.getHours() - dt1.getHours() == 0) {
            if (dt2.getMinutes() - dt1.getMinutes() <= 0) {
                duration = 'Just Now'
            }
            else {
                duration = dt2.getMinutes() - dt1.getMinutes() + ' minute' + (dt2.getMinutes() - dt1.getMinutes() === 1 ? '' : 's') + ' ago'
            }
        }
        else {
            duration = dt2.getHours() - dt1.getHours() + ' hour' + (dt2.getHours() - dt1.getHours() === 1 ? '' : 's') + ' ago'
        }
    }
    else if (cal === 1) {
        duration = 'Yesterday at ' + ConvertDateToTime(dt1)
    }
    else if (cal < 7) {
        duration = ConvertToEnglishDayDate(dt1) + ' at ' + ConvertDateToTime(dt1)
    }
    else if (cal > 6) {
        duration = ConvertToEnglishDateNoDay(dt1, true) + ' at ' + ConvertDateToTime(dt1)
    }
    else {
        duration = ''
    }
    return duration;
}
export const ConvertToEnglishDayDate = (date) => {
    let convert = ''
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    convert = day[date.getDay()];
    return convert;
}

export const dateDiffInMinute = (message_date) => {
    var dt1 = new Date(message_date);
    var dt2 = new Date();

    const cal = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    if (cal === 0) {
        if (dt2.getHours() - dt1.getHours() == 0) {
            return dt2.getMinutes() - dt1.getMinutes();
        }
    }
    return 24;
}
