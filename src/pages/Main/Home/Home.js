import Geolocation from "@react-native-community/geolocation";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
// import ChallengeCard from "../../../components/application/ChallengeCard";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import HomeModal from "../../../components/modals/HomeModal";
import RateDriverModal from "../../../components/modals/RateDriverModal";
import RideInProgressModal from "../../../components/modals/RideInProgressModal";
import RideModal from "../../../components/modals/RideModal";
import GoogleMapComponent from "../../../components/ui/GoogleMapComponent";
import { useDriverContext } from "../../../context/DriverContext";
import { useLocationContext } from "../../../context/LocationContext";
import { useNegotiationContext } from "../../../context/NegotiationContext";
import { storageService } from "../../../lib/storage.service";
import { updateProfile } from "../../../services/driver.service";
import { getReverseGeocode } from "../../../services/miscellaneous.service";
import {
  getLatestRequests,
  postNegotiation,
} from "../../../services/request.service";
import {
  joinSocketServer,
  listenForNegotiationUpdates,
  listenForNewRequests,
} from "../../../services/socket.service";

const Home = () => {
  const toast = useToast();

  const [adjustFareModal, setAdjustFareModal] = useState(false);

  const { location, setLocation } = useLocationContext();

  const { negotiation, setNegotiation } = useNegotiationContext();

  const [request, setRequest] = useState({
    _id: "",
    createdAt: "",
    currency: { code: "GHS", symbol: "₵" },
    dropoff_location: null,
    negotiations: [],
    pickup_location: null,
    status: "pending",
    suggested_price: "",
    updatedAt: "",
    user: "",
  });

  const { driver, setDriver } = useDriverContext();

  const [requests, setRequests] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const mapRef = useRef(null);

  const bottomSheetRef = useRef(null);

  const bottomSheetRef2 = useRef(null);

  const bottomSheetRef3 = useRef(null);

  const bottomSheetRef4 = useRef(null);

  const flatListRef = useRef(null);

  const onViewRef = useRef(({ changed }) => {
    if (changed && changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      Geolocation.getCurrentPosition(async ({ coords }) => {
        const { results } = await getReverseGeocode(
          `${coords.latitude},${coords.longitude}`
        );
        const location = {
          description: results[0].formatted_address,
          coords,
        };

        setLocation(location);
        joinSocketServer(await storageService.getAccessToken(), location);
        newRequestListener();
        negotiationUpdateListener();
      });
    })();
    getAllRequests();
  }, []);

  useEffect(() => {
    console.log(negotiation);
    !negotiation && bottomSheetRef.current?.present();
    negotiation?.request && bottomSheetRef2.current?.present();
  }, [negotiation?.request]);

  const updateAvailability = async (available) => {
    try {
      setDriver({ ...driver, available });
      await updateProfile({
        available,
      });
      negotiationUpdateListener();
    } catch (error) {
      // console.log("Error: ", error);
      toast.show(error.message, {
        type: "danger",
        placement: "top",
      });
    }
  };

  const getAllRequests = async () => {
    try {
      const resp = await getLatestRequests();
      setRequests(resp.data);
    } catch (error) {
      console.log("Error: ", error);
      toast.show(error.message, {
        type: "danger",
        placement: "top",
      });
    }
  };

  const submitOffer = async (offer) => {
    try {
      const resp = await postNegotiation({
        request: offer._id,
        driver: driver._id,
        price: offer.suggested_price,
        code: offer.currency.code,
        symbol: offer.currency.symbol,
      });

      if (resp.status == 200) {
        toast.show("🎉 Your fare has been sent!!", {
          type: "success",
          placement: "top",
        });
        setRequest(null);
        setAdjustFareModal(false);
        await getAllRequests();
        return;
      }

      toast.show(resp.message, {
        type: "danger",
        placement: "top",
      });
    } catch (error) {
      console.log(error);
      toast.show(error.message, {
        type: "danger",
        placement: "top",
      });
    }
  };

  const newRequestListener = async () => {
    try {
      const data = await listenForNewRequests();
      setRequests((prev) => [data, ...prev]);
    } catch (error) {
      console.log(error);
      toast.show(error.message || error, {
        type: "danger",
        placement: "top",
      });
    }
  };

  const negotiationUpdateListener = async () => {
    try {
      const data = await listenForNegotiationUpdates();
      bottomSheetRef.current?.dismiss();
      bottomSheetRef2.current?.present();
      if (data) {
        setNegotiation(data);
      }
    } catch (error) {
      console.log(error);
      toast.show(error.message || error, {
        type: "danger",
        placement: "top",
      });
    }
  };

  return (
    <BottomSheetModalProvider mode="modal">
      <View style={{ flex: 1 }}>
        <StatusBar style="dark" backgroundColor="transparent" />
        {location && (
          <GoogleMapComponent
            location={location}
            mapRef={mapRef}
            request={
              negotiation && !negotiation?.request?.driverHasArrived
                ? {
                    pickup_location: negotiation?.driver?.locationHistory.pop(),
                    dropoff_location: {
                      lat: location.coords.latitude,
                      lng: location.coords.longitude,
                      description: "Kwabenya, Ghana",
                    },
                  }
                : negotiation && negotiation?.request?.driverHasArrived
                ? negotiation?.request
                : request
            }
            negotiation={negotiation}
          />
        )}
        <HomeModal
          bottomSheetRef={bottomSheetRef}
          requests={requests}
          request={request}
          driver={driver}
          onViewRef={onViewRef}
          flatListRef={flatListRef}
          currentIndex={currentIndex}
          adjustFareModal={adjustFareModal}
          setRequests={setRequests}
          setAdjustFareModal={setAdjustFareModal}
          getAllRequests={getAllRequests}
          updateAvailability={updateAvailability}
          setRequest={setRequest}
          submitOffer={submitOffer}
        />
        <RideModal
          bottomSheetRef2={bottomSheetRef2}
          negotiation={negotiation}
        />
        <RideInProgressModal bottomSheetRef3={bottomSheetRef3} />
        <RateDriverModal bottomSheetRef4={bottomSheetRef4} />
      </View>
    </BottomSheetModalProvider>
  );
};

export default Home;

const styles = StyleSheet.create({});
