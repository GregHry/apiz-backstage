import * as React from 'react';
import Switch from '@mui/material/Switch';
import { withStyles } from '@mui/styles';
import { useApi, configApiRef } from '@backstage/core-plugin-api';

const GreenSwitch = withStyles({
  switchBase: {
    color: '#4caf50',
    '&$checked': {
      color: '#4caf50',
    },
    '&$checked + $track': {
      backgroundColor: '#4caf50',
    },
  },
  checked: {},
  track: {},
})(Switch);

const label = { inputProps: { 'aria-label': 'Switch demo'}}


export default function BasicSwitch() {
  const configApi = useApi(configApiRef);
  const backendUrl = configApi.getString('backend.baseUrl');

  const startInstance = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/proxy/aws`, { method: 'POST' });
      if (!response.ok) {
        throw new Error('Failed to start instance');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to start instance');
    }
  };
  const stopInstance = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/proxy/awss`, { method: 'POST' });
      if (!response.ok) {
        throw new Error('Failed to stop instance');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to stop instance');
    }
  };
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
    if(event.target.checked){
      // Call endpoint A
      console.log('Bouton activé');
      startInstance();
    } else {
      // Call endpoint B
      console.log('Bouton désactivé');
      stopInstance();
    }
  };

  return (
    <div>
      <GreenSwitch checked={checked} onChange={handleChange} {...label} />
    </div>
  );
}