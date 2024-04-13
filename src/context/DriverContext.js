import { createContext, useContext, useEffect, useState } from "react";
const { storageService } = require("../lib/storage.service");

export const DriverContext = createContext({
  driver: null,
  setDriver: () => {},
});

export const DriverProvider = ({ children }) => {
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    (async () => {
      let savedDriver = await storageService.getDriverDetails();
      if (savedDriver) {
        setDriver(savedDriver);
      }
    })();
  }, []);

  useEffect(() => {
    const updateDriverInStorage = async () => {
      await storageService.setDriverDetails(driver);
    };

    if (driver !== null) {
      updateDriverInStorage();
    }
  }, [driver]);

  return (
    <DriverContext.Provider value={{ driver, setDriver }}>
      {children}
    </DriverContext.Provider>
  );
};

export const useDriverContext = () => {
  const context = useContext(DriverContext);
  if (context === undefined) {
    throw new Error("useDriverContext must be used within a DriverProvider");
  }
  return context;
};
