import axios from 'axios'
// import config from '../api/mjConfig'
// import {AppStorage} from '../native/index'
// import uuid from '../utils/uuid'

const baseURL = process.config.BASE_URL
// const appName = config.appType
// let appVersion = null
// let deviceId = null
// let phoneOs = null
// let accountNumber = null
// let userId = null
// let token = null

class Axios {
    constructor (props) {
        this.instance = axios.create({
            baseURL,
            timeout: 8000,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                // appName,
                // 'x-app-code': appName,
                ...props
            }
        })
        // this.deviceId = props.deviceId
        // this.accountNumber = props.accountNumber
        // this.userId = props.userId
        // this.token = props.token
    }

    resetLoginInfo (data) {
        // this.instance.defaults.headers = {...this.instance.defaults.headers, ...data}
        // this.accountNumber = data.accountNumber
        // this.userId = data.userId
        // this.token = data.token
    }

    updateProps (props) {
        // this.instance.defaults.headers = {...this.instance.defaults.headers, ...props}
        // this.deviceId = props.deviceId
        // this.accountNumber = props.accountNumber
        // this.userId = props.userId
        // this.token = props.token
    }

    post (path, params, {success, error}) {
        // this.instance.post(path, {appName, deviceId: this.deviceId, accountNumber: this.accountNumber, userId: this.userId, token: this.token, ...params}, {headers: {'x-trace-id': uuid()}})
        this.instance.post(path,{...params},{headers:{}})
            .then(function (response) {
                if (response && response.data && Number(response.data.status) === 0) {
                    success && success(response.data.data)
                } else {
                    error && error(response.data.msg)
                }
            })
            .catch(function (e) {
                error && error(e)
            })
    }

    get (path, {success, error}) {
        this.instance.get(path)
            .then(function (response) {
                if (response && response.data && (Number(response.data.status) === 0 || response.data.code === 200)) {
                    success && success(response.data.data)
                } else {
                    error && error(response.data.msg)
                }
            })
            .catch(function (e) {
                error && error(e)
            })
    }
    //这里只是用来写测试掉接口用的
    testPost (path,params, {success, error}) {
        success && success()
    }

}
let axiosIns = new Axios({})
export default axiosIns
