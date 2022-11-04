import { useContext } from 'react'
import { ModalContext } from './modalProvider'
import { modalRegister } from './register'

const ModalPlaceholder = () => {
    const modalStore = useContext(ModalContext)
    const modalIds = Array.from(modalStore.values()).map(({ id }) => id)

    const inRender = modalIds.map((id) => ({ ...modalRegister.get(id)!, id })).filter((v) => v)

    return (
        <>
            {inRender.map(({ comp: Comp, id, props }) => {
                return <Comp key={id} id={id} {...props} />
            })}
        </>
    )
}

export default ModalPlaceholder
