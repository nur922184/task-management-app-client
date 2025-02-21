import React from 'react';
import { Bars } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen max-w-10 mx-auto">
          <Bars
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
};

export default Loading;