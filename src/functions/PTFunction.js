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