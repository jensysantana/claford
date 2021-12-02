import { AppRegExp } from "~/helpers/helper-classes";
/*
<input type="password" name="password1" placeholder="10 or more alphanumeric and special characters" autocomplete="new-password" data-validator="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[~!@#$%^&amp;*_+\-=`|\\(){}\[\]:;&quot;\'<>,.?\/ “]){1,})(?!.*\s).{10,}$" data-error-message="" minlength="8" class="form-control signup-input" required="" id="id_password1">

*/
export class FieldValidations {

    constructor() {
        this.regexp = AppRegExp.Regexp();
    }

    async validationGenerator(inputs, { t }) {
        // console.log('lang: ', t('auth:valid.fname.1'));
        // validateTrigger={["onChange", "onBlur", "onSubmit"]}
        const fields = {

            fname: [
                {
                    required: true,
                    message: t('auth:valid.fname.1'),
                    // validateTrigger: ['onSubmit', 'onBlur']
                },
                {
                    min: 3,
                    message: t('auth:valid.fname.2')
                },
                {
                    max: 30,
                    message: t('auth:valid.fname.2')
                },
                {
                    pattern: this.regexp.nameAndLastName,
                    message: t('auth:valid.fname.3')
                },
                // {
                //     whitespace: true,
                //     message: 'Has with spacess'
                // }
                // {
                //     validator: (_, value) => {
                //         console.log('value: ', value);
                //         console.log('_: ', _);
                //         return Promise.resolve();
                //     }
                // }

            ],
            lname: [
                {
                    required: true,
                    message: t('auth:valid.lname.1'),
                },
                {
                    min: 3,
                    message: t('auth:valid.lname.2'),

                },
                {
                    max: 30,
                    message: t('auth:valid.lname.2'),

                },
                {
                    pattern: this.regexp.nameAndLastName,
                    message: t('auth:valid.lname.3'),
                }
            ],
            email: [
                {
                    required: true,
                    message: t('auth:valid.email.1')
                    // validateTrigger: ['onBlur', 'onSubmit']
                },
                {
                    min: 6,
                    message: t('auth:valid.email.1'),
                    // message: new Error('min Hello email....'),
                    // validateTrigger: ['onBlur', 'onSubmit']
                },
                {
                    max: 64,
                    message: t('auth:valid.email.2')
                    // validateTrigger: ['onBlur', 'onSubmit']
                },
                {
                    validator: (_, value) => {
                        if (!value) {
                            return Promise.reject(new Error(t('auth:valid.email.1')))
                        }

                        if (!value.includes('@')) {
                            return Promise.reject(new Error(t('auth:valid.email.1')))
                        }
                        const regext = new RegExp(this.regexp.email);
                        if (!regext.test(value)) {
                            return Promise.reject(new Error(t('auth:valid.email.3')))
                        }
                        return Promise.resolve();
                        // return Promise.reject(new Error('99999999'));
                        // return value.includes('@') ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'));
                    },
                    // validateTrigger: ['onBlur', 'onSubmit']
                },
                // {
                //     pattern: this.regexp.email,
                //     message: new Error('email Introduzca un patron valido')
                // },
            ],
            password: [
                {
                    required: true,
                    message: t('auth:valid.password.1')
                    // validateTrigger: ['onChange', 'onBlur']
                },
                {
                    min: 8,
                    message: t('auth:valid.password.2')
                    // validateTrigger: ['onChange', 'onBlur']
                },
                {
                    max: 45,
                    message: t('auth:valid.password.2')
                    // validateTrigger: ['onChange', 'onBlur']
                },
                {
                    pattern: this.regexp.password,
                    message: t('auth:valid.password.3'),
                    // validateTrigger: ['onChange', 'onBlur']
                }
            ],
            cpassword: [
                {
                    required: true,
                    message: t('auth:valid.cpassword.1')
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        console.log('_: ', _);
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error(t('auth:valid.cpassword.2')));
                    }
                }),
            ],
            securityCode: [
                {
                    required: true,
                    message: t('auth:valid.phoneCode.1')
                },
                {
                    max: 6,
                    message: t('auth:valid.phoneCode.2')
                },
                {
                    min: 6,
                    message: t('auth:valid.phoneCode.2')
                },
                {
                    pattern: this.regexp.number,
                    message: t('auth:valid.phoneCode.2')
                }
            ],
        }

        let newObj = {};
        for (const itx of inputs) {
            // loop the inputs required array
            for (const key in fields) {
                // loop the fields and get the requested fields from inputs
                if (Object.hasOwnProperty.call(fields, key)) {
                    let element = fields[key];
                    if (itx.path === key) {
                        if (itx.replacer && itx.replacer.length > 0) {
                            for (const iter of itx.replacer) {
                                // loop into replacer array
                                // this can change default content of validations
                                for (const keyR in iter) {
                                    // loop into keys of replacer object
                                    if (Object.hasOwnProperty.call(iter, keyR)) {
                                        const elemR = iter[keyR];
                                        element = element.map(el => {
                                            if (Object.hasOwnProperty.call(el, keyR)) {
                                                return {
                                                    ...el,
                                                    ...elemR,
                                                }
                                            }
                                            return el;
                                        })
                                    }
                                }
                                Object.assign(newObj, { [key]: element });
                            }

                        } else {
                            Object.assign(newObj, { [key]: element });
                        }
                    }
                }
            }


        }
        // console.log('newObj: ', newObj);
        return newObj;
    }
}

/*
    import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Form, Input, Button } from "antd";
import Field from "rc-field-form/es/Field";

console.warn(Field);

const Demo = () => {
  return (
    <Form>
      <Form.Item
        label="Username"
        name="username"
        validateTrigger={[ "onBlur", "onSubmit"]}
        rules={[
          {
            required: true,
            message: "Required validate onChange"
          },
          {
            async validator(rule, value) {
              if ((value || "").length < 10) {
                return Promise.reject("Length validate onBlur");
              }
            },
            validateTrigger: "onBlur"
          },
          {
            async validator() {
              return Promise.reject("Failed onSubmit");
            },
            validateTrigger: "onSubmit"
          }
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Button htmlType="submit">Submit</Button>
    </Form>
  );
};



*/