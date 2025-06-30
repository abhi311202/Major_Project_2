import React, { useEffect, useState } from "react";
import MyProfileSection2 from "./MyProfileSection2";
import ManageAdmin from "./ManageAdmin";
import ManageSuperAdmin from "./ManageSuperAdmin";
import axios from "axios";
import {
  FiBarChart,
  FiChevronDown,
  FiChevronsRight,
  FiDollarSign,
  FiHome,
  FiMonitor,
  FiShoppingCart,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { motion } from "framer-motion";

export const SuperAdminBody = () => {
  const [selected, setSelected] = useState("Dashboard");
  const [admins, setAdmins] = useState([]);
  
  const [superAdminRequestCount, setSuperAdminRequestCount] = useState(0);  
  const baseURL = import.meta.env.VITE_API_BASE_URL; // ✅ Vite env variable

  const fetchAdmins = async () => {
    try {
      const res = await axios.get(`${baseURL}/SuperAdmin/AdminRequest`);
      if (res.data.success) {
        setAdmins(res.data.data); // Save the admin requests
      }
    } catch (err) {
      console.error("Error fetching admin requests:", err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);
  const fetchSuperAdminRequestCount = async () => {
    try {
      const res = await axios.get(`${baseURL}/SuperAdmin/super-admin-requests`);
      if (res.data.success) {
        setSuperAdminRequestCount(res.data.data.length); // 👈 Set count
      }
    } catch (err) {
      console.error("Error fetching super admin requests:", err);
    }
  };
  
  useEffect(() => {
    fetchSuperAdminRequestCount();
  }, []);

  return (
    <div className="flex h-screen bg-white overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgb(220, 155, 122), rgb(207, 225, 238), rgb(202, 169, 226))",
      }}
    >
     <Sidebar
  selected={selected}
  setSelected={setSelected}
  superAdminRequestCount={superAdminRequestCount}
  adminRequestCount={admins.length}
/>



      <div className="flex-1 overflow-auto p-6">
        {selected === "Dashboard" ? (
          <MyProfileSection2 />
        ) : selected === "Manage Admin" ? (
          <ManageAdmin />
        ) : selected === "Manage SuperAdmin" ? (
          <ManageSuperAdmin />
        ) : (
          <ExampleContent selected={selected} />
        )}
      </div>
    </div>
  );
};



const Sidebar = ({ selected, setSelected, superAdminRequestCount,adminRequestCount }) => {
  const [open, setOpen] = useState(true);


  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{
        width: open ? "300px" : "fit-content",
      }}
    >
      <div className="space-y-1">
        <Option
          Icon={FiHome}
          title="Dashboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FiUsers}
          title="Manage Admin"
          selected={selected}
          setSelected={setSelected}
          open={open}
          notifs={adminRequestCount > 0 ? adminRequestCount : null}
        />
        <Option
        Icon={FiUsers}
        title="Manage SuperAdmin"
        selected={selected}
        setSelected={setSelected}
        open={open}
        notifs={superAdminRequestCount} // 👈 Here
      />

      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};


const Option = ({ Icon, title, selected, setSelected, open, notifs }) => {
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        selected === title
          ? "bg-black text-white"
          : "text-slate-500 hover:bg-slate-100"
      }`}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          {title}
        </motion.span>
      )}
      {notifs > 0 && open && (
        <span className="absolute top-1 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
          {notifs}
        </span>
      )}

    </motion.button>
  );
};


const TitleSection = ({ open }) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">TomIsLoading</span>
              <span className="block text-xs text-slate-500">Pro Plan</span>
            </motion.div>
          )}
        </div>
        {open && <FiChevronDown className="mr-2" />}
      </div>
    </div>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
    >
      <svg
        width="24"
        height="auto"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-slate-50"
      >
        <path
          d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
          stopColor="#000000"
        ></path>
        <path
          d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
          stopColor="#000000"
        ></path>
      </svg>
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

const ExampleContent = () => <div className="h-[200vh] w-full ">
  <h1 className="text-white">hello</h1>
</div>;

export default SuperAdminBody;
