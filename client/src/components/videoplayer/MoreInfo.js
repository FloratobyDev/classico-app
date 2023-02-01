import React from 'react'

export const DataArray = ({ data, title }) => {

    let dataValue = ""
    if (data instanceof Array) dataValue = data.join(', ')
    else dataValue = data

    return <div className='p-5'>
        <p className='font-bold text-xl tracking-wider pb-3'>{title}</p>
        <p className=' indent-2 ' key={title}>{dataValue}</p>
    </div>
}

const MoreInfo = ({ movieInfo }) => {

    let releasedDate = null

    if (movieInfo?.released) {
        releasedDate = new Date(movieInfo.released)
    }

    return (
        <div className='mx-auto w-8/12 p-5 text-center flex flex-row'>
            <div className='flex-1'>
                <DataArray data={movieInfo?.languages} title="Languages" />
                <DataArray data={movieInfo?.genres} title="Genres" />
                <DataArray data={movieInfo?.cast} title="Casts" />
                <DataArray data={movieInfo?.countries} title="Countries" />
            </div>
            <div className='flex-1'>
                <DataArray data={movieInfo?.type} title="Type" />
                <DataArray data={releasedDate.getMonth() + " " + releasedDate.getFullYear()} title="Released Date" />
                <DataArray data={movieInfo?.awards.text} title="Awards" />
                <DataArray data={movieInfo?.imdb?.rating + "/10"} title="IMDB" />
                <DataArray data={movieInfo?.tomatoes?.viewer?.rating + "/10"} title="Tomatoes" />
            </div>
        </div>
    )
}

export default MoreInfo