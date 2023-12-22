// MAIN MODULES
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'recompose'
// COMPONENTS

import Button from '../../components/Buttons'
import Input from '../../components/Input'

// STYLES
import './styles.scss'
import { getButtonRed } from '../../components/Buttons/style'

// CONSTANTS
import { color } from '../../constants/color'
import { form } from '../../constants/form'

interface ComponentProps {
    onCancel: () => void
}

const bc: string = 'media-from'

const MediaFrom = ({ onCancel }: ComponentProps) => {
    const redButton = getButtonRed('35px', '200px', color.BUTTTON_RED)
    const blueButton = getButtonRed('35px', '200px', color.AQUA_BLUE)
    const cancelTrigger = (): void => {
        onCancel()
    }
    const handleSubmit = (): void => {
        console.log('test')
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className={bc}>
                <div className={`${bc}__main`}>
                    <div />
                    <div >
                        <div className={`${bc}__main__input-block`}>
                            <label htmlFor='video_ref'>Video Ref:</label>
                            <div>
                                <Field
                                    styles={'input-form'}
                                    name='video_ref'
                                    id='video_ref'
                                    component={Input}
                                />
                            </div>
                        </div>
                        <div className={`${bc}__main__input-block`}>
                            <label htmlFor='image_1'>Image 1:</label>
                            <div>
                                <Field
                                    styles={'input-form'}
                                    name='image_1'
                                    id='image_1'
                                    component={Input}
                                />
                            </div>
                        </div>
                        <div className={`${bc}__main__input-block`}>
                            <label htmlFor='image_2'>Image 2:</label>
                            <div>
                                <Field
                                    styles={'input-form'}
                                    name='image_2'
                                    id='image_2'
                                    component={Input}
                                />
                            </div>
                        </div>
                        <div className={`${bc}__main__input-block`}>
                            <label htmlFor='image_3'>Image 3:</label>
                            <div>
                                <Field
                                    styles={'input-form'}
                                    name='image_3'
                                    id='image_3'
                                    component={Input}
                                />
                            </div>
                        </div>
                        <div className={`${bc}__main__input-block`}>
                            <label htmlFor='image_4'>Image 4:</label>
                            <div>
                                <Field
                                    styles={'input-form'}
                                    name='image_4'
                                    id='image_4'
                                    component={Input}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button title={'Submit'} styles={blueButton.root} onClick={handleSubmit} />
                        <Button title={'Cancel'} styles={redButton.root} onClick={cancelTrigger} />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default compose<any, ComponentProps>(reduxForm({
    form: form.MEDIA_FORM // a unique identifier for this form
}))(MediaFrom)
