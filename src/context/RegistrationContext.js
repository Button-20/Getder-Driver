import { createContext, useContext, useEffect, useState } from "react";
const { storageService } = require("../lib/storage.service");

export const RegistrationContext = createContext({
  registration: null,
  setRegistration: () => {},
});

export const RegistrationProvider = ({ children }) => {
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    (async () => {
      let savedRegistration = await storageService.getRegisterDriver();

      if (savedRegistration) {
        setRegistration(savedRegistration);
      }
    })();
  }, []);

  useEffect(() => {
    const updateDriverRegistrationInStorage = async () => {
      await storageService.setRegisterDriver(registration);
    };

    if (registration !== null) {
      updateDriverRegistrationInStorage();
    }
  }, [registration]);

  return (
    <RegistrationContext.Provider value={{ registration, setRegistration }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistrationContext = () => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error(
      "useRegistrationContext must be used within a RegistrationProvider"
    );
  }
  return context;
};
