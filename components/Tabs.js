import MuiTabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React from 'react';
import { useRouter } from 'next/router';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const myTabs = [
  {
    pathname: '/',
    label: 'Accueil',
  },
  {
    pathname: '/movies/page/1',
    label: 'Movies',
  },
  {
    pathname: '/tv/page/1',
    label: 'Series',
  },
  {
    pathname: '/wishes',
    label: 'Ma liste de souhaits',
  },
];

const Tabs = () => {
  const router = useRouter();
  return (
    <MuiTabs value={router.pathname}>
      {myTabs.map(({ pathname, label }) => (
        <Tab
          key={label}
          value={pathname}
          label={label}
          onClick={() => router.push({ pathname })}
          {...a11yProps(0)}
        />
      ))}
    </MuiTabs>
  );
};

export default Tabs;
