import API from "./api";

export const getRecommendations = async (

    serviceType,

    latitude,

    longitude

) => {

    const response = await API.get(

        `/recommendations/${serviceType}`,

        {

            params: {

                latitude,

                longitude

            }

        }

    );

    return response.data;

};