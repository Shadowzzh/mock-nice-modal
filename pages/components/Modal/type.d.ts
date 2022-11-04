/** modal的信息 */
export interface ModalState {
    id: string
    args?: Record<string, unknown>
    visible?: boolean
}

/** modalStore的信息 */
export type ModalStore = Map<string, ModalState>

export interface ModalHocProps {
    id: string
    defaultVisible?: boolean
    keepMounted?: boolean
}

export interface ModalAction {
    type: string
    payload: {
        modalId: string
        args?: Record<string, unknown>
    }
}

/** 注册的组件信息 */
export interface ModalComponentInfo {
    comp: React.FC<any>
    props?: Record<string, unknown>
}
