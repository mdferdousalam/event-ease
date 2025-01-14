import RootLayout from "@/components/LayoutComponents/RootLayout.jsx";


const HomePage = () => {
  return (
    <div>
      <h1 className="text-4xl text-center mt-10">
        Welcome To Event Easy Platform
      </h1>
    </div>
  );
};

 
HomePage.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      {page}
    </RootLayout>
  );
};
export default HomePage;
