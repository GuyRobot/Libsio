import React from 'react'
import InputUnstyled from '@mui/base/InputUnstyled';

const Input = React.forwardRef(function Input(
    props,
    ref,
) {
    return (<InputUnstyled
        {...props}
        ref={ref}
        slotProps={{
            input: {className: 'mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md'}
        }}
    />);
});

export default Input    