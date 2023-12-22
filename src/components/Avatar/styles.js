import { OutlinedInput } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  titleFont: {
    '&.MuiTypography-body1': {
      // fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 24,

      color: '#FFFFFF',
    },
  },
  large: {
    height: '180px',
    width: '180px',
    marginRight: 14,
  },
  uploadInput: {
    display: 'none',
  },
  imageBack: {
    background: '#526BC6',
    borderRadius: '10px',
    // margin:'25px 45px',
  },
  errPadding: {
    padding: "5px 64px"
  },
  errPaddingFields:{
    padding:"0px 15px 10px"
  },
  imageGrid: {
    padding: 41,
  },
  avatarMargin: {
    paddingTop: '15px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  btnMargin: {
    padding: '30px',
    textAlign: 'center',
  },
  alignRight: {
    textAlign: 'right',
    marginBottom:70
  },
  alignLeft: {
    textAlign: 'left',
  },
  blueButton: {
    '&.MuiButton-root': {
      color: '#FFF',
      borderRadius: 25,
    },
    '&.MuiButton-outlined': {
      border: '2px solid #FFF',
      borderRadius: '25px',
      padding: '10px 25px',
      opacity: '1',
      width: '200px',
      height: '48px',
    },
    '& .MuiButton-label': {
      padding: '6px',
    },
  },
  uploadButton: {
    color: '#FFF',
    borderRadius: 25,
    border: '2px solid #FFF',
    padding: '12px 25px',
    cursor: 'pointer',
  },
  paddingTop: {
    paddingTop: 95,
  },
  whiteButton: {
    '&.MuiButton-root': {
      color: '#4157a4',
      background: '#ffffff',
      borderColor: '#4157a4',
      borderRadius: '25px',
      padding: '10px 25px',
      opacity: '1',
      width: '200px',
      height: '48px',

      '& .MuiButton-root:hover,&:focus,&:actove,&:active:focus': {
        boxShadow: 'none',
      },
    },
    '&.MuiButton-outlined': {
      border: '2px solid #526BC6',
      outline: 'none',
    },
    '& .MuiButton-label': {
      padding: '6px',
    },
  },
  headingFont: {
    '&.MuiTypography-body1': {
      // fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 36,
      padding: '15px 40px',
      color: '#FFFFFF',
    },
  },
  headingTitleFont: {
    '&.MuiTypography-body1': {
      // fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 24,
      padding: '0px 40px',
      color: '#FFFFFF',
    },
  },
  editBtnMargin: {
    textAlign: 'center',
    marginTop: 20,
  },
  regFont: {
    '&.MuiTypography-body1': {
      // fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 16,
      padding: '15px 40px',
      color: '#FFFFFF',
    },
  },
  regDateFont: {
    '&.MuiTypography-body1': {
      // fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 16,
      padding: '15px 0px',
      color: '#FFFFFF',
    },
  },
  titleFontContact: {
    '&.MuiTypography-body1': {
      // fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 24,
      margin: '25px 0px 5px',
      color: '#FFFFFF',
    },
  },
  textField: {
    overflow: 'hidden',

    '& .MuiInputBase-input': {
      padding: '0 30px;',
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1c348a',
    },
    '& .MuiTypography-colorTextSecondary': {
      color: '#000',
      padding: '0px 40px',
    },
    '&.MuiInput-underline:before': {
      borderBottom: 0,
    },
    '&.MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: 0,
    },
    '&.MuiInput-underline:after': {
      borderBottom: 0,
    },
    background: '#FFFFFF',
    borderRadius: 25,
    width: '100%',
    borderBottom: '0px',
    margin: '5px 0px',
    height: 45,
  },
  textFieldMarginBottom: {
    '& .MuiInputBase-input': {
      padding: '15px 15px',
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1c348a',
    },
    '& .MuiTypography-colorTextSecondary': {
      color: '#000',
      padding: '0px 40px',
    },
    background: '#FFFFFF',
    borderRadius: 25,
    width: '100%',
    borderBottom: '0px',
    margin: '5px 0px',
    height: 45,
    marginBottom: 15,
  },
}))
