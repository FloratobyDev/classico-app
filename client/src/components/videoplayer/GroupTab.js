import React, { useState } from 'react'
import Awards from './Awards'
import Comments from './Comments'
import MoreInfo from './MoreInfo'


const GroupTab = ({ movieData }) => {

    const [tab, setTab] = useState(0)
    const data = ['Comments', 'More Info']

    const renderedTabs = data.map((currenttab, idx) => {

        return <button onClick={() => {
            setTab(idx)
        }} style={tab === idx ? { borderBottom: "4px solid black", borderTop: "0px solid black" } : {}} className='text-xs md:lg:text-lg tracking-widest py-2 px-4 uppercase' key={currenttab}>{currenttab}</button>
    })

    let info

    switch (tab) {
        case 0:
            info = <Comments comments={movieData?.comments} />
            break;
        default:
            break;
    }

    return (
        <div className='mx-auto m-10'>
            <div className='flex flex-row gap-x-4 justify-center border-b border-b-solid border-b-black'>
                {renderedTabs}
            </div>
            <div className='w-full'>
                {info}
            </div>
        </div>
    )
}

export default GroupTab