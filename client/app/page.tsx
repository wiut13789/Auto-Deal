import { AnnouncementsGrid } from "@/components/shared/AnnouncementsGrid";

const Home = async () => {
  const response = await fetch(`${process.env.SERVER_URL}/ads/get_list`);

  const data = await response.json();

  return (
    <main>
      <div className="container">
        <AnnouncementsGrid items={data} />
      </div>
    </main>
  );
};

export default Home;
