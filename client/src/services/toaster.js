import { toast } from 'react-toastify'

const showToast = ({toastType, toastMessage}) => {
    switch(toastType) {
        case 1: {
            toast.success(toastMessage || 'Success. But what was succesed we only can guess.', {containerId: 'A', autoClose: 2500})
            break
        }
        case 2: {
            toast.info(toastMessage || 'New information should be here, but there is no. Sory.', {containerId: 'A', autoClose: 2500})
            break
        }
        case 3: {
            toast.warn(toastMessage || 'Text warning should be here, but there is no. Sory.', {containerId: 'A', autoClose: 2500})
            break
        }
        case 4: {
            toast.error(toastMessage || 'Some error heppened. But what exactly wrong we don`t know', {containerId: 'A', autoClose: 2500})
            break
        }
        default: {
            toast(toastMessage || 'Some message should be here', {containerId: 'A', autoClose: 2500})
            break
        }
    }
}

export default showToast