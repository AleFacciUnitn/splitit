import ResponsiveAppBar from "@ui/Components/ResponsiveAppBar";

export default function DashboardLayout({children}){
  return(
    <div className="flex flex-col md:flex-row h-full">
      <ResponsiveAppBar/>
      {children}
    </div>
  );
}
