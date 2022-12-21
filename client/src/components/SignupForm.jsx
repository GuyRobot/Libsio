// Helper styles for demo
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import Input from './Input';

import store from '../app/store'
import { signup } from "../features/auth/authSlice";

function SignupForm() {
    return (
        <Formik
            initialValues={{ email: '', name: '', password: '' }}
            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .required("Name is required!")
                    .max(128, 'Name cannot more than 128 letters')
                    .min(3, 'Name cannot contain less than 3 letters'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Email is required!'),
                password: Yup.string()
                    .required("Password is required!")
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    store.dispatch(signup(values))
                    setSubmitting(false);
                }, 1000);
            }}
        >
            {({
                values,
                touched,
                errors,
                initialValues,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
                /* and other goodies */
            }) => {
                const hasChanged = !_.isEqual(values, initialValues);
                const hasErrors = Object.keys(errors).length > 0;
                return (
                    <form className='flex flex-col m-auto mt-8' onSubmit={handleSubmit}>
                        <label htmlFor='name' className="block text-sm font-medium text-gray-700"> Name </label>
                        <Input id="name"
                            name="name"
                            placeholder="Enter your name"
                            type="text"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                hasChanged ? errors.name ? (
                                    'text-input error'
                                ) : (
                                    'text-input success'
                                ) : (
                                    'text-input'
                                )
                            } />

                        {errors.name && <div className="text-sm mt-1 text-red-800">{errors.name}</div>}

                        <label htmlFor='email' className="block text-sm font-medium text-gray-700 mt-3"> Email </label>
                        <Input id="email"
                            name="email"
                            placeholder="Enter your email"
                            type="text"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                hasChanged ? errors.email ? (
                                    'text-input error'
                                ) : (
                                    'text-input success'
                                ) : (
                                    'text-input'
                                )
                            } />

                        {errors.email && <div className="text-sm mt-1 text-red-800">{errors.email}</div>}

                        <label htmlFor='password' className="block text-sm font-medium text-gray-700 mt-3"> Password </label>
                        <Input id="password"
                            name="password"
                            placeholder="Enter your password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                hasChanged ? errors.password ? (
                                    'text-input error'
                                ) : (
                                    'text-input success'
                                ) : (
                                    'text-input'
                                )
                            } />

                        {errors.password && <div className="text-sm mt-1 text-red-800">{errors.password}</div>}

                        <div className='flex justify-between w-full'>
                            <button onClick={handleReset}
                                disabled={!hasChanged || isSubmitting} type="button" className="bg-indigo-600 py-3 px-6 disabled:bg-indigo-900 rounded-md text-white font-black text-sm my-4">
                                Reset
                            </button>
                            <button disabled={!hasChanged || hasErrors || isSubmitting} type="submit" className="bg-indigo-600 disabled:bg-indigo-900 py-3 px-6 rounded-md text-white font-black text-sm my-4">
                                Save
                            </button>
                        </div>
                    </form>
                );
            }}
        </Formik>
    )
};

export default SignupForm;