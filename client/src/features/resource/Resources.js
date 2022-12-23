import React, { useEffect, useState } from 'react';

import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";

import { images } from '../../constants';
import { fetchAll } from "./resourceSlice";

import store from '../../app/store'
import { useSelector } from "react-redux";

import { imgUrlFor } from "../../utils/utils";

const Resources = () => {

    const resources = useSelector(state => state.resource.resources)

    useEffect(() => {
        store.dispatch(fetchAll())
    }, [])

    const works = [
        {
            title: "Modern UI/UX website",
            description: "A modern UI/UX Portfolio Website",
            projectLink: "https://nestify.com",
            codeLink: "https://github.com",
            imgUrl: images.about01,
            tags: [
                "UI/UX",
                "All"
            ]
        },
        {
            title: "Ecommericial Project",
            description: "A modern UI/UX ECommericial Website",
            projectLink: "https://nestify.com",
            codeLink: "https://github.com",
            imgUrl: images.about02,
            tags: [
                "Web App",
                "All"
            ]
        },
        {
            title: "Cool Mobile Meditation App",
            description: "A Mobile Meditation app with Flutter",
            projectLink: "https://nestify.com",
            codeLink: "https://github.com",
            imgUrl: images.about03,
            tags: [
                "Mobile App",
                "All"
            ]
        },
        {
            title: "Modern Blog website",
            description: "A modern Blog website with React JS and Node JS",
            projectLink: "https://nestify.com",
            codeLink: "https://github.com",
            imgUrl: images.about04,
            tags: [
                "Web App",
                "React JS",
                "All"
            ]
        }
    ]

    const [activeFilter, setActiveFilter] = useState("All");
    const [animatedCard, setAnimatedCard] = useState({ y: 0, opacity: 1 });
    const [filteredWorks, setfilteredWorks] = useState(works);


    function handleWorkFilter(item) {
        setActiveFilter(item)
        setAnimatedCard([{ y: 100, opacity: 0 }]);

        setTimeout(() => {
            setAnimatedCard([{ y: 0, opacity: 1 }]);

            if (item === "All") {
                setfilteredWorks(works);
            } else {
                setfilteredWorks(works.filter((work) => work.tags.includes(item)));
            }
        }, 500)
    }

    return (
        <div className='bg-gray-200 py-16'>
            <h2 className="text-4xl font-extrabold text-center text-black capitalize">Creative <span className='text-blue-700'>Portfolio</span> Section</h2>

            <div className='flex justify-center items-center flex-wrap mt-16 mb-8'>
                {['UI/UX', 'Web App', "Mobile App", "React JS", "All"].map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleWorkFilter(item)}
                        className={`py-2 px-4 rounded-lg bg-white text-black font-extrabold cursor-pointer transition-all duration-300 ease-in m-2 hover:bg-blue-700 hover:text-white flex justify-center items-center text-sm text-left leading-6 ${activeFilter === item ? 'bg-blue-700 text-white' : ''}`}
                    >
                        {item}
                    </div>
                ))}

            </div>

            <motion.div
                animate={animatedCard}
                transition={{ duration: 0.5, delayChildren: 0.5 }}
                className="flex flex-wrap justify-center items-center">

                {resources && resources.map((resource, index) => (
                    <motion.div
                        whileInView={{ opacity: [0, 1], y: [100, 0] }}
                        transition={{ duration: 0.25 }}
                        className='w-72 flex-col flex justify-center items-center m-8 p-4 rounded-lg bg-white text-black cursor-pointer transition-all duration-300 ease-in hover:shadow-md 3xl:w-96 lg:p-5 3xl:rounded-xl' key={`${resource.title}-${index}`}>
                        <div className='flex items-center justify-center w-full h-56 3xl:h-80 relative'>
                            <img className='w-full h-full rounded-lg object-cover' src={imgUrlFor(resource.image)} alt={resource.title} />

                            <motion.div
                                whileHover={{ opacity: [0, 1] }}
                                transition={{ duration: 0.25, ease: "easeInOut", staggerChildren: 0.5 }}
                                className="absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-50 rounded-lg opacity-0 transition-all duration-300 ease-in flex justify-center items-center">
                                <a href={resource.link} target="_blank" rel='noreferrer' >
                                    <motion.div
                                        whileInView={{ scale: [0, 1] }}
                                        whileHover={{ scale: [1, 0.9] }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className="flex justify-center items-center w-12 h-12 rounded-full bg-black bg-opacity-50 text-white m-4 font-dm-sans font-extrabold cursor-pointer transition-all duration-300 ease-linear">
                                        <AiFillEye className='w-1/2 h-1/2 text-white' />
                                    </motion.div>
                                </a>

                                <a href={resource.codeLink} target="_blank" rel='noreferrer' >
                                    <motion.div
                                        whileInView={{ scale: [0, 1] }}
                                        whileHover={{ scale: [1, 0.9] }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className="flex justify-center items-center w-12 h-12 rounded-full bg-black bg-opacity-50 text-white m-4 font-dm-sans font-extrabold cursor-pointer transition-all duration-300 ease-linear">
                                        <AiFillGithub className='w-1/2 h-1/2 text-white' />
                                    </motion.div>
                                </a>

                            </motion.div>
                        </div>

                        <div className='p-2 w-full relative flex-col flex justify-center items-center'>
                            <h4 className='mt-4 leading-6 3xl:mt-12 text-base font-extrabold text-black text-left'>{resource.title}</h4>
                            <p className='text-sm text-left text-gray-600 leading-6 3xl:text-3xl mt-2'>{resource.description}</p>

                            <div className='absolute py-2 px-4 rounded-xl bg-white -top-8 flex justify-center items-center'>
                                <p className='text-sm text-left text-gray-500 leading-6 3xl:text-3xl'>{resource.title}</p>
                            </div>
                        </div>

                    </motion.div>
                ))}

            </motion.div>
        </div>
    );
}

export default Resources;
