import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Layout, Spin, Alert } from 'antd';
import { useSelector } from 'react-redux';
import { fetchUser } from '../slices/userSlice';
import { RootState } from '../slices/store';
import { useAppDispatch } from '../app/hooks';

const { Header, Content } = Layout;

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userState = useSelector((state: RootState) => state.user);
  const { entities: user, loading, error } = userState;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        dispatch(fetchUser());
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData();
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Layout>
      <Header>
        <Button onClick={handleLogout}>Logout</Button>
      </Header>
      <Content>
        {loading === 'loading' ? (
          <Spin />
        ) : loading === 'failed' ? (
          <Alert message='Error' description={error} type='error' showIcon />
        ) : user ? (
          <div>
            <h1>Welcome, {user.username}</h1>
            <img src={user.avatar} alt='User avatar' />
            <p>{user.about}</p>
          </div>
        ) : null}
      </Content>
    </Layout>
  );
};

export default HomePage;
