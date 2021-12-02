export default class GlobalHelper {

    async AsyncLocalStorageSetup(key, type = null, data = null, setEncode = {}) {

        switch (type) {
            case 'set':
                // localStorage.setItem('rememberme', JSON.stringify(btoa(data)));
                if (setEncode.setEncode !== undefined && setEncode.setEncode) {
                    this.localStorage(key, 'set', this.encodeData(data));
                } else {
                    localStorage.setItem(key, data);
                }
                return true;
            case 'get':
                // return this.encodeData(JSON.parse(localStorage.getItem(key)), 'decode');
                if (!!localStorage.getItem(key)) {
                    if (setEncode.decode !== undefined && setEncode.decode) {
                        return this.encodeData(JSON.parse(localStorage.getItem(key)), 'decode');
                    } else {
                        return localStorage.getItem(key);

                    }
                }
                return null;
            // return atob(JSON.parse(localStorage.getItem(key)));
            case 'remove':
                return localStorage.removeItem(key);
            default:
                if (!!localStorage.getItem(key)) {
                    return true;
                }
                return false;
        }
    }

    localStorage(key, type, data = null) {
        if (type === 'set') {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        }

        if (type === 'get') {
            // atob();
            // localStorage.setItem(key, JSON.stringify(data));
            return JSON.parse(localStorage.getItem(key));
        }
    }

    encodeData(data, type = null) {
        //=====================================
        // private function
        //=====================================
        switch (type) {
            case 'decode':
                return atob(data);
            default:
                //encode
                return btoa(data);
        }
    }

    Rgex() {
        return {
            // name: /^[a-zA-Z\s]+$/,
            // eslint-disable-next-line
            name_dashes: /^[a-zA-Z\-]+$/,
            // eslint-disable-next-line
            description: /^[\w\s\.]+$/,
            // eslint-disable-next-line
            email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            // eslint-disable-next-line
            emailOrPhone: /^(?:\d{10}|[\w\.\-]+@[\w\.\-]+\.\w{2,3})$/,
            // emailOrPhone: /^(?:\d{10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/,
            // eslint-disable-next-line
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
            phone: /^[0-9]+$/,
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

    //==============================
    // Start diver array
    //==============================.
    async ColumnGroup(arr, large, sort) {
        let arrayRort = arr;
        if (sort) {
            arrayRort = await this.NoRepeatObj(arrayRort);
            arrayRort = await this.sortArray(arrayRort);
        }

        let newArr = [];
        for (let i = 0; i < arrayRort.length; i += large) {
            newArr.push(arrayRort.slice(i, i + large));
            // const element = arr[i];
            // console.log('---------element---------');
            // console.log(arr.slice(i, i+large));
            // console.log(i);
            // console.log("ColumnGroup -> i+large", i+large)
            // console.log('---------element---------');
        }
        // console.log("ColumnGroup -> newArr", newArr)
        return newArr;
    }

    async sortArray(arr) {
        return arr.sort((b, a) => b.qty - a.qty);
    }

    async NoRepeatObj(array) {

        let newArray = [];
        array.forEach(element => {
            // console.log('---------element---------');
            // console.log(element);
            // console.log('---------element---------');
            if (!newArray.find(pr => pr.product._id === element.product._id)) {
                newArray.push(element);
            }
        });

        return newArray;
    }


}

export const SearchHelper = {
    fn: (term, sparator) => {
        let searched = term.toLowerCase();
        let match = /[a-z\dñáéíóú ]*$/;
        if (match.test(searched)) {
            // searchTest = searched.replace(/[ñáéíóú ]/g, '+');
            var searchTest = searched.replace(/[\s]/g, sparator);
            searchTest = searchTest.replace(/[ñ]/g, 'n');
            searchTest = searchTest.replace(/[á]/g, 'a');
            searchTest = searchTest.replace(/[é]/g, 'e');
            searchTest = searchTest.replace(/[í]/g, 'i');
            searchTest = searchTest.replace(/[ó]/g, 'o');
            searchTest = searchTest.replace(/[ú]/g, 'u');
            return searchTest;
        }
    }
}

export const SlickSettings = {
    // dots: true,
    // lazyLoad: true,
    infinite: true,
    focusOnSelect: false,
    speed: 2000,
    // autoplaySpeed: 9000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    // fade: true,
    autoplay: true,
    duration: 10000,
    // dotsClass: "slick-dots slick-thumb",
    // arrows: true,
    // pauseOnHover: true,
    // centerMode: true,
    // className: "center",
    // centerPadding: "60px",
    // responsive: [
    //     {
    //       breakpoint: 11000,
    //       settings: {
    //         slidesToShow: 4
    //       }
    //     },
    //     {
    //       breakpoint: 1100,
    //       settings: {
    //         slidesToShow: 3
    //       }
    //     },
    //     {
    //       breakpoint: 790,
    //       settings: {
    //         slidesToShow: 2,
    //         speed: 500
    //       }
    //     },
    //     {
    //       breakpoint: 480,
    //       settings: {
    //         slidesToShow: 1,
    //         speed: 100,
    //         infinite: false
    //       }
    //     }
    //   ],
    // appendDots: dots => (
    //     <div className="aaa"
    //       style={{
    //         // backgroundColor: "#ddd",
    //         borderRadius: "10px",
    //       }}
    //     >
    //       <ul className="ul-imagex" 
    //     //   style={{ margin: "10px 0 0 0" }}
    //       > {dots} </ul>
    //     </div>
    // ),
    // customPaging: function(i) {
    //     return (
    //         <div className="image-slider-container"
    //             style={{
    //             // backgroundColor: "#ddd",
    //             // borderRadius: "10px",
    //             // border: 'solid 2px solid red'
    //             // padding: "10px",
    //             // width:"100%",
    //             // height:"185px" 

    //             }}
    //       >
    //         <img src={`${publicAssets}img/products/consumer-electric/electronic/${i + 1}.jpg`} className="slider-img-roterx" />
    //         {/*  */}
    //       </div>
    //     );
    // }
};