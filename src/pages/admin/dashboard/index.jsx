import AdminDashboardLayout from "@/components/LayoutComponents/AdminDashboardLayout";

const AdminDashboardPage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
}   
 AdminDashboardPage.getLayout = function getLayout (page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};

export default AdminDashboardPage;
