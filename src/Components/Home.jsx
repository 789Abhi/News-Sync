import React from "react";

function Home() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-4 md:grid-cols-3 grid-cols-1">
        {/* Latest News Block */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg md:col-span-2">
          <h3 className="text-2xl font-bold mb-4">Latest News</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Latest News 1"
                className="w-24 h-24 rounded-lg mr-4"
              />
              <p>
                <span className="font-bold">Breaking:</span> Global markets see
                unexpected growth despite uncertainties.
              </p>
            </div>
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Latest News 2"
                className="w-24 h-24 rounded-lg mr-4"
              />
              <p>
                <span className="font-bold">Tech Update:</span> Apple unveils
                new iPhone with groundbreaking features.
              </p>
            </div>
          </div>
        </div>

        {/* Trending Block */}
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Trending</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Trending News 1"
                className="w-24 h-24 rounded-lg mr-4"
              />
              <p>
                #ClimateAction: Youth across the globe march for climate
                justice.
              </p>
            </div>
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Trending News 2"
                className="w-24 h-24 rounded-lg mr-4"
              />
              <p>#Tech: AI advancements reshape the future of jobs.</p>
            </div>
          </div>
        </div>

        {/* Categories Block */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Categories</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Technology</h4>
              <p>Meta launches new VR headset for immersive gaming.</p>
            </div>
            <div>
              <h4 className="font-semibold">Health</h4>
              <p>WHO emphasizes mental health awareness in workplaces.</p>
            </div>
            <div>
              <h4 className="font-semibold">Business</h4>
              <p>Startups raise record funding despite economic slowdown.</p>
            </div>
          </div>
        </div>

        {/* Top Stories Block */}
        <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Top Stories</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Top Story 1"
                className="w-24 h-24 rounded-lg mr-4"
              />
              <p>
                Historic peace talks yield positive results for conflict zones.
              </p>
            </div>
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Top Story 2"
                className="w-24 h-24 rounded-lg mr-4"
              />
              <p>
                Record-breaking athlete sets new milestones at international
                games.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
