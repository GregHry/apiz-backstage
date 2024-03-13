import React from 'react';
import { Table, TableColumn, Progress, ResponseErrorPanel } from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import { useApi, configApiRef } from '@backstage/core-plugin-api';


type DummyJsonUser = {
  id?: number;
  firstName?: string;
  lastName?: string;
  age?: number;
  
};

type DenseTableProps = {
  user: DummyJsonUser[];
};

export const DenseTable = ({ user }: DenseTableProps) => {
  

  const columns: TableColumn[] = [
    { title: 'Id', field: 'id' },
    { title: 'First Name', field: 'firstName' },
    { title: 'Last Name', field: 'lastName' },
    { title: 'Age', field: 'age' },
  ];


  const data = user.map(user => ({ // Mapper sur les utilisateurs
    id: user.id || '-',
    firstName: user.firstName || '-',
    lastName: user.lastName || '-',
    age: user.age || '-',
  }));

  return (
    <Table
      title="User Information"
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  );
};

export const ExampleFetchComponent = () => {

  const configApi = useApi(configApiRef);
  const backendUrl = configApi.getString('backend.baseUrl');

  const { value, loading, error } = useAsync(async (): Promise<{users: DummyJsonUser[]}> => {
    try {
      const response = await fetch(`${backendUrl}/api/proxy/dummyjson`); // Endpoint du plugin backend
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log(data); // Afficher les données
      return data;
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
