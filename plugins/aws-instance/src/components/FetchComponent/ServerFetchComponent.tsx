import React from 'react';
import { Table, TableColumn, Progress, ResponseErrorPanel } from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import { Done as DoneIcon } from '@material-ui/icons';
import {Close as CloseIcon} from '@material-ui/icons';
import BasicSwitch from '../Switch';




type AWSServer = {
  InstanceId?: string;
  InstanceType?: string;
  PublicIpAddress?: string;
  Hypervisor?: string;
  State?: string;
  
};

type DenseTableProps = {
  user: AWSServer[];
};

export const DenseTable = ({ user }: DenseTableProps) => {
  

  const columns: TableColumn[] = [
    { title: 'Instance ID', field: 'InstanceId' },
    { title: 'Instance Type', field: 'InstanceType' },
    { title: 'Public IP', field: 'PublicIp' },
    { title: 'Hypervisor', field: 'Hypervisor' },
    { 
        title: 'State', 
        field: 'State',
        render: (rowData: AWSServer) => rowData.State === 'running' ? <DoneIcon style={{ color: 'green' }} /> : <CloseIcon style={{ color: 'red' }} />,
      },
      {
        title: 'Actions',
        field: 'actions',
        render: () => (
          <BasicSwitch />
        ),
      },
  ];

  const data = user.map(user => ({ // Mapper sur les utilisateurs
    InstanceId: user.InstanceId || '-',
    InstanceType: user.InstanceType || '-',
    PublicIp: user.PublicIpAddress || '-',
    Hypervisor: user.Hypervisor || '-',
    State: user.State || '-',
  }));

  return (
    <Table
      title="Server Information"
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  );
};

export const ServerFetchComponent = () => {

  const configApi = useApi(configApiRef);
  const backendUrl = configApi.getString('backend.baseUrl');

  const { value, loading, error } = useAsync(async (): Promise<{users: AWSServer[]}> => {
    try {
      const response = await fetch(`${backendUrl}/api/proxy/aws-describe`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log(data);
  
      // Adapter les données pour correspondre à la structure AWSServer
      const users = data.data.map((instance: any) => ({
        InstanceId: instance.InstanceId,
        InstanceType: instance.InstanceType,
        PublicIpAddress: instance.PublicIpAddress,
        Hypervisor: instance.Hypervisor,
        State: instance.State.Name,
      }));
  
      return { users };
      
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch data');
    }
  }, []);
  
  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }
  
  // Vérification si value et value.users sont définis
  return value && value.users ? <DenseTable user={value.users} /> : null; 

}
