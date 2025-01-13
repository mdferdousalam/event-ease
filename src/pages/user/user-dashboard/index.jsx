import NormalUserDashboardLayout from "@/components/LayoutComponents/NormalUserDashboardLayout";

const NormalUserDashboardPage = () => {
  return (
    <div>
      <h1>User Dashboard</h1>
    </div>
  );
}   
 NormalUserDashboardPage.getLayout = function getLayout (page) {
  return <NormalUserDashboardLayout>{page}</NormalUserDashboardLayout>;
};

export default NormalUserDashboardPage;
