import React from "react";

const TeamSection = () => {
  return (
    <div className="bg-gradient-to-r from-violet-300 via-green-200 indigo to-red-300 py-16 px-6 md:px-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Meet Our Team
      </h2>

      <div
        className="flex overflow-x-auto gap-8 pb-6 scroll-smooth"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
        onWheel={(e) => {
          e.currentTarget.scrollLeft += e.deltaY;
        }}
      >
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="min-w-[300px] max-w-[400px] flex-shrink-0 rounded-3xl bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 p-1 transition-transform hover:scale-105"
          >
            <div className="bg-white rounded-3xl overflow-hidden">
              <img
                src={member.url}
                alt={member.title}
                className="w-full h-[300px] object-cover transition duration-300 hover:border-4"
              />
              <div className="p-5 text-center">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {member.title}
                </h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const teamMembers = [
  {
    id: 1,
    url: "https://res.cloudinary.com/dqsd7cbfg/image/upload/v1741432654/Project/gtjip1zv5xctxnc4efqq.jpg",
    title: "Abhishek Kumar Rai",
    role: "Department of IT - NEHU",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dqsd7cbfg/image/upload/v1741432654/Project/doc5hyycdyablzd7wcrc.jpg",
    title: "Abhi Suresh Nitnaware",
    role: "Department of IT - NEHU",
  },
  {
    id: 3,
    url: "https://media.licdn.com/dms/image/v2/D4D03AQGvudvHm_EMDQ/profile-displayphoto-shrink_400_400/B4DZYK3WC.G4Ak-/0/1743939003516?e=1750291200&v=beta&t=CQDy3_cC775ngcxfsrIDpmZgdN5ADlDY3XRsp9dURXU",
    title: "Sanskar Kashyap",
    role: "Department of IT - NEHU",
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/dqsd7cbfg/image/upload/v1741432654/Project/wv9hmhtsmz0a6p9gueyn.jpg",
    title: "Ujjwal Kumar",
    role: "Department of IT - NEHU",
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/dqsd7cbfg/image/upload/v1742068841/lapen_rtxbbw.jpg",
    title: "Lapyntngenlang Kharkrang",
    role: "Department of IT - NEHU",
  },
];

export default TeamSection;