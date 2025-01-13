import ModeratorDashboardLayout from "@/components/LayoutComponents/ModeratorDashboardLayout";


const ModeratorDashboardPage = () => {
  return (
    <div>
      <h1>User Dashboard</h1>
    </div>
  );
}   
 ModeratorDashboardPage.getLayout = function getLayout (page) {
  return <ModeratorDashboardLayout>{page}</ModeratorDashboardLayout>;
};

export default ModeratorDashboardPage;
