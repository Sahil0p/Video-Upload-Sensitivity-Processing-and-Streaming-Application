import UploadCard from "../components/upload/UploadCard";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import PageContainer from "../components/layout/PageContainer";

export default function Upload() {
  return (
    <div className="flex min-h-screen bg-[var(--bg-main)]">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <PageContainer>
          <h1 className="dashboard-title mb-6">Upload Video</h1>
          <UploadCard />
        </PageContainer>
      </div>
    </div>
  );
}
