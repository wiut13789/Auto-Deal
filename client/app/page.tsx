import { AnnouncementsGrid } from "@/components/shared/AnnouncementsGrid";

const Home = async () => {
  const response = await fetch(
    `${process.env.SERVER_URL}/ads/get_list?limit=2000`,
    {
      next: {
        revalidate: 0,
      },
    }
  );

  const data = await response.json();

  console.log(data);

  return (
    <main>
      <div className="container">
        <AnnouncementsGrid items={data} />
      </div>
    </main>
  );
};

export default Home;
