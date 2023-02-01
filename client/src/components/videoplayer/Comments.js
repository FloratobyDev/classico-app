import React from 'react'

const Comments = ({ comments }) => {

    const renderedComments = comments?.map((comment, idx) => {
        const datePosted = new Date(comment?.date)
        return <div className='w-full my-2 mx-auto md:w-4/12 lg:w-4/12' key={comment?._id}>
            <div className=' flex flex-col items-center mx-auto'>
                <div className='flex flex-row md:lg:flex-col items-center gap-2'>
                    <p className='font-bold text-sm md:text-lg lg:text-lg inline mb-2'>{comment?.name} </p>
                    <p className='text-[10px]'>{datePosted.getMonth()}-{datePosted.getFullYear()}</p>
                </div>
                <p className=' ml-3 text-xs md:text-sm md:w-10/12'>{comment?.text}</p>
            </div>
        </div>
    })

    return (
        <>
            <div className='flex flex-row gap-x-4 justify-center border-b border-b-solid border-b-black mt-10 mb-4'>
                <p className='text-xs font-bold md:lg:text-2xl border-b-4 border-black tracking-widest py-2 px-4 uppercase'>Comments</p>
            </div>
            <div className='flex justify-center p-5'>
                {comments?.length <= 0 ?
                    <p className='p-10 py-20 text-xl font-bold'>No comments yet!</p>
                    :
                    <div className='flex flex-row flex-wrap'>
                        {renderedComments}
                    </div>}
            </div>
        </>
    )
}

export default Comments