import {API_BASE_URL, ACCESS_TOKEN, SETUP_TIME, IG_INSIGHTS} from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getInstagramInsight(igAccessToken) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    const hours = 24; // Reset when storage is more than 24hours
    const now = new Date().getTime();
    var setupTime = localStorage.getItem(SETUP_TIME);
    var response;
    localStorage.removeItem(SETUP_TIME);
    localStorage.removeItem(IG_INSIGHTS);
    if (setupTime == null || localStorage.getItem('igResponseObject') == null || (now - setupTime > hours * 60 * 60 * 1000)) {
        console.info("Null storage Storing the igResponseobject");
        localStorage.removeItem(SETUP_TIME);
        localStorage.removeItem(IG_INSIGHTS);
        localStorage.setItem(SETUP_TIME, now);
        response = request({
            url: API_BASE_URL + "/getInstagramInsights?accessCode=" + igAccessToken + "&isUpdateRequired=true",
            method: 'GET'
        });
        console.info(JSON.stringify(response));
        localStorage.setItem(IG_INSIGHTS, JSON.stringify(response));
    } else {
        console.info("Returning the stored value");
        console.info(JSON.parse(localStorage.getItem(IG_INSIGHTS)));
        response = JSON.parse(localStorage.getItem(IG_INSIGHTS));
    }

    return response;
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function isIgInsightsAvailable() {
    const hours = 24; // Reset when storage is more than 24hours
    const now = new Date().getTime();
    var setupTime = localStorage.getItem(SETUP_TIME);
    return !(setupTime == null || localStorage.getItem('igResponseObject') == null || (now - setupTime > hours * 60 * 60 * 1000));
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}