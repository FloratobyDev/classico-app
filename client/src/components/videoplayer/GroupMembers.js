import React from 'react'

const GroupMembers = ({ members, name }) => {
    return (
        members?.length > 0 && <div className='flex flex-col md:flex-row md:justify-start gap-x-2 flex-wrap w-6/12'>
            <span className='font-raleway font-bold'>{name}:</span>
            {members.map((member, idx) => {
                const query = `https://www.google.com/search?q=${member.slice(0, member.indexOf("("))}`
                return <a key={idx} className='font-medium text-sm underline tracking-wider' target='_blank' rel='noreferrer noopener' href={query}>{member}{idx !== members?.length - 1 && <span>, </span>}</a>
            })}
        </div>

    )
}

export default GroupMembers