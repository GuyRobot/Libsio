// Helper styles for demo
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import Input from './Input';

import store from '../app/store'
import { create } from "../features/resource/resourceSlice";

import { toast } from 'react-toastify';
import { WithContext as ReactTags } from 'react-tag-input';

function ResourceForm() {

    const [tags, setTags] = React.useState([]);

    const handleDelete = (i, setFieldValue) => {
        const newTags = tags.filter((tag, index) => index !== i)
        setTags(newTags);
        setFieldValue("tags", newTags)
    };

    const handleAddition = (tag, setFieldValue) => {
        const newTags = [...tags, tag]
        setTags(newTags);
        setFieldValue("tags", newTags)
    };

    const handleDrag = (tag, currPos, newPos, setFieldValue) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);

        setFieldValue("tags", newTags)
    };

    return (
        <Formik
            initialValues={{ title: '', description: '', link: '', image: null, tags: [] }}
            validationSchema={Yup.object().shape({
                title: Yup.string()
                    .required("Name is required!")
                    .max(128, 'Name cannot more than 128 letters')
                    .min(3, 'Name cannot contain less than 3 letters'),
                description: Yup.string()
                    .required('Descripiton is required!'),
                link: Yup.string()
                    .required("Link is required!"),
                image: Yup.mixed().required('Image is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    // Tags need to be array of string
                    values.tags = values.tags.map(tag => tag["text"])
                    store.dispatch(create(values))
                    setSubmitting(false);
                    toast.success(`Succeed add new resource`)
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
                setFieldValue,
                /* and other goodies */
            }) => {
                const hasChanged = !_.isEqual(values, initialValues);
                const hasErrors = Object.keys(errors).length > 0;
                return (
                    <form className='flex flex-col m-auto mt-8' onSubmit={handleSubmit}>
                        <label htmlFor='title' className="block text-sm font-medium text-gray-700"> Title </label>
                        <Input id="title"
                            name="title"
                            placeholder="Enter title"
                            type="text"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                hasChanged ? errors.title ? (
                                    'text-input error'
                                ) : (
                                    'text-input success'
                                ) : (
                                    'text-input'
                                )
                            } />

                        {errors.title && <div className="text-sm mt-1 text-red-800">{errors.title}</div>}

                        <label htmlFor='description' className="block text-sm font-medium text-gray-700 mt-3"> Description </label>
                        <Input id="description"
                            name="description"
                            placeholder="Enter your description"
                            type="text"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                hasChanged ? errors.description ? (
                                    'text-input error'
                                ) : (
                                    'text-input success'
                                ) : (
                                    'text-input'
                                )
                            } />

                        {errors.description && <div className="text-sm mt-1 text-red-800">{errors.description}</div>}

                        <label htmlFor='link' className="block text-sm font-medium text-gray-700 mt-3"> Link </label>
                        <Input id="link"
                            name="link"
                            placeholder="Enter link"
                            type="text"
                            value={values.link}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                hasChanged ? errors.link ? (
                                    'text-input error'
                                ) : (
                                    'text-input success'
                                ) : (
                                    'text-input'
                                )
                            } />

                        {errors.link && <div className="text-sm mt-1 text-red-800">{errors.link}</div>}

                        <div className='mt-4'>
                            <label className="block text-sm font-medium text-gray-700">
                                Tags
                            </label>
                            <div className='mt-1'>
                                <ReactTags
                                    className={'mt-3'}
                                    tags={tags}
                                    handleDelete={(tag) => { handleDelete(tag, setFieldValue) }}
                                    handleAddition={(tag) => { handleAddition(tag, setFieldValue) }}
                                    handleDrag={(tag, curPos, newPos) => { handleDrag(tag, curPos, newPos, setFieldValue) }}
                                    inputFieldPosition="bottom"
                                    autocomplete
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Cover photo
                            </label>
                            <div className="
              mt-1
              flex
              justify-center
              px-6
              pt-5
              pb-6
              border-2 border-gray-300 border-dashed
              rounded-md
            ">
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                                        viewBox="0 0 48 48" aria-hidden="true">
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label htmlFor="image" className="
                                                                        relative
                                                                        cursor-pointer
                                                                        bg-white
                                                                        rounded-md
                                                                        font-medium
                                                                        text-indigo-600
                                                                        hover:text-indigo-500
                                                                        focus-within:outline-none
                                                                        focus-within:ring-2
                                                                        focus-within:ring-offset-2
                                                                        focus-within:ring-indigo-500
                  ">
                                            <span>Upload a file</span>
                                            <Input id="image"
                                                name="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={(event) => {
                                                    setFieldValue("image", event.currentTarget.files[0]);
                                                }}
                                                className={
                                                    hasChanged ? errors.link ? (
                                                        'text-input sr-only error'
                                                    ) : (
                                                        'text-input sr-only success'
                                                    ) : (
                                                        'text-input sr-only'
                                                    )
                                                } />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>

                            </div>
                            {errors.image && <div className="text-sm mt-1 text-red-800">{errors.image}</div>}
                        </div>

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

export default ResourceForm;