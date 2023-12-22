import React, { useRef } from 'react'
import AvatarEditor from 'react-avatar-editor'

interface ComponentState {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
    edit?: boolean
}
const UserAvatar = ({ setFieldValue, edit }: ComponentState) => {
    let editor = useRef(null)
    const onClickSave = () => {
        if (editor) {
            const canvas: any = ''
            let imageURL;
            fetch(canvas)
                .then(res => res.blob())
                .then(blob => (imageURL = window.URL.createObjectURL(blob)));
            setFieldValue('avatar', imageURL)
        }
    }
    const setEditorRef = (editorFile: any) => { editor = editorFile }
    return (
        <AvatarEditor
            ref={setEditorRef}
            image="http://example.com/initialimage.jpg"
            width={250}
            height={250}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1.2}
            rotate={0}
            onLoadSuccess={onClickSave}
        />
    )
}


export default UserAvatar