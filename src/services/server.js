import axios from "./axios";
import { message } from 'antd';

const headers = {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json"
}

// 调取接口
export async function getRequestData(code, requestData, header) {
    return getToApi(code, requestData, header);
}

export async function postRequestData(code, requestData, header) {
    return postToApi(code, requestData);
}

export async function postDataRequest(code, requestData, header) {
    return postToApi(code, requestData);
}

export async function putRequestData(code, requestData) {
    return putToApi(code, requestData);
}

export async function patchRequestData(code, requestData) {
    return patchToApi(code, requestData);
}

export async function deleteRequestData(code, requestData) {
    return deleteToApi(code, requestData);
}

export async function postFormData(code, requestData) {
    return postFormToApi(code, requestData);
}

export async function putFormData(code, requestData) {
    return putFormToApi(code, requestData);
}

const promiseFn = (resolve, res) => {
    if (res){
        if (res.data.code === 401) {
            message.error("token过期,请重新登录!");
            setTimeout(() => { window.location.href = '/' }, 2000)
        }
        if (res.data.code != 200 && res.data.code != 0) {
            if (res.data.msg) {
                message.error(res.data.msg);
            }
            resolve(res.data || res);
        } else {
            resolve(res.data);
        }
    }
}

const getToApi = (method, requestData, header) => {
    var param = new URLSearchParams();
    for (const key in requestData) {
        (requestData[key] || requestData[key] == false) && param.append(key, requestData[key])
    }
    return new Promise((resolve, reject) => {
        axios.get(`${method}`, { params: param ? param : {} }, header ? header : {}).then(res => {
            promiseFn(resolve, res)
        })
    });
};

const putFormToApi = (method, requestData) => {
    var formData = new FormData()
    for (const key in requestData) {
        (requestData[key] || requestData[key] == false) && formData.append(key, requestData[key])
    }
    return new Promise((resolve, reject) => {
        axios.put(`${method}`, formData, { headers }).then(res => {
            promiseFn(resolve, res)
        })
    });
};

const postFormToApi = (method, requestData) => {
    var formData = new FormData()
    for (const key in requestData) {
        (requestData[key] || requestData[key] == false) && formData.append(key, requestData[key])
    }
    return new Promise((resolve, reject) => {
        axios.post(`${method}`, formData, { headers }).then(res => {
            promiseFn(resolve, res)
        })
    });
};

const postToApi = (method, requestData, header) => {
    return new Promise((resolve, reject) => {
        axios.post(`${method}`, requestData, header ? header : {}).then(res => {
            promiseFn(resolve, res)
        })
    });
};

const postDataToApi = (method, requestData, header) => {
    var param = new URLSearchParams();
    for (const key in requestData) {
        (requestData[key] || requestData[key] == false) && param.append(key, requestData[key])
    }
    return new Promise((resolve, reject) => {
        axios.post(`${method}`, param, header ? header : {}).then(res => {
            promiseFn(resolve, res)
        })
    });
};

const deleteToApi = (method, requestData) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${method}`, requestData).then(res => {
            promiseFn(resolve, res)
        })
    });
};

const putToApi = (method, requestData) => {
    return new Promise((resolve, reject) => {
        axios.put(`${method}`, requestData).then(res => {
            promiseFn(resolve, res)
        })
    });
};

const patchToApi = (method, requestData) => {
    return new Promise((resolve, reject) => {
        axios.patch(`${method}`, requestData).then(res => {
            promiseFn(resolve, res)
        })
    });
};