import tippy from 'tippy.js'

export const BtnDelete = () => {
    return tippy('#btnDelete', {
        placement: 'bottom',
        content: 'Delete',
    })
}