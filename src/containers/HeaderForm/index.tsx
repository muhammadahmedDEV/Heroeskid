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

const bc: string = 'header-from'

const HeaderForm = ({ onCancel }: ComponentProps) => {
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
                            <label htmlFor='avatar'>Avatar:</label>
                            <div>
                                <Field
                                    name='avatar'
                                    component={Input}
                                    id='avatar'
                                    type={'file'}
                                />
                            </div>
                        </div>
                        <div className={`${bc}__main__input-block`}>
                            <label htmlFor='full_name'>FullName:</label>
                            <div>
                                <Field
                                    styles={'input-form'}
                                    name='full_name'
                                    id='full_name'
                                    component={Input}
                                />
                            </div>
                        </div>
                        <div className={`${bc}__main__input-block`}>
                            <label htmlFor='specialty'>Specialty:</label>
                            <div>
                                <Field
                                    styles={'input-form'}
                                    name='specialty'
                                    id='specialty'
                                    component={Input}
                                />
                            </div>
                        </div>
                        <div className={`${bc}__main__input-block`}>
                            <label htmlFor='workPlace'>Work Place:</label>
                            <div>
                                <Field
                                    styles={'input-form'}
                                    name='workPlace'
                                    id='workPlace'
                                    component={Input}
                                />
                            </div>
                        </div>
                        <div className={`${bc}__main__input-block`}>
                            <label htmlFor='waitingPeriod'>Waiting Period:</label>
                            <div>
                                <Field
                                    styles={'input-form'}
                                    name='waitingPeriod'
                                    id='waitingPeriod'
                                    component={Input}
                                />
                            </div>
                        </div>
                        <div className={`${bc}__main__input-block`}>
                            <label htmlFor='distance'>Distance:</label>
                            <div>
                                <Field
                                    styles={'input-form'}
                                    name='distance'
                                    id='distance'
                                    component={Input}
                                />
                            </div>
                        </div>
                        <div className={`${bc}__main__input-block`}>
                            <label htmlFor='isOpen'>is Open:</label>
                            <div>
                                <Field
                                    styles={'input-form'}
                                    name='isOpen'
                                    id='isOpen'
                                    component={Input}
                                />
                            </div>
                        </div>
                        <div className={`${bc}__main__input-block`}>
                            <label htmlFor='address'>Address: </label>
                            <div>
                                <Field
                                    styles={'input-form'}
                                    name='address'
                                    id='address'
                                    component={Input}
                                />
                            </div>
                        </div>
                        <div className={`${bc}__main__input-block`}>
                            <label htmlFor='email'>Email:</label>
                            <div>
                                <Field
                                    styles={'input-form'}
                                    name='email'
                                    id='email'
                                    component={Input}
                                />
                            </div>
                        </div>
                        <div className={`${bc}__main__input-block`}>
                            <label htmlFor='website'>Website:</label>
                            <div>
                                <Field
                                    styles={'input-form'}
                                    name='website'
                                    id='website'
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
    form: form.HEADER_FROM // a unique identifier for this form
}))(HeaderForm)
