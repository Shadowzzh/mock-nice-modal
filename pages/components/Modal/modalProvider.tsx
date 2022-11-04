import React, { useReducer } from 'react'
import { ModalAction, ModalStore } from './type'

export const initialStore: ModalStore = new Map()
export const ModalContext = React.createContext<ModalStore>(initialStore)

export let dispatch: React.Dispatch<ModalAction> = () => {
    throw new Error('没有dispatch方法，你确定你是使用了ModalContext.Provider么。')
}

/**
 * show、hide等控制{@link state}的方法
 */
const reducer = (state: ModalStore = initialStore, action: ModalAction) => {
    switch (action.type) {
        case 'show': {
            const { modalId, args } = action.payload
            state.set(modalId, {
                ...state.get(modalId),
                ...args,
                id: modalId,
                visible: true
            })

            break
        }

        case 'hide': {
            const { modalId, args } = action.payload
            state.set(modalId, {
                ...state.get(modalId),
                ...args,
                id: modalId,
                visible: false
            })
            break
        }

        default:
    }

    return new Map(state)
}

/** 给所有子节点提供{@link modals}数据 */
const ModalProvider = (props: { children: React.ReactNode }) => {
    const [modals, _dispatch] = useReducer(reducer, initialStore)

    /**
     * 这个dispatch相当于set。抛出set。
     * 给其他地方的代码使用，用来更新modals数据
     */
    dispatch = _dispatch

    return <ModalContext.Provider value={modals}>{props.children}</ModalContext.Provider>
}

export default ModalProvider
