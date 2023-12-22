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

// ICON

interface ComponentProps {
  onCancel: () => void
}

const bc: string = 'header-from'

const WorkListFrom = ({ onCancel }: ComponentProps) => {
  const redButton = getButtonRed('35px', '200px', color.BUTTTON_RED)
  const blueButton = getButtonRed('35px', '200px', color.AQUA_BLUE)
  const handleSubmit = (): void => {
    console.log('test')
  }
  const flag: boolean = true
  return (
    <form onSubmit={handleSubmit}>
      <div className={bc}>
        <div className={`${bc}__main`}>
          <div />
          <div >
            <div className={`${bc}__main__input-block`}>
              <label htmlFor='full_name'>Title:</label>
              <div>
                <Field
                  name='title'
                  styles={'input-form'}
                  component={Input}
                  id='avatar'
                  type={'text'}
                />
              </div>
            </div>
            <div className={`${bc}__main__input-block`}>
              <label htmlFor='content'>Content:</label>
              <div>
                <Field
                  name='content'
                  id='content'
                  styles={'text-form'}
                  component={Input}
                  rows={'10'}
                  multiline={flag}
                />
              </div>
            </div>
          </div>
          <div>
            <Button title={'Submit'} styles={blueButton.root} />
            <Button title={'Cancel'} styles={redButton.root} onClick={onCancel} />
          </div>
        </div>
      </div>
    </form>
  )
}

export default compose<any, ComponentProps>(reduxForm({
  form: form.WORK_LIST_FORM // a unique identifier for this form
}))(WorkListFrom)
