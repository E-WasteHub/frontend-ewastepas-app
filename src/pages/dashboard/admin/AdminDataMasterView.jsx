import {
  DataMasterCard,
  HeaderDashboard,
} from '../../../components/fragments/';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const AdminDataMasterView = () => {
  useDocumentTitle('Data Master');

  return (
    <div className='space-y-6'>
      {/* Header */}
      <HeaderDashboard
        title='Data Master'
        subtitle='Kelola data master aplikasi Ewastepas'
      />

      {/* Data Master Cards */}
      <DataMasterCard />
    </div>
  );
};

export default AdminDataMasterView;
