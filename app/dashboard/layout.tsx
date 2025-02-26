import ResponsiveAppBar from "@ui/Components/ResponsiveAppBar";

export default function DashboardLayout({children}){
  return(
    <div className="flex h-full">
      <ResponsiveAppBar/>
      {children}
    </div>
  );
}
