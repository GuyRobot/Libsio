// Helper styles for demo
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import Input from './Input';

export const EnhancedForm = () => (
    <Formik
        initialValues={{ email: '' }}
        validationSchema={Yup.object().shape({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required!'),
        })}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
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
                    <label htmlFor='email' class="block text-sm font-medium text-gray-700"> Email </label>
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

                    <div className='flex justify-between w-full'>
                        <button onClick={handleReset}
                            disabled={!hasChanged || isSubmitting} type="button" class="bg-indigo-600 py-3 px-6 disabled:bg-indigo-900 rounded-md text-white font-black text-sm my-4">
                            Reset
                        </button>
                        <button disabled={!hasChanged || hasErrors || isSubmitting} type="submit" class="bg-indigo-600 disabled:bg-indigo-900 py-3 px-6 rounded-md text-white font-black text-sm my-4">
                            Save
                        </button>
                    </div>
                </form>
            );
        }}
    </Formik>
);

// Abstracted version...
export const EggheadFormik = ({ render, ...props }) => (
    <Formik
        {...props}>
        {
            ({ p }) => {
                return render({
                    ...p,
                    hasErrors: Object.keys(p.errors).length > 0,
                    hasChanged: !_.isEqual(p.values, p.initialValues),
                });
            }
        }
    </Formik>
);