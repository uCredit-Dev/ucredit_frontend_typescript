import React, { useEffect } from 'react';
import { selectUser, selectFirstname } from '../slices/userSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { User } from '../commonTypes';
import { testUser } from '../testObjs';
import { useDispatch } from 'react-redux';
import { login } from '../slices/userSlice';
const api = 'https://ucredit-api.herokuapp.com/api';

function UserSection() {
  const firstName = useSelector(selectFirstname);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    //retrieveUser();
    axios
      .get(api + '/login')
      .then((retrievedUser) => console.log('retrieved ', retrievedUser));
    // Get test user
    dispatch(login(testUser));
  }, []);

  return (
    <div style={userSection}>
      <div style={pfp}></div>
      <div style={name} className="center">
        {firstName} {' ' + user.lastName}
      </div>
    </div>
  );
}

const name = {
  width: '2rem',
  float: 'left',
  fontWeight: 500,
  display: 'inline',
  marginLeft: '0.5rem',
  marginTop: '0.25rem',
} as React.CSSProperties;

const pfp = {
  position: 'relative',
  backgroundColor: 'orange',
  height: '3.5rem',
  width: '3.5rem',
  borderRadius: '50%',
  float: 'left',
  display: 'inline',
} as React.CSSProperties;

const userSection = {
  backgroundColor: 'whitesmoke',
  marginTop: '0.7rem',
  width: '10rem',
  padding: '0rem',
  height: '3.5rem',
  float: 'right',
  display: 'inline',
  marginRight: '6rem',
  borderRadius: '2rem',
} as React.CSSProperties;

export default UserSection;
