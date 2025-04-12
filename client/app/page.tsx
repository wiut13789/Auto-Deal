import { AnnouncementsGrid } from "@/components/shared/AnnouncementsGrid";

const Home = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/cars`);

  const data = await response.json();

  return (
    <main>
      <div className="container">
        All advertisements
        <AnnouncementsGrid items={data.data} />
      </div>
    </main>
  );
};

export default Home;
