import React from 'react';
import { Header, SideBar } from './components';
import routes from '@/src/constants/secure-template';
import { SecureHead } from '@/layouts/secure-template/secure-head';
import _get from 'lodash.get';
import { getLocalStorageValues } from '@/constants/local-storage';

const SecureTemplate = (props) => {
  const { children, title } = props;
  const { parseUserData } = getLocalStorageValues();
  return (
    <>
      <SecureHead title={title} />
      <SideBar
        {...props}
        routes={routes}
        logo={{
          innerLink: '/admin/projects',
          outterLink: '/admin/projects',
          imgSrc: '/images/black-logo.jpeg',
          imgAlt: '...',
        }}
      />
      <div className="main-content">
        <Header {...props} userData={parseUserData || {}} />
        <div className="pt-7">{children}</div>
      </div>
    </>
  );
};
export default SecureTemplate;
