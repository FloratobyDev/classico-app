import { useEffect, useState, useRef } from "react"
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

export const Dropdown = ({ sortValue, setSortValue, sortOptions }) => {

    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef()

    useEffect(() => {

        let click = document.addEventListener('click', (event) => {
            if (!dropdownRef.current) return;
            if (!dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        })

        return () => {
            document.removeEventListener('click', click, true)
        }

    }, [])

    const showOptions = () => {
        setIsOpen(!isOpen)
    }

    const handleOptionClick = event => {
        setSortValue(event.currentTarget.textContent)
        setIsOpen(false)
    }

    return (
        <div data-value="value" className='relative w-48 ' ref={dropdownRef}>
            <div className='p-2 px-4 border-2 lg:border-4 border-black rounded-lg cursor-pointer'>
                <p className=' cursor-pointer flex flex-row items-center justify-between font-semibold text-sm font-raleway' onClick={showOptions}>{sortValue} <span>{isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span></p>
            </div>
            {isOpen && <div className='absolute z-10 w-full p-2 border-2 rounded-lg bg-white border-black mt-2 cursor-pointer'>
                {sortOptions.map(options => {
                    return <p onClick={handleOptionClick} key={options} className='hover:bg-gray-200 cursor-pointer font-raleway font-semibold text-sm text-center p-2 '>{options}</p>
                })}
            </div>}
        </div>
    )
}