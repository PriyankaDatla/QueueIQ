import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import {
  MapPin,
  Navigation,
  Sparkles,
  MapPinned,
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const userIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const queueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function QueueMap({
  userLocation,
  recommendations = [],
}) {
  if (!userLocation) {
    return (
      <div className="relative flex h-[600px] items-center justify-center overflow-hidden rounded-3xl border bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white shadow-2xl">

        <div className="absolute -top-16 -right-16 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>

        <div className="relative text-center">

          <Navigation
            size={70}
            className="mx-auto animate-pulse"
          />

          <h2 className="mt-6 text-3xl font-bold">

            Detecting Your Location

          </h2>

          <p className="mt-2 text-blue-100">

            Finding nearby queues...

          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-slate-200">

      {/* Floating Header */}

      <div className="absolute left-6 top-6 z-[1000] rounded-2xl bg-white/90 backdrop-blur-xl px-5 py-4 shadow-xl">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-100 p-3">

            <MapPinned
              className="text-blue-600"
              size={22}
            />

          </div>

          <div>

            <h3 className="font-bold text-slate-800">

              Smart Queue Map

            </h3>

            <p className="text-sm text-slate-500">

              {recommendations.length} Nearby Recommendations

            </p>

          </div>

        </div>

      </div>

      {/* AI Badge */}

      <div className="absolute right-6 top-6 z-[1000] rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">

        <div className="flex items-center gap-2">

          <Sparkles size={15} />

          AI Powered

        </div>

      </div>

      <MapContainer
        center={[
          userLocation.latitude,
          userLocation.longitude,
        ]}
        zoom={14}
        zoomControl={false}
        className="h-[600px] w-full"
      >

        <ZoomControl position="bottomright" />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User */}

        <Marker
          position={[
            userLocation.latitude,
            userLocation.longitude,
          ]}
          icon={userIcon}
        >

          <Popup>

            <div className="w-56">

              <div className="flex items-center gap-2">

                <Navigation
                  className="text-blue-600"
                  size={18}
                />

                <h3 className="font-bold">

                  Your Location

                </h3>

              </div>

              <p className="mt-2 text-sm text-slate-500">

                QueueIQ uses this position to recommend
                the best nearby queues.

              </p>

            </div>

          </Popup>

        </Marker>

        {/* Queues */}

        {recommendations.map((queue) => (

          <Marker
            key={queue.queueId}
            position={[
              queue.latitude,
              queue.longitude,
            ]}
            icon={queueIcon}
          >

            <Popup>

              <div className="w-72">

                <h2 className="text-xl font-bold text-slate-800">

                  {queue.queueName}

                </h2>

                <p className="mt-1 text-sm text-slate-500">

                  {queue.address}

                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">

                  <div className="rounded-xl bg-slate-50 p-3">

                    <p className="text-xs text-slate-500">

                      Distance

                    </p>

                    <h3 className="font-bold">

                      {queue.distance.toFixed(1)} km

                    </h3>

                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">

                    <p className="text-xs text-slate-500">

                      Wait

                    </p>

                    <h3 className="font-bold">

                      {queue.estimatedWait} mins

                    </h3>

                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">

                    <p className="text-xs text-slate-500">

                      Queue

                    </p>

                    <h3 className="font-bold">

                      {queue.currentQueueSize}

                    </h3>

                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">

                    <p className="text-xs text-slate-500">

                      Rating

                    </p>

                    <h3 className="font-bold">

                      ⭐ {queue.rating}

                    </h3>

                  </div>

                </div>

                <div className="mt-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 p-4 text-white">

                  <div className="flex justify-between">

                    <span>

                      Recommendation

                    </span>

                    <span className="font-bold">

                      {queue.recommendation}

                    </span>

                  </div>

                  <div className="mt-2 flex justify-between">

                    <span>

                      AI Score

                    </span>

                    <span className="font-black text-xl">

                      {queue.recommendationScore.toFixed(0)}

                    </span>

                  </div>

                </div>

              </div>

            </Popup>

          </Marker>

        ))}

      </MapContainer>

    </div>
  );
}