import DOMPurify from 'isomorphic-dompurify';

export class LocalStorageOp {
    static setStorage(data) {
        for (const it of data) {
            localStorage.setItem(it.key, it.value);
        }
    }
    static getStorage(key) {
        return localStorage.getItem(key) || null;
    }
    static deleteStorage(data) {
        return localStorage.removeItem(data) || null;
    }
}

export class UrlOperations {
    static getParam(param, winLocation = null) {
        const urlParams = new URLSearchParams(winLocation || window.location.search);
        return urlParams.has(param) ? urlParams.get(param) : null;
    }
    static getParamxx(param, winLocation) {
        return new URLSearchParams(winLocation).get(param);
    }
    static redirectURL(url, replace = false) {
        if (!replace) {
            document.location.href = url;
        }
        if (replace) {
            document.location.replace(url);
        }
    }
}

//AUTHENTICATIONS
export class DataFormater { //change to 
    async capitalizeWordsAsync({ textData = '', words = false }) {
        return this.capitalizeWordsSync({ textData, words });
    }
    static capitalizeWordsSync({ textData = '', words = false }) {
        if (words) {
            // capitalize words letter of each word on the string
            return textData.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
        }
        // capitalize words letter of string
        return textData.charAt(0).toUpperCase() + textData.slice(1);
    }

    static emailFormaterRecovery(input, param) {
        let userName = '';
        if (param) {
            const indexAt = input.lastIndexOf(param);
            userName = input.slice(0, indexAt);
            const userEmailHost = input.slice(indexAt);
            userName = `${userName.charAt(0)}***${userName.charAt(userName.length - 1)}${userEmailHost}`;
        } else {
            userName = input;
            return `${userName.charAt(0)}***${userName.charAt(userName.length - 1)}`;
        }
        return userName;
    }

    static async validateFormErrors(callback) {
        try {
            // await callback();
            return { isValidForm: true, errFields: await callback() };
        } catch (err) {
            let localErrors = [];
            for (const field of err.inner) {
                if (localErrors.some((f) => f.path === field.path) === false) {
                    localErrors = [...localErrors, field];
                }
            }
            // return localErrors;
            return { isValidForm: false, errFields: localErrors };
        }
    }

    static getSelectedDocObj(obj, myKeys, replacer) {
        let newObj = {};

        if (!replacer) {
            newObj = {
                ...obj
            };
        }

        for (const it of myKeys) {

            for (const key in obj) {

                if (Object.hasOwnProperty.call(obj, key)) {
                    const element = obj[key];
                    if (key === it.keyx) {

                        if (it.select && it['select'].length > 0) {

                            for (const iter of it.select) {

                                if (Object.hasOwnProperty.call(element, iter)) {
                                    if (replacer) {
                                        Object.assign(newObj, {
                                            [iter]: element[iter]
                                        })
                                    } else {
                                        newObj[iter] = element[iter];
                                    }
                                }
                                // console.log('---------Object.hasOwnProperty.call(element, iter)---------');
                                // console.log(Object.hasOwnProperty.call(element, iter));
                                // console.log('---------Object.hasOwnProperty.call(element, iter)---------');
                            }
                        } else {

                            if (replacer) {
                                Object.assign(newObj, { [key]: element });
                            } else {
                                newObj[key] = element;
                            }
                        }
                    }
                }

            }

        }
        return newObj;
    }

    async stringParamsReplacer(data) {
        return this.stringParamsReplacerSync(data);
    }

    static stringParamsReplacerSync({ msg, path, value }) {
        let realMessage = msg;
        if (path && realMessage.includes('{PATH}')) {
            realMessage = realMessage.replace(/{PATH}/g, path)
        }
        if (value && realMessage.includes('{VALUE}')) {
            realMessage = realMessage.replace(/{VALUE}/g, value)
        }
        return realMessage;
    }
    async encodeToBase64(item) {
        const buf = Buffer.from(item).toString('base64');
        // console.log('item: ', item);
        // console.log('buf: ', buf);
        return buf;
    }

    async decodeBase64(item) {
        // const buff = Buffer.from(item, 'base64').toString('utf-8');
        // return buff;
        return DataFormater.decodeBase64Sync(item);
    }
    static decodeBase64Sync(item) {
        const buff = Buffer.from(item, 'base64').toString('utf-8');
        return buff;
    }

    async encodeURIUnEscapeCharacters({ data, useComponent }) {
        //escape charater like latin or emojis etc in base64
        if (useComponent) {
            return unescape(encodeURIComponent(data));
        }
        return unescape(encodeURI(data));
    }
    async decodeURIEscapeCharacters({ data, useComponent }) {
        if (useComponent) {
            return decodeURIComponent(escape(data))
        }
        return decodeURI(unescape(data));
    }

    static transFormValidationErrorMessage(obj) {
        let newObj = [];
        for (const it of obj) {
            newObj.push({
                name: this.SanitizerData(it.path),
                errors: [this.SanitizerData(it.message)],
            });
        }
        return newObj;
    }

