import { ModalComponentInfo } from './type'

let uid = 0
const symModalId = Symbol('modal') // 组件实例上的属性名

/** 生成唯一id */
const getUid = () => `_modal_$${uid++}`
/** modal组件，注册到这个地方 */
export const modalRegister = new Map<string, ModalComponentInfo>()

/**
 * 获取组件实例上的id。
 * 如果组件没有id，给组件生成唯一id。并赋值给组件实例。 */
export const getModalId = (Comp: React.FC<any> | string) => {
    if (typeof Comp === 'string') return Comp

    const modal = Comp as any
    const id = modal[symModalId]

    if (modalRegister.has(id)) {
        return id
    } else {
        const newId = getUid()
        modal[symModalId] = newId
        return newId
    }
}

/**
 * 注册组件
 * 把组件实例挂载到Map上。
 */
export const register = (id: string, comp: React.FC, props?: Record<string, any>) => {
    if (modalRegister.has(id)) {
        const modal = modalRegister.get(id)!
        modal.props = props
    } else {
        modalRegister.set(id, {
            props,
            comp
        })
    }
}
