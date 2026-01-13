import {
  Sun, Moon, Cloud, CloudRain, CloudSnow,
  CloudLightning, CloudFog, CloudSun, CloudMoon,
} from "lucide-react";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  "01d": Sun,
  "01n": Moon,
  "02d": CloudSun,
  "02n": CloudMoon,
  "03d": Cloud,
  "03n": Cloud,
  "04d": Cloud,
  "04n": Cloud,
  "09d": CloudRain,
  "09n": CloudRain,
  "10d": CloudRain,
  "10n": CloudRain,
  "11d": CloudLightning,
  "11n": CloudLightning,
  "13d": CloudSnow,
  "13n": CloudSnow,
  "50d": CloudFog,
  "50n": CloudFog,
};

export function WeatherIcon({ code, className }: { code: string; className?: string }) {
  const Icon = icons[code] || Cloud;
  return <Icon className={className} />;
}

