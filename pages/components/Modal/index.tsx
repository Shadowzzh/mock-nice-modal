import React, { useCallback } from 'react'
import { getModalId, modalRegister, register } from './register'
import { useContext } from 'react'
import { ModalHocProps } from './type'
import ModalProvider, { dispatch, ModalContext } from './modalProvider'
import ModalPlaceholder from './placeholderProvider'

const IdContext = React.createContext<string | undefined>(undefined)

const Provider = (props: { children: React.ReactNode }) => {
    return (
        <ModalProvider>
            {props.children}
            <ModalPlaceholder />
        </ModalProvider>
    )
}

const create = <P extends {}>(Comp: React.ComponentType<P>): React.FC<P & ModalHocProps> => {
    return function InnerCreate({ defaultVisible, keepMounted, id, ...props }) {
        return (
            <IdContext.Provider value={id}>
                <Comp {...(props as unknown as P)} />
            </IdContext.Provider>
        )
    }
}

const show = <T extends Record<string, unknown>>(Comp: React.FC<any> | string, args?: T) => {
    const id = getModalId(Comp)

    if (typeof Comp !== 'string' && !modalRegister.has(id)) {
        register(id, Comp, args)
    }

    dispatch({
        type: 'show',
        payload: { modalId: id, args }
    })
}

const hide = (Comp: React.FC<any> | string) => {
    const id = getModalId(Comp)

    if (typeof Comp !== 'string' && !modalRegister.has(id)) {
        register(id, Comp)
    }

    dispatch({
        type: 'hide',
        payload: { modalId: id }
    })
}

/** 抛出hooks给用户。通过hooks操作context，更新{@link modals}数据。 */
export const useModal = () => {
    const id = useContext(IdContext)
    const modalStore = useContext(ModalContext)

    if (!id) throw new Error('在Modal.useModal中没有找到id')

    const modal = modalStore.get(id)

    const showCallback = useCallback((args?: Record<string, unknown>) => show(id, args), [id])
    const hideCallback = useCallback(() => hide(id), [id])

    return { id, visible: !!modal?.visible, show: showCallback, hide: hideCallback }
}

const Modal = { Provider, useModal, show, create, hide }

export default Modal
