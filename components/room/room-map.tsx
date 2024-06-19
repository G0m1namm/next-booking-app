import React, { useEffect } from 'react';

import { cn } from '@/lib/utils';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

type Props = {
  coordinates: number[];
  className?: string;
};

export default function RoomMap({ coordinates, className }: Props) {
  useEffect(() => {
    const setMap = async () => {
      const map = new mapboxgl.Map({
        container: 'room-map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coordinates,
        zoom: 12,
      });

      new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
    };
    setMap();
  }, [coordinates]);

  return <div id="room-map" className={cn('h-[350px] w-full', className)}></div>;
}
