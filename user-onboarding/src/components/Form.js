import React, {useState, useEffect} from 'react';

// Added dependencies
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const FormMaker = ({values, errors, touched, status}) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("Status has changed", status);
        status && setUsers(users => [...users, status])
    }, [status]);

    return (
        <div>

            <Form>

                {/* Name Input */}
                <div>
                <label htmlFor="name">Name:</label>

                <Field id="name" type="text" name="name"/>

                {touched.name && errors.name && (
                    <p>{errors.name}</p>
                )}
                </div>
                
                {/* Email Input */}
                <div>
                <label htmlFor="email">Email:</label>

                <Field id="email" type="text" name="email"/>

                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}
                </div>

                {/* Password Input */}
                <div>
                <label htmlFor='password'>Password:</label>

                <Field id='password' type='text' name='password'/>

                {touched.password && errors.password && (<p>{errors.password}</p>)}
                </div>

                {/* ToS Checkbox */}
                <div>
                <label htmlFor='terms'>
                 <strong>Terms of Service</strong>

                 <Field id='terms' type='checkbox' name='terms' checked={values.terms}/>

                 {touched.terms && errors.terms && (<p>{errors.terms}</p>)}
                </label>
                </div>
                
                {/* Submit Button */}
                <div>
                    <button type='submit'>Submit</button>
                </div>

            </Form>

            {/* Users, Output from above */}
            <div>
                <h3>Users</h3>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name = {user.name}</li>
                    <li>Email = {user.email}</li>
                    <li>Role = {user.role}</li>
                </ul>
            ))}
            </div>

        </div>
    )
}

const FormikForm = withFormik({

    mapPropsToValues({name, email, password, terms}) {

        return {
            name: "",
            email: "",
            password: "",
            terms: terms || false
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        terms: Yup.boolean().oneOf([true], "Must accept Terms of Service")
        // All forms have to be filled in to be able to be submitted
    }),

    handleSubmit(values, {setStatus, resetForm}) {

        axios
        .post("https://reqres.in/api/users", values)

        .then(response => {
            setStatus(response.data);
            resetForm()
        })

        .catch(error => console.log("Error: ", error.response));
    }
})(FormMaker)

export default FormikForm;