import React from 'react';
import Avatar from '@material-ui/core/Avatar';

// STYLES
import './styles.scss';
import { MenuItem, Menu } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { clearItemToLocalStorage, getItemToLocalStorage, removeItemFromLocalStorage } from '../../servises/localStorage';

interface ComponentProps {
  src: string;
  logOut: Function;
  authUser: boolean;
  history: any;
  addUser: Function;
  id: string;
  user: any;
  profileType: string;
}
const options = ['Profile', 'Logout'];

const ITEM_HEIGHT = 48;
const bc = 'login-avatar';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  }),
);
const LoginAvatar = ({
  src,
  logOut,
  authUser,
  history,
  addUser,
  id,
  user,
  profileType
}: ComponentProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    if (
      event.currentTarget.innerText === 'Profile' ||
      event.currentTarget.textContent === 'Profile'
    ) {
      profileType === 'users' ? history.push(`/user/${id}`) : history.push(`/org/${id}`)
      addUser(user);
    }
    if (
      event.currentTarget.innerText === 'Logout' ||
      event.currentTarget.textContent === 'Logout'
    ) {
      if (authUser) {
        logOut();
        history.push('/');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        return;
      }
      history.push('/login');
    }
    setAnchorEl(null);
  };

  return authUser ? (
    <div className={`${bc}`}>
      <IconButton
        aria-label="more"
        aria-controls="user-profile"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar src={src} className={classes.small} />
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
            width: 200,
          },
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option}
            selected={option === 'Profile'}
            onClick={handleClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  ) : null;
};
export default LoginAvatar;
