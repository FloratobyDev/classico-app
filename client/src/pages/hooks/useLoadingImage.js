import { useState, useRef } from 'react'

const useLoadingImage = () => {

    const [loadingImages, setLoadingImages] = useState(true)
    const imageLoadedCountRef = useRef(0)
    const dataLength = useRef(9999)


    const handleImage = () => {
        imageLoadedCountRef.current += 1
        if (imageLoadedCountRef.current >= dataLength.current) {
            setLoadingImages(false)
        }
    }

    const handleData = (newData) => {
        dataLength.current = newData
    }

    return { handleImage, loadingImages, handleData }
}

export default useLoadingImage