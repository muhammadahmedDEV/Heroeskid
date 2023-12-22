import React from 'react'
// import Avatar from '@material-ui/core/Avatar';
import { Badge, Avatar } from 'antd';
// STYLES
import './styles.scss'
import { MenuItem, Menu } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import src from '../../assets/icons/placeholder.png';
import { clearItemToLocalStorage, getItemToLocalStorage, removeItemFromLocalStorage } from '../../servises/localStorage';


interface ComponentProps {
    logOut: Function
    history: any
    profileType: any
}
const options = [
    'Edit Profile',
    'Logout'
];

const ITEM_HEIGHT = 48;
const bc = 'signup-avatar'
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1)
            }
        },
        small: {
            width: theme.spacing(4),
            height: theme.spacing(4)
        }
    })
);
const SignupAvatar = ({ logOut, history, profileType }: ComponentProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const classes = useStyles();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event: React.MouseEvent<HTMLElement>) => {
        if (event.currentTarget.innerText.includes('Edit Profile')) {
            if (profileType === 'organizations') {
                history.push(`/join-our-organizations`)
            }
            if (profileType === 'users') {
                history.push(`/join-our-professionals`)
            }
        }
        if (event.currentTarget.innerText === 'Logout') {
            logOut()
            history.push('/')
            setTimeout(() => {
                window.location.reload()
            }, 1000)
            return
            history.push('/login')
        }
        setAnchorEl(null);
    };

    return (
        <div className={`${bc}`}>
            <IconButton
                aria-label="more"
                aria-controls="user-profile"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <Badge dot>
                    <Avatar src={src} className={classes.small} />
                </Badge>

            </IconButton>
            <Menu
                id="user-profile"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200
                    }
                }}
            >

                {options.map(option => (
                    <MenuItem key={option} selected={option === 'Edit Profile'} onClick={handleClose}>
                        {option === 'Edit Profile' ? <div>{option} <Badge dot style={{marginLeft: '10px'}}></Badge> </div> : option}
                        {/* {option} */}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
export default SignupAvatar
