export default function ServiceCard({ service, onClick }) {

    return (

        <div
            onClick={onClick}
            className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition p-8 text-center"
        >

            <div className="flex justify-center text-blue-600 mb-4">

                {service.icon}

            </div>

            <h2 className="text-2xl font-semibold">

                {service.title}

            </h2>

            <p className="mt-3 text-gray-500">

                Find Nearby

            </p>

        </div>

    );

}