    //not used
    static getTokenPayload(token) {
        if (!token) return null;
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (error) {
            console.log('error: ', error);
            return null;
        }
    }

    // USED METHODS
    async getObjDynamicPath(obj, path) {
        if (!path) return obj;
        const props = path.split('.');
        return this.getObjDynamicPath(obj[props.shift()], props.join('.'));
    }
    static SanitizerData(text) {
        const cleanText = DOMPurify.sanitize(text);
        return cleanText
    }

    async langProccessAsync(langs, getLangs, getArray = false) {
        return this.langProccess(langs, getLangs, getArray);
    }

    langProccess(langs, getLangs, getArray = false) {
        let newLangsArray = [], newObj = {};
        for (const iter of getLangs) {
            const resp = langs.find(lg => lg.code === iter);

            if (getArray) {
                newLangsArray.push(resp);
            } else {
                Object.assign(newObj, resp);
                break;
            }
        }
        if (getArray) {
            return newLangsArray;
        } else {
            return newObj;
        }
    }
}

export class AppRegExp {

    static Regexp() {
        //test and regular exp
        // https://regexone.com/lesson/optional_characters
        //RegexOne
        // Learn Regular Expressions with simple, interactive exercises
        return {
            nameAndLastName: /^[a-zA-Z\-\.\s.0-9]+$/,
            // nameAndLasName: /^[a-zA-Z\s]{3,}([a-zA-Z])?$/,
            // nameAndLasName: /^([a-zA-Z]{3,}\s([a-zA-Z]{1,}')?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/,
            // eslint-disable-next-line
            name_dashes: /^[a-zA-Z\-\s]+$/,
            // eslint-disable-next-line
            description: /^[\w\s\.]+$/,
            // eslint-disable-next-line
            email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            // eslint-disable-next-line
            emailOrPhone: /^(?:\d{10}|[\w\.\-]+@[\w\.\-]+\.\w{2,3})$/,
            // emailOrPhone: /^(?:\d{10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/,
            // eslint-disable-next-line
            //        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!#$%\-_=+<>])([a-zA-Z0-9!#$%\-_=+<>]+)$/
            password: /^(?=.*[a-z\_\.\-])(?=.*[A-Z\_\.\-])(?=.*[0-9])[a-zA-Z0-9\_\.\-]+$/,
            // eslint-disable-next-line
            alpha: '^[a-zA-Z]+$',
            // eslint-disable-next-line
            alphaNum: '^[a-zA-Z\d]+$',
            // eslint-disable-next-line
            alphaSpace: /^[a-zA-Z\s]+$/,
            // eslint-disable-next-line
            alphaNumSpace: /^[a-zA-Z\d\s]+$/,
            // eslint-disable-next-line
            gender: '^[F|M]+$',
            // eslint-disable-next-line
            phoneSpecialChars: '^[0-9\-\(\)]+$',
            // eslint-disable-next-line
            phoneSpecialCharsFull: /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/,
            // phoneNoSpecialChars: '^[0-9]+$',
            // eslint-disable-next-line
            phone: /^[0-9\-\+\s]+$/,
            // eslint-disable-next-line
            dateNoFormated: '/^[a-zA-Z\d\(\)\:\-]+$/', //Fri Jan 17 2020 22:12:27 GMT-0500 (Eastern Standard Time)
            // eslint-disable-next-line
            number: /^[\d]+$/,
            // eslint-disable-next-line
            isMongoId: /^[a-f\d]{24}$/i,
            // eslint-disable-next-line
            tax: /^([\d]+\%)+$/,
            // eslint-disable-next-line
            address: /^[a-zA-Z\d\s\,\.\-]+$/,
            // eslint-disable-next-line
            zipcode: /^([\d]{5})+$/,
            // eslint-disable-next-line
            boolExp: /[true|false]/
        }
    }
}
export class CookiesHelper {

    static getCookie(name, cookie) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    async getCookieAsync(name, cookie) {
        if (!cookie) return null;
        var nameEQ = name + "=";
        var ca = cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    async setCookie(name, value, time) {
        // console.log('location: ', location);
        var expires = "";
        if (time) {
            var date = new Date();
            date.setTime(date.getTime() + (time * 15 * 1000));
            // date.setTime(date.getTime() + (time * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        // document.cookie = name + "=" + (value || "") + expires + "; path=/;";

        document.cookie = name + "=" + (value || "") + expires + "; path=/;sameSite=strict;secure=true;";
    }


}
// + "domain=" + location.host + ";"

// setCookie("user_email","bobthegreat@gmail.com",30); //set "user_email" cookie, expires in 30 days
// var userEmail=getCookie("user_email");//"bobthegreat@gmail.com"

// export class RedirectToRoute {

//     static redirectURL(url) {
//         document.location.href = url;
//     }
// }