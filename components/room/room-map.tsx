import { cn } from '@/lib/utils';

import 'mapbox-gl/dist/mapbox-gl.css';

import Map, { Marker } from 'react-map-gl';
import { env } from '@/app/env-var';

type Props = {
  coordinates: number[];
  className?: string;
};

export default function RoomMap({ coordinates, className }: Props) {
  return (
    <div id="room-map" className={cn('h-[350px] w-full', className)}>
      <Map
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: '100%', height: '100%' }}
        initialViewState={{
          latitude: coordinates[1],
          longitude: coordinates[0],
          zoom: 15,
        }}
        maxZoom={20}
        minZoom={3}
      >
        <Marker longitude={coordinates[0]} latitude={coordinates[1]}></Marker>
      </Map>
    </div>
  );
}
