import { useParams } from "react-router-dom";
import { Layout } from "@/shared/ui/layout";
import { WeatherDetail } from "@/widgets/weather-detail";

export function DetailPage() {
  const { locationId } = useParams();

  if (!locationId) {
    return (
      <Layout>
        <p>잘못된 접근입니다</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <WeatherDetail locationId={decodeURIComponent(locationId)} />
    </Layout>
  );
}
