import Modal, { useModal } from '../components/Modal'
import {
    ButtonGroup,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Slide
} from '@material-ui/core'
import React from 'react'

const Test = Modal.create(({ msg }: { msg: string }) => {
    const { id, visible } = useModal()

    const style: React.CSSProperties = {
        display: visible ? 'block' : 'none'
    }

    return (
        <div style={style}>
            Test1:{msg}:{id}
        </div>
    )
})

const Test2 = Modal.create(({ msg }: { msg: string }) => {
    const { id, visible, hide, show } = useModal()

    return (
        <Dialog
            open={visible}
            keepMounted
            onClose={() => hide()}
            aria-labelledby='alert-dialog-slide-title'
            aria-describedby='alert-dialog-slide-description'
        >
            <DialogTitle id='form-dialog-title'>
                Test2:{msg}:{id}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send
                    updates occasionally.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label='Email Address'
                    type='email'
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => hide()} color='primary'>
                    Cancel
                </Button>
                <Button onClick={() => hide()} color='primary'>
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    )
})

export default function Home() {
    return (
        <Modal.Provider>
            <ButtonGroup orientation='vertical' color='primary' variant='contained'>
                <Button onClick={() => Modal.show(Test, { msg: '额外的参数' })}>显示</Button>
                <Button onClick={() => Modal.hide(Test)}>隐藏</Button>
                <Button onClick={() => Modal.show(Test2, { msg: '额外的参数2' })}>显示2</Button>
                <Button onClick={() => Modal.hide(Test2)}>隐藏2</Button>
            </ButtonGroup>
        </Modal.Provider>
    )
}
