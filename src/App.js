import React, { useState, useEffect } from "react";

import Axios from "axios";

import Moment from "moment";
let newDate = new Date();
const formatDate = Moment().format("ddd MMM Do YYYY");
const formatTime = Moment().format("h:mm a");
function App() {
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();
  const fetchWeather = async (e) => {
    e.preventDefault();
    const response = await Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe4feefa8543e06d4f3c66d92c61b69c`
    );
    updateWeather(response.data);
  };
  const isDay = weather?.weather[0].icon?.includes("d");
  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };
  useEffect(() => {
    // declare the data fetching function

    const fetchData = async () => {
      const response = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Antipolo&appid=fe4feefa8543e06d4f3c66d92c61b69c`
      );
      updateWeather(response.data);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);
  console.log(newDate);
  return (
    <div className=" md:bg-clouds_img bg-clouds_img_mobile md:h-screen h-full flex ">
      <div className="md:block hidden w-[60%] relative">
        <div className="absolute bottom-4 left-10">
          <div className="flex text-white space-x-8">
            <div className="text-[170px] flex flex-col">
              {`${Math.floor(weather?.main?.temp - 273)}°C`}{" "}
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex text-3xl space-x-8">
                <div>
                  <div>{`${weather?.name}, ${weather?.sys?.country}`}</div>
                  <div>{formatTime}</div>
                  <div className="">{formatDate}</div>
                </div>
                <div className="flex flex-col justify-center">
                  <div>
                    <span
                      class="iconify"
                      data-icon="fluent:weather-partly-cloudy-night-20-regular"
                      data-width="70"
                      data-height="70"
                    ></span>
                  </div>
                  <div className="capitalize">{` ${weather?.weather[0].description}`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form
        onSubmit={fetchWeather}
        className=" md:w-[40%] w-full md:h-screen h-full backdrop-blur-xl bg-white/30 md:pt-20 pt-10 md:px-40 px-5 relative"
      >
        <div className="md:h-[60%] md:flex w-full">
          <div className="md:hidden text-white text-center text-2xl my-10">
            <div className=" text-4xl">
              {`${Math.floor(weather?.main?.temp - 273)}°C`}{" "}
            </div>
            <div className=" ">{`${weather?.name}, ${weather?.sys?.country}`}</div>
            <div className="">{formatTime}</div>
            <div className="">{formatDate}</div>
          </div>

          <div className="my-auto mb-8">
            <div className="flex ">
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  onChange={(e) => updateCity(e.target.value)}
                  className="block py-2.5 px-0 w-full text-2xl font-bold text-[#E5E7EB] bg-transparent border-0 border-b-2 border-[#E5E7EB] appearance-none  focus:outline-none focus:ring-0 focus:border-[#E5E7EB] peer "
                  placeholder=" "
                  required
                />
                <label
                  for="floating_email"
                  className="absolute text-2xl text-[#E5E7EB] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Location
                </label>
              </div>
              <button
                type={"submit"}
                className=" min-h-[55px] h-[55px] max-h-[55px] bg-[#FC9627] hover:bg-[#925616] text-black hover:text-white font-bold px-3 rounded inline-flex items-center"
              >
                <span
                  className="iconify"
                  data-icon="entypo:magnifying-glass"
                  data-width="40"
                  data-height="40"
                ></span>
              </button>
            </div>
            <div className="text-3xl text-white md:mb-3 md:text-left text-center mb-4">
              Weather Details
            </div>
            <div className="text-2xl font-bold text-white grid md:grid-cols-2 grid-cols-1 gap-8 mx-auto">
              <div className="flex justify-center space-x-5">
                <div>
                  <span
                    class="iconify"
                    data-icon="bi:cloud-sun"
                    data-width="70"
                    data-height="70"
                  ></span>
                </div>
                <div className="flex flex-col justify-center">
                  <div>Sunrise</div>
                  <div>
                    {getTime(weather?.sys[isDay ? "sunset" : "sunrise"])}
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-5">
                <div>
                  <span
                    class="iconify"
                    data-icon="fontisto:wind"
                    data-width="70"
                    data-height="70"
                  ></span>
                </div>
                <div className="flex flex-col justify-center">
                  <div>Wind</div>
                  <div>{weather?.wind?.speed}</div>
                </div>
              </div>
              <div className="flex justify-center space-x-5">
                <div>
                  <span
                    class="iconify"
                    data-icon="carbon:humidity-alt"
                    data-width="70"
                    data-height="70"
                  ></span>
                </div>
                <div className="flex flex-col justify-center">
                  <div>Humidity</div>
                  <div>{weather?.main?.humidity}</div>
                </div>
              </div>
              <div className="flex justify-center space-x-5">
                <div>
                  <span
                    class="iconify"
                    data-icon="akar-icons:arrow-right-left"
                    data-width="70"
                    data-height="70"
                  ></span>
                </div>
                <div className="flex flex-col justify-center">
                  <div>Pressure</div>
                  <div>{weather?.main?.pressure}</div>
                </div>
              </div>
              <div className="text-center text-xl font-light md:absolute bottom-5  left-1/2 transform -translate-x-1/2">
                Created By Kevin Bryan Buenaseda
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
