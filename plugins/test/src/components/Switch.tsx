import * as React from 'react';
import Switch from '@mui/material/Switch';
import { withStyles } from '@mui/styles';

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

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function BasicSwitch() {
  return (
    <div>
      <GreenSwitch {...label} defaultChecked />
    </div>
  );
}